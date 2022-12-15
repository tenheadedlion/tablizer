CREATE TABLE bridge_pairs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    asset0_id INTEGER,
    asset1_id INTEGER,
    bridge_id INTEGER,

    FOREIGN KEY(asset0_id) REFERENCES assets(id),
    FOREIGN KEY(asset1_id) REFERENCES assets(id),
    FOREIGN KEY(bridge_id) REFERENCES bridges(id),
)
