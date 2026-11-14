# Mercy Omini — MIT 8103

Student ID: 301920712

Artisan Production Batch Tracker. Entities: Maker, Garment, Fabric, ProductionBatch, and BatchMaterial; each batch links a maker and garment, while its material rows link fabrics. Rule: ProductionBatch.batch_code is UNIQUE. Query: total fabric used per maker and garment. Transaction: create a batch and its material rows atomically. MongoDB event logs: snapshot the batch with its maker, garment, and fabrics.

The portfolio is being generated. Completed stages will appear in the commit history.
