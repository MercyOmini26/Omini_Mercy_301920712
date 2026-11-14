-- Artisan Production Batch Tracker: tables, keys and business constraints.
-- Run once in a fresh PostgreSQL database.
BEGIN;
SET LOCAL standard_conforming_strings = on;
CREATE SCHEMA portfolio;
CREATE TABLE portfolio."maker" (
  "maker_id" bigint NOT NULL,
  "maker_name" text NOT NULL,
  "region" text NOT NULL,
  CONSTRAINT "pk_maker" PRIMARY KEY ("maker_id")
);
CREATE TABLE portfolio."garment" (
  "garment_id" bigint NOT NULL,
  "garment_name" text NOT NULL,
  "garment_type" text NOT NULL,
  CONSTRAINT "pk_garment" PRIMARY KEY ("garment_id")
);
CREATE TABLE portfolio."fabric" (
  "fabric_id" bigint NOT NULL,
  "fabric_name" text NOT NULL,
  "fiber_content" text NOT NULL,
  CONSTRAINT "pk_fabric" PRIMARY KEY ("fabric_id")
);
CREATE TABLE portfolio."production_batch" (
  "batch_id" bigint NOT NULL,
  "batch_code" text NOT NULL,
  "maker_id" bigint NOT NULL,
  "garment_id" bigint NOT NULL,
  "started_on" date NOT NULL,
  "status" text NOT NULL,
  CONSTRAINT "pk_production_batch" PRIMARY KEY ("batch_id"),
  CONSTRAINT "uq_production_batch_0" UNIQUE ("batch_code")
);
CREATE TABLE portfolio."batch_material" (
  "batch_material_id" bigint NOT NULL,
  "batch_id" bigint NOT NULL,
  "fabric_id" bigint NOT NULL,
  "quantity_used" numeric(18,2) NOT NULL,
  CONSTRAINT "pk_batch_material" PRIMARY KEY ("batch_material_id"),
  CONSTRAINT "uq_batch_material_0" UNIQUE ("batch_id", "fabric_id")
);
ALTER TABLE portfolio."production_batch" ADD CONSTRAINT "fk_production_batch_0" FOREIGN KEY ("maker_id") REFERENCES portfolio."maker" ("maker_id");
ALTER TABLE portfolio."production_batch" ADD CONSTRAINT "fk_production_batch_1" FOREIGN KEY ("garment_id") REFERENCES portfolio."garment" ("garment_id");
ALTER TABLE portfolio."batch_material" ADD CONSTRAINT "fk_batch_material_0" FOREIGN KEY ("batch_id") REFERENCES portfolio."production_batch" ("batch_id");
ALTER TABLE portfolio."batch_material" ADD CONSTRAINT "fk_batch_material_1" FOREIGN KEY ("fabric_id") REFERENCES portfolio."fabric" ("fabric_id");
ALTER TABLE portfolio."batch_material" ADD CONSTRAINT "material_quantity_positive" CHECK ("quantity_used" > 0);
COMMIT;
