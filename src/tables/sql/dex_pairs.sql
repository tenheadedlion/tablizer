CREATE TABLE dex_pairs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    asset0_id INTEGER,
    asset1_id INTEGER,
    dex_id INTEGER,
    pair_id TEXT,

    FOREIGN KEY(asset0_id) REFERENCES assets(id)
    FOREIGN KEY(asset1_id) REFERENCES assets(id)
    FOREIGN KEY(dex_id) REFERENCES dexs(id)
)
