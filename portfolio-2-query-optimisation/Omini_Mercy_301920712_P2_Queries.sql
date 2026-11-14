-- Show related production_batch, maker, garment records (up to 20).
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

EXPLAIN (ANALYZE, BUFFERS, FORMAT JSON)
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

-- Find production_batch records where started_on matches "2026-10-12" (up to 20).
SELECT * FROM portfolio."production_batch"
WHERE "started_on" IS NOT DISTINCT FROM '2026-10-12'
ORDER BY "batch_id"
LIMIT 20;

EXPLAIN (ANALYZE, BUFFERS, FORMAT JSON)
SELECT * FROM portfolio."production_batch"
WHERE "started_on" IS NOT DISTINCT FROM '2026-10-12'
ORDER BY "batch_id"
LIMIT 20;

-- Count batch_material records for each batch_id (up to 20 groups).
SELECT "batch_id", count(*) AS record_count
FROM portfolio."batch_material"
GROUP BY "batch_id"
ORDER BY record_count DESC, "batch_id" NULLS LAST
LIMIT 20;

EXPLAIN (ANALYZE, BUFFERS, FORMAT JSON)
SELECT "batch_id", count(*) AS record_count
FROM portfolio."batch_material"
GROUP BY "batch_id"
ORDER BY record_count DESC, "batch_id" NULLS LAST
LIMIT 20;
