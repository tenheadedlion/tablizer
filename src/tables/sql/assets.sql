CREATE TABLE assets (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    symbol TEXT,
    name TEXT,
    location TEXT,
    decimals INTEGER,
    chain_id INTEGER,

    FOREIGN KEY(chain_id) REFERENCES chains(id)
)