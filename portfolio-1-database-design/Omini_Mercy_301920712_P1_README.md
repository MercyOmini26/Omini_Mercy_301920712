# Portfolio 1 — Database Design and Modelling

I organised the data into maker, garment, fabric, production_batch, batch_material. The design document explains the fields, keys, relationships and business rules. The normalisation document shows the sample tables at 1NF, 2NF and 3NF.

## Database checks

| Table | Rows |
| --- | --- |
| maker | 1 |
| garment | 1 |
| fabric | 1 |
| production_batch | 1 |
| batch_material | 1 |

The 13 invalid inserts were rejected at their expected constraints, and the valid sample rows remained unchanged.

## Files

- [Design](Omini_Mercy_301920712_P1_Design.md)
- [ER diagram](Omini_Mercy_301920712_P1_ERDiagram.md)
- [Normalisation](Omini_Mercy_301920712_P1_Normalisation.md)
- [Schema](Omini_Mercy_301920712_P1_Schema.sql)
- [Sample data](Omini_Mercy_301920712_P1_SampleData.sql)
- [Constraint tests](Omini_Mercy_301920712_P1_ConstraintTests.sql)
- [Table and constraint evidence](screenshots/Omini_Mercy_301920712_P1_DatabaseResults.png)

## Run the SQL

Create a fresh PostgreSQL database. Run the schema first, then the sample data. Run the deliberately invalid statements in ConstraintTests.sql individually outside a transaction; each is expected to produce an error.

## References

- [PostgreSQL — constraints](https://www.postgresql.org/docs/17/ddl-constraints.html)

