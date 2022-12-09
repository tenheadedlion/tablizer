DROP TABLE IF EXISTS assets;
CREATE TABLE assets (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    symbol TEXT,
    chain_id INTEGER,

    FOREIGN KEY(chain_id) REFERENCES chains(id)
)