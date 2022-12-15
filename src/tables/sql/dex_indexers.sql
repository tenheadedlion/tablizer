CREATE TABLE dex_indexers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    URL TEXT,
    dex_id INTEGER,

    FOREIGN KEY(dex_id) REFERENCES dexs(id)
)