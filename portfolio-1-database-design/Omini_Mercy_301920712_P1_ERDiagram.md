# Artisan Production Batch Tracker — ER diagram

```mermaid
erDiagram
    direction LR
    maker {
        bigint maker_id PK
        text maker_name
        text region
    }
    garment {
        bigint garment_id PK
        text garment_name
        text garment_type
    }
    fabric {
        bigint fabric_id PK
        text fabric_name
        text fiber_content
    }
    production_batch {
        bigint batch_id PK
        text batch_code UK
        bigint maker_id FK
        bigint garment_id FK
        date started_on
        text status
    }
    batch_material {
        bigint batch_material_id PK
        bigint batch_id FK
        bigint fabric_id FK
        numeric quantity_used
    }
    maker ||--o{ production_batch : "maker_id"
    garment ||--o{ production_batch : "garment_id"
    production_batch ||--o{ batch_material : "batch_id"
    fabric ||--o{ batch_material : "fabric_id"
```

PK identifies a record; FK links to another table; UK marks a single-field unique value. The relationship ends show exactly one, zero or one, or zero or many records. Composite unique keys and conditional rules are listed in the schema and design.

[Diagram image](../images/Omini_Mercy_301920712_ERDiagram.png)
