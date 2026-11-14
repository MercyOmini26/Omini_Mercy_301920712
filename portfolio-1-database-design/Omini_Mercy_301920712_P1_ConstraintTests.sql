-- Run these deliberately invalid statements one at a time, outside a transaction.
-- Each should fail at the named constraint; the sample rows should remain unchanged.

-- 1. maker primary key. Expected: pk_maker, SQLSTATE 23505.
INSERT INTO portfolio."maker" ("maker_id", "maker_name", "region")
VALUES (1001, 'Birch Thread', 'South');

-- 2. maker not null. Expected: maker_name, SQLSTATE 23502.
INSERT INTO portfolio."maker" ("maker_id", "maker_name", "region")
VALUES (11001, NULL, 'South');

-- 3. garment primary key. Expected: pk_garment, SQLSTATE 23505.
INSERT INTO portfolio."garment" ("garment_id", "garment_name", "garment_type")
VALUES (2001, 'Ridge Shirt', 'Top');

-- 4. fabric primary key. Expected: pk_fabric, SQLSTATE 23505.
INSERT INTO portfolio."fabric" ("fabric_id", "fabric_name", "fiber_content")
VALUES (3001, 'Willow Cloth', 'Linen');

-- 5. batch primary key. Expected: pk_production_batch, SQLSTATE 23505.
INSERT INTO portfolio."production_batch" ("batch_id", "batch_code", "maker_id", "garment_id", "started_on", "status")
VALUES (4001, 'BATCH-101', 1001, 2001, '2026-10-13', 'planned');

-- 6. batch code unique. Expected: uq_production_batch_0, SQLSTATE 23505.
INSERT INTO portfolio."production_batch" ("batch_id", "batch_code", "maker_id", "garment_id", "started_on", "status")
VALUES (11002, 'BATCH-001', 1001, 2001, '2026-10-14', 'planned');

-- 7. batch maker foreign key. Expected: fk_production_batch_0, SQLSTATE 23503.
INSERT INTO portfolio."production_batch" ("batch_id", "batch_code", "maker_id", "garment_id", "started_on", "status")
VALUES (11003, 'BATCH-102', 11999, 2001, '2026-10-15', 'planned');

-- 8. batch garment foreign key. Expected: fk_production_batch_1, SQLSTATE 23503.
INSERT INTO portfolio."production_batch" ("batch_id", "batch_code", "maker_id", "garment_id", "started_on", "status")
VALUES (11004, 'BATCH-103', 1001, 12999, '2026-10-16', 'planned');

-- 9. material primary key. Expected: pk_batch_material, SQLSTATE 23505.
INSERT INTO portfolio."batch_material" ("batch_material_id", "batch_id", "fabric_id", "quantity_used")
VALUES (5001, 4001, 3001, 7);

-- 10. material batch fabric unique. Expected: uq_batch_material_0, SQLSTATE 23505.
INSERT INTO portfolio."batch_material" ("batch_material_id", "batch_id", "fabric_id", "quantity_used")
VALUES (11006, 4001, 3001, 8);

-- 11. material batch foreign key. Expected: fk_batch_material_0, SQLSTATE 23503.
INSERT INTO portfolio."batch_material" ("batch_material_id", "batch_id", "fabric_id", "quantity_used")
VALUES (11007, 11998, 3001, 9);

-- 12. material fabric foreign key. Expected: fk_batch_material_1, SQLSTATE 23503.
INSERT INTO portfolio."batch_material" ("batch_material_id", "batch_id", "fabric_id", "quantity_used")
VALUES (11008, 4001, 12998, 10);

-- 13. material quantity check. Expected: material_quantity_positive, SQLSTATE 23514.
INSERT INTO portfolio."batch_material" ("batch_material_id", "batch_id", "fabric_id", "quantity_used")
VALUES (11009, 4001, 3001, 0);
