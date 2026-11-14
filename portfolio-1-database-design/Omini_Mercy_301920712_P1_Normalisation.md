# Artisan Production Batch Tracker — normalisation

The example uses the saved sample records. The full set of fields is in the design and schema.

## Starting grouped records

| batch_id | batch_material records (list) |
| --- | --- |
| 4001 | [5001] |


The record IDs are grouped in a list. In 1NF, each record has its own row and each cell holds one value.

## 1NF: one value per cell

| batch_material.batch_material_id | batch_material.batch_id | batch_material.fabric_id | production_batch.batch_id | production_batch.batch_code | production_batch.maker_id | production_batch.garment_id | maker.maker_id |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 5001 | 4001 | 3001 | 4001 | BATCH-001 | 1001 | 2001 | 1001 |

Key: batch_material_id.

## 2NF: depend on the whole key

batch_material: batch_id is a proper part of candidate key (batch_id, fabric_id), and determines production_batch details. batch_material: fabric_id is a proper part of candidate key (batch_id, fabric_id), and determines fabric details.

## production_batch_example

| production_batch.batch_id | production_batch.batch_code | production_batch.maker_id | production_batch.garment_id | maker.maker_id |
| --- | --- | --- | --- | --- |
| 4001 | BATCH-001 | 1001 | 2001 | 1001 |

## batch_material_example

| batch_material.batch_material_id | batch_material.batch_id | batch_material.fabric_id |
| --- | --- | --- |
| 5001 | 4001 | 3001 |

## 3NF: store each entity’s details once

The entity keys determine their own descriptions. Related records keep foreign keys rather than repeating those descriptions.

## maker

| maker_id | maker_name | region |
| --- | --- | --- |
| 1001 | Aster Loom | North |

## garment

| garment_id | garment_name | garment_type |
| --- | --- | --- |
| 2001 | Field Jacket | Outerwear |

## fabric

| fabric_id | fabric_name | fiber_content |
| --- | --- | --- |
| 3001 | Cedar Weave | Cotton |

## production_batch

| batch_id | batch_code | maker_id | garment_id | started_on | status |
| --- | --- | --- | --- | --- | --- |
| 4001 | BATCH-001 | 1001 | 2001 | 2026-10-12 | in_progress |

## batch_material

| batch_material_id | batch_id | fabric_id | quantity_used |
| --- | --- | --- | --- |
| 5001 | 4001 | 3001 | 12.5 |

## Dependencies

- maker: (maker_id) → maker_name, region
- garment: (garment_id) → garment_name, garment_type
- fabric: (fabric_id) → fabric_name, fiber_content
- production_batch: (batch_id) → batch_code, maker_id, garment_id, started_on, status
- batch_material: (batch_material_id) → batch_id, fabric_id, quantity_used

Joining the decomposed sample tables reproduces the original 1 example rows. The design assumes the declared keys describe the relevant business dependencies.
