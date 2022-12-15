CREATE TABLE bridges (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    location TEXT,

    FOREIGN KEY(chain_id) REFERENCES chains(id);
)
