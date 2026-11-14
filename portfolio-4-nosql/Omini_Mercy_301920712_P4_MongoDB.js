// Run once in mongosh against a fresh exercise database.
// These records are fictional events for the case study.
(async function () {
  db = db.getSiblingDB('portfolio_nosql');
  if ((await db.getCollectionNames()).includes("batch_events")) {
    throw new Error('The exercise collection already exists. Use a fresh database.');
  }

  // The validator checks the stable event fields while details can vary.
  await db.createCollection("batch_events", {
    validator: {
    "$jsonSchema": {
        "bsonType": "object",
        "required": [
            "_id",
            "schemaVersion",
            "simulation",
            "eventType",
            "occurredAt",
            "source",
            "embedded",
            "references",
            "details"
        ],
        "properties": {
            "_id": {
                "bsonType": "string",
                "minLength": 1
            },
            "schemaVersion": {
                "enum": [
                    1
                ]
            },
            "simulation": {
                "enum": [
                    true
                ]
            },
            "eventType": {
                "bsonType": "string",
                "enum": [
                    "batch_created",
                    "batch_material_added"
                ]
            },
            "occurredAt": {
                "bsonType": "date"
            },
            "source": {
                "bsonType": "object",
                "required": [
                    "entity",
                    "key",
                    "snapshot"
                ],
                "properties": {
                    "entity": {
                        "enum": [
                            "batch_material"
                        ]
                    },
                    "key": {
                        "bsonType": "object",
                        "required": [
                            "batch_material_id"
                        ]
                    },
                    "snapshot": {
                        "bsonType": "object"
                    }
                }
            },
            "embedded": {
                "bsonType": "object"
            },
            "references": {
                "bsonType": "object"
            },
            "details": {
                "bsonType": "object"
            }
        }
    }
},
    validationLevel: 'strict', validationAction: 'error'
  });

  // Insert the four example events and show their IDs.
  printjson(await db.getCollection("batch_events").insertMany([
    {
        "_id": "event_000001",
        "schemaVersion": 1,
        "simulation": true,
        "eventType": "batch_created",
        "occurredAt": ISODate("2030-01-01T10:00:00Z"),
        "source": {
            "entity": "batch_material",
            "key": {
                "batch_material_id": 5001
            },
            "snapshot": {
                "batch_material_id": 5001,
                "batch_id": 4001,
                "fabric_id": 3001,
                "quantity_used": 12.5
            }
        },
        "embedded": {
            "production_batch": [
                {
                    "key": {
                        "batch_id": 4001
                    },
                    "snapshot": {
                        "batch_id": 4001,
                        "batch_code": "BATCH-001",
                        "maker_id": 1001,
                        "garment_id": 2001,
                        "started_on": "2026-10-12",
                        "status": "in_progress"
                    },
                    "via": [
                        "batch_material.batch_id → production_batch"
                    ]
                }
            ],
            "maker": [
                {
                    "key": {
                        "maker_id": 1001
                    },
                    "snapshot": {
                        "maker_id": 1001,
                        "maker_name": "Aster Loom",
                        "region": "North"
                    },
                    "via": [
                        "batch_material.batch_id → production_batch.maker_id → maker"
                    ]
                }
            ],
            "garment": [
                {
                    "key": {
                        "garment_id": 2001
                    },
                    "snapshot": {
                        "garment_id": 2001,
                        "garment_name": "Field Jacket",
                        "garment_type": "Outerwear"
                    },
                    "via": [
                        "batch_material.batch_id → production_batch.garment_id → garment"
                    ]
                }
            ],
            "fabric": [
                {
                    "key": {
                        "fabric_id": 3001
                    },
                    "snapshot": {
                        "fabric_id": 3001,
                        "fabric_name": "Cedar Weave",
                        "fiber_content": "Cotton"
                    },
                    "via": [
                        "batch_material.fabric_id → fabric"
                    ]
                }
            ]
        },
        "references": {},
        "details": {
            "channel": "web"
        }
    },
    {
        "_id": "event_000002",
        "schemaVersion": 1,
        "simulation": true,
        "eventType": "batch_material_added",
        "occurredAt": ISODate("2030-01-01T10:01:00Z"),
        "source": {
            "entity": "batch_material",
            "key": {
                "batch_material_id": 5001
            },
            "snapshot": {
                "batch_material_id": 5001,
                "batch_id": 4001,
                "fabric_id": 3001,
                "quantity_used": 12.5
            }
        },
        "embedded": {
            "production_batch": [
                {
                    "key": {
                        "batch_id": 4001
                    },
                    "snapshot": {
                        "batch_id": 4001,
                        "batch_code": "BATCH-001",
                        "maker_id": 1001,
                        "garment_id": 2001,
                        "started_on": "2026-10-12",
                        "status": "in_progress"
                    },
                    "via": [
                        "batch_material.batch_id → production_batch"
                    ]
                }
            ],
            "maker": [
                {
                    "key": {
                        "maker_id": 1001
                    },
                    "snapshot": {
                        "maker_id": 1001,
                        "maker_name": "Aster Loom",
                        "region": "North"
                    },
                    "via": [
                        "batch_material.batch_id → production_batch.maker_id → maker"
                    ]
                }
            ],
            "garment": [
                {
                    "key": {
                        "garment_id": 2001
                    },
                    "snapshot": {
                        "garment_id": 2001,
                        "garment_name": "Field Jacket",
                        "garment_type": "Outerwear"
                    },
                    "via": [
                        "batch_material.batch_id → production_batch.garment_id → garment"
                    ]
                }
            ],
            "fabric": [
                {
                    "key": {
                        "fabric_id": 3001
                    },
                    "snapshot": {
                        "fabric_id": 3001,
                        "fabric_name": "Cedar Weave",
                        "fiber_content": "Cotton"
                    },
                    "via": [
                        "batch_material.fabric_id → fabric"
                    ]
                }
            ]
        },
        "references": {},
        "details": {
            "channel": "mobile",
            "note": "Illustrative event-specific metadata",
            "examples": {
                "materials": "illustrative materials",
                "fabric_snapshot": "illustrative fabric_snapshot"
            }
        }
    }
]));
  await db.getCollection("batch_events").createIndex({eventType: 1, occurredAt: -1}, {name: 'event_type_time'});

  // 1. Find the first sample event type (up to five documents).
  printjson(await db.getCollection("batch_events").find({"eventType":"batch_created"}).sort({_id:1}).limit(5).toArray());

  // 2. Find events for the first source record using nested key fields (up to five).
  printjson(await db.getCollection("batch_events").find({"source.key.batch_material_id":5001}).sort({_id:1}).limit(5).toArray());

  // 3. Find events in the sample time range using a MongoDB Date filter (up to five).
  printjson(await db.getCollection("batch_events").find({"occurredAt":{"$gte":ISODate("2030-01-01T10:00:00Z"), "$lt":ISODate("2030-01-01T11:00:00Z")}}).sort({_id:1}).limit(5).toArray());

  // 4. Count documents for each event type.
  printjson(await db.getCollection("batch_events").aggregate([{"$group":{"_id":"$eventType", "documentCount":{"$sum":1}}}, {"$sort":{"_id":1}}]).toArray());

  // A date stored as text should be rejected by the validator.
  try {
    await db.getCollection("batch_events").insertOne({...{
    "_id": "event_000001",
    "schemaVersion": 1,
    "simulation": true,
    "eventType": "batch_created",
    "occurredAt": ISODate("2030-01-01T10:00:00Z"),
    "source": {
        "entity": "batch_material",
        "key": {
            "batch_material_id": 5001
        },
        "snapshot": {
            "batch_material_id": 5001,
            "batch_id": 4001,
            "fabric_id": 3001,
            "quantity_used": 12.5
        }
    },
    "embedded": {
        "production_batch": [
            {
                "key": {
                    "batch_id": 4001
                },
                "snapshot": {
                    "batch_id": 4001,
                    "batch_code": "BATCH-001",
                    "maker_id": 1001,
                    "garment_id": 2001,
                    "started_on": "2026-10-12",
                    "status": "in_progress"
                },
                "via": [
                    "batch_material.batch_id → production_batch"
                ]
            }
        ],
        "maker": [
            {
                "key": {
                    "maker_id": 1001
                },
                "snapshot": {
                    "maker_id": 1001,
                    "maker_name": "Aster Loom",
                    "region": "North"
                },
                "via": [
                    "batch_material.batch_id → production_batch.maker_id → maker"
                ]
            }
        ],
        "garment": [
            {
                "key": {
                    "garment_id": 2001
                },
                "snapshot": {
                    "garment_id": 2001,
                    "garment_name": "Field Jacket",
                    "garment_type": "Outerwear"
                },
                "via": [
                    "batch_material.batch_id → production_batch.garment_id → garment"
                ]
            }
        ],
        "fabric": [
            {
                "key": {
                    "fabric_id": 3001
                },
                "snapshot": {
                    "fabric_id": 3001,
                    "fabric_name": "Cedar Weave",
                    "fiber_content": "Cotton"
                },
                "via": [
                    "batch_material.fabric_id → fabric"
                ]
            }
        ]
    },
    "references": {},
    "details": {
        "channel": "web"
    }
}, _id: 'invalid_date_example', occurredAt: 'not-a-date'});
  } catch (error) { print('Invalid date error: ' + error.code); }

  // Reusing an event ID should be rejected by the unique _id index.
  try { await db.getCollection("batch_events").insertOne({
    "_id": "event_000001",
    "schemaVersion": 1,
    "simulation": true,
    "eventType": "batch_created",
    "occurredAt": ISODate("2030-01-01T10:00:00Z"),
    "source": {
        "entity": "batch_material",
        "key": {
            "batch_material_id": 5001
        },
        "snapshot": {
            "batch_material_id": 5001,
            "batch_id": 4001,
            "fabric_id": 3001,
            "quantity_used": 12.5
        }
    },
    "embedded": {
        "production_batch": [
            {
                "key": {
                    "batch_id": 4001
                },
                "snapshot": {
                    "batch_id": 4001,
                    "batch_code": "BATCH-001",
                    "maker_id": 1001,
                    "garment_id": 2001,
                    "started_on": "2026-10-12",
                    "status": "in_progress"
                },
                "via": [
                    "batch_material.batch_id → production_batch"
                ]
            }
        ],
        "maker": [
            {
                "key": {
                    "maker_id": 1001
                },
                "snapshot": {
                    "maker_id": 1001,
                    "maker_name": "Aster Loom",
                    "region": "North"
                },
                "via": [
                    "batch_material.batch_id → production_batch.maker_id → maker"
                ]
            }
        ],
        "garment": [
            {
                "key": {
                    "garment_id": 2001
                },
                "snapshot": {
                    "garment_id": 2001,
                    "garment_name": "Field Jacket",
                    "garment_type": "Outerwear"
                },
                "via": [
                    "batch_material.batch_id → production_batch.garment_id → garment"
                ]
            }
        ],
        "fabric": [
            {
                "key": {
                    "fabric_id": 3001
                },
                "snapshot": {
                    "fabric_id": 3001,
                    "fabric_name": "Cedar Weave",
                    "fiber_content": "Cotton"
                },
                "via": [
                    "batch_material.fabric_id → fabric"
                ]
            }
        ]
    },
    "references": {},
    "details": {
        "channel": "web"
    }
}); }
  catch (error) { print('Duplicate ID error: ' + error.code); }

  print('Document count: ' + await db.getCollection("batch_events").countDocuments());
})().catch(error => { print(error.stack || String(error)); quit(1); });
