CREATE TABLE dexs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    chain_id INTEGER,

    FOREIGN KEY(chain_id) REFERENCES chains(id)
)