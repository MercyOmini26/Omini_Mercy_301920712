# Artisan Production Batch Tracker — database design

My case study records maker, garment, fabric, production_batch, batch_material.

## Users

- Production coordinators
- Artisan makers
- Inventory analysts

## Main operations

- Create a production batch and its material rows atomically.
- Find batches by start date and review their makers and garments.
- Report total fabric used grouped by maker and garment.
- Benchmark a start-date filter with and without a B-tree index using 20000 synthetic batches.

## Entities

| Entity | Information stored |
| --- | --- |
| maker | An artisan responsible for producing batches. |
| garment | A garment design produced in one or more batches. |
| fabric | A fabric that may be used in production batches. |
| production_batch | A uniquely coded production run for one maker and garment. |
| batch_material | A fabric and positive quantity used by a production batch. |

## maker

| Field | Type | Key | Required |
| --- | --- | --- | --- |
| maker_id | BIGINT | PK | Yes |
| maker_name | TEXT |  | Yes |
| region | TEXT |  | Yes |


## garment

| Field | Type | Key | Required |
| --- | --- | --- | --- |
| garment_id | BIGINT | PK | Yes |
| garment_name | TEXT |  | Yes |
| garment_type | TEXT |  | Yes |


## fabric

| Field | Type | Key | Required |
| --- | --- | --- | --- |
| fabric_id | BIGINT | PK | Yes |
| fabric_name | TEXT |  | Yes |
| fiber_content | TEXT |  | Yes |


## production_batch

| Field | Type | Key | Required |
| --- | --- | --- | --- |
| batch_id | BIGINT | PK | Yes |
| batch_code | TEXT | Unique | Yes |
| maker_id | BIGINT | FK | Yes |
| garment_id | BIGINT | FK | Yes |
| started_on | DATE |  | Yes |
| status | TEXT |  | Yes |
- maker_id → maker.maker_id
- garment_id → garment.garment_id
- Unique key: (batch_code).

## batch_material

| Field | Type | Key | Required |
| --- | --- | --- | --- |
| batch_material_id | BIGINT | PK | Yes |
| batch_id | BIGINT | FK | Yes |
| fabric_id | BIGINT | FK | Yes |
| quantity_used | NUMERIC(18,2) |  | Yes |
- batch_id → production_batch.batch_id
- fabric_id → fabric.fabric_id
- Unique key: (batch_id, fabric_id).

## Relationships and business rules

- Every production batch must have a batch_code distinct from all other batches.
- Every batch-material row must have quantity_used greater than zero.
- A batch may have at most one material row for a given fabric.
- Every production batch must reference an existing maker.
- Every production batch must reference an existing garment.

## Assumptions

- Each batch has exactly one maker and one garment.
- Each batch-material row records one fabric and its positive quantity in a consistent, unspecified unit; a fabric occurs at most once per batch.
- A batch code is globally unique. Synthetic codes and records are used; no real people or identifiers are included.
- Worked normalization example: BatchMaterial has a foreign key to ProductionBatch. Store quantity_used on the batch-fabric row, not repeated batch or fabric descriptions: batch_code belongs to ProductionBatch and fabric_name belongs to Fabric. This separates facts by their dependencies and avoids repeating ancestor attributes in each material row.

