# Artisan Production Batch Tracker — SQL queries

## 1. Show related production_batch, maker, garment records (up to 20).

```sql
SELECT t0."batch_id" AS "production_batch_batch_id",
       t0."batch_code" AS "production_batch_batch_code",
       t1."maker_id" AS "maker_maker_id",
       t1."maker_name" AS "maker_maker_name",
       t2."garment_id" AS "garment_garment_id",
       t2."garment_name" AS "garment_garment_name"
FROM portfolio."production_batch" t0
JOIN portfolio."maker" t1 ON t0."maker_id" = t1."maker_id"
JOIN portfolio."garment" t2 ON t0."garment_id" = t2."garment_id"
ORDER BY t0."batch_id", t1."maker_id", t2."garment_id"
LIMIT 20;
```

| production_batch_batch_id | production_batch_batch_code | maker_maker_id | maker_maker_name | garment_garment_id | garment_garment_name |
| --- | --- | --- | --- | --- | --- |
| 4001 | BATCH-001 | 1001 | Aster Loom | 2001 | Field Jacket |

## 2. Find production_batch records where started_on matches "2026-10-12" (up to 20).

```sql
SELECT * FROM portfolio."production_batch"
WHERE "started_on" IS NOT DISTINCT FROM '2026-10-12'
ORDER BY "batch_id"
LIMIT 20;
```

| batch_id | batch_code | maker_id | garment_id | started_on | status |
| --- | --- | --- | --- | --- | --- |
| 4001 | BATCH-001 | 1001 | 2001 | 2026-10-12 | in_progress |

## 3. Count batch_material records for each batch_id (up to 20 groups).

```sql
SELECT "batch_id", count(*) AS record_count
FROM portfolio."batch_material"
GROUP BY "batch_id"
ORDER BY record_count DESC, "batch_id" NULLS LAST
LIMIT 20;
```

| batch_id | record_count |
| --- | --- |
| 4001 | 1 |


## Index comparison

| Phase | Median (ms) | Three runs (ms) | Plan nodes | Buffer hits |
| --- | --- | --- | --- | --- |
| Before index | 1.002 | 1.787, 0.99, 1.002 | Sort → Seq Scan | 112 |
| After index | 0.233 | 0.233, 0.23, 0.235 | Sort → Bitmap Heap Scan → Bitmap Index Scan | 25 |

The median execution time changed from 1.002 ms to 0.233 ms. The measured plan used p2_filter_idx. The results matched in both phases. An index adds storage and write-maintenance costs; timings depend on the selected lookup and environment.

## Execution plans

### Before index, run 1

```text
Sort (actual time=1.753..1.755 rows=20 loops=1)
  Seq Scan on production_batch (actual time=0.023..1.689 rows=20 loops=1)
Planning Time: 0.558 ms
Execution Time: 1.787 ms
```

### Before index, run 2

```text
Sort (actual time=0.962..0.963 rows=20 loops=1)
  Seq Scan on production_batch (actual time=0.017..0.913 rows=20 loops=1)
Planning Time: 0.472 ms
Execution Time: 0.99 ms
```

### Before index, run 3

```text
Sort (actual time=0.974..0.975 rows=20 loops=1)
  Seq Scan on production_batch (actual time=0.018..0.879 rows=20 loops=1)
Planning Time: 0.428 ms
Execution Time: 1.002 ms
```

### After index, run 1

```text
Sort (actual time=0.167..0.169 rows=20 loops=1)
  Bitmap Heap Scan on production_batch (actual time=0.033..0.115 rows=20 loops=1)
    Bitmap Index Scan using p2_filter_idx (actual time=0.018..0.018 rows=20 loops=1)
Planning Time: 0.809 ms
Execution Time: 0.233 ms
```

### After index, run 2

```text
Sort (actual time=0.166..0.168 rows=20 loops=1)
  Bitmap Heap Scan on production_batch (actual time=0.033..0.114 rows=20 loops=1)
    Bitmap Index Scan using p2_filter_idx (actual time=0.018..0.018 rows=20 loops=1)
Planning Time: 0.776 ms
Execution Time: 0.23 ms
```

### After index, run 3

```text
Sort (actual time=0.17..0.171 rows=20 loops=1)
  Bitmap Heap Scan on production_batch (actual time=0.034..0.117 rows=20 loops=1)
    Bitmap Index Scan using p2_filter_idx (actual time=0.018..0.019 rows=20 loops=1)
Planning Time: 0.821 ms
Execution Time: 0.235 ms
```

## Reproduce

Use a fresh database with the Portfolio 1 schema and sample data. Run Omini_Mercy_301920712_P2_Queries.sql, then Omini_Mercy_301920712_P2_Optimisation.sql. The optimisation script creates a separate performance table and runs EXPLAIN (ANALYZE, BUFFERS).

[Query screenshot](screenshots/Omini_Mercy_301920712_P2_QueryResults.png) · [Index comparison](screenshots/Omini_Mercy_301920712_P2_IndexComparison.png)

## References

- [PostgreSQL — EXPLAIN](https://www.postgresql.org/docs/17/using-explain.html)

