-- Fictional sample records for Artisan Production Batch Tracker.
BEGIN;
SET LOCAL standard_conforming_strings = on;
INSERT INTO portfolio."maker" ("maker_id", "maker_name", "region") VALUES (1001, 'Aster Loom', 'North');
INSERT INTO portfolio."garment" ("garment_id", "garment_name", "garment_type") VALUES (2001, 'Field Jacket', 'Outerwear');
INSERT INTO portfolio."fabric" ("fabric_id", "fabric_name", "fiber_content") VALUES (3001, 'Cedar Weave', 'Cotton');
INSERT INTO portfolio."production_batch" ("batch_id", "batch_code", "maker_id", "garment_id", "started_on", "status") VALUES (4001, 'BATCH-001', 1001, 2001, '2026-10-12', 'in_progress');
INSERT INTO portfolio."batch_material" ("batch_material_id", "batch_id", "fabric_id", "quantity_used") VALUES (5001, 4001, 3001, 12.5);
COMMIT;
