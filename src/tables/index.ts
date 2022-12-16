import { readFileSync, unlinkSync, existsSync } from 'fs';
import * as yaml from 'js-yaml';
import Database from 'better-sqlite3';

import { createLogger, format, transports } from 'winston';

const logger = createLogger({
  transports: [new transports.Console()],
  format: format.combine(
    format.colorize(),
    format.timestamp(),
    format.printf(({ timestamp, level, message }) => {
      return `[${timestamp}] ${level}: ${message}`;
    }),
  ),
});

function parse(file: string): any {
  return yaml.load(readFileSync(file, 'utf8')) as Record<string, any>;
}

export function parseConfig(filePath: string, dbPath: string) {
  const config = parse(filePath);
  insertDB(config, dbPath);
}

function insertDB(record: Record<string, any>, dbPath: string) {
  if (existsSync(dbPath)) {
    unlinkSync(dbPath);
  }
  logger.info(`dbPath: ${dbPath}`);
  const db = new Database(dbPath, { verbose: console.log });
  const chains = record['chains'];
  const assets = record['assets'];
  const dexs = record['dexs'];
  const dex_indexers = record['dex_indexers'];
  const dex_pairs = record['dex_pairs'];
  const bridge_pairs = record['bridge_pairs'];
  const bridges = record['bridges'];
  insertChains(db, chains);
  insertAssets(db, assets);
  insertDexs(db, dexs);
  insertDexIndexers(db, dex_indexers);
  insertDexPairs(db, dex_pairs);
  insertBridges(db, bridges);
  insertBridgePairs(db, bridge_pairs);
  exportDB(db);
  db.close();
}

function insertChains(db: any, chains: any) {
  db.exec(readFileSync(__dirname + '/sql/chains.sql').toString());
  const stmt = db.prepare('INSERT INTO chains (name, type) VALUES (?, ?)');
  for (const chain of chains) {
    let type = 0;
    if (chain.type === 'Ethereum') {
      type = 1;
    } else if (chain.type === 'Substrate') {
      type = 2;
    }
    stmt.run([chain.name, type]);
  }
}

function insertAssets(db: any, assets: any) {
  db.exec(readFileSync(__dirname + '/sql/assets.sql').toString());
  const stmt = db.prepare(
    'INSERT INTO assets (symbol, chain_id) VALUES (?, ?)',
  );
  for (const asset of assets) {
    const sql = `SELECT id FROM chains WHERE name = ?`;
    const res = db.prepare(sql).get(asset.chain);
    stmt.run([asset.symbol, res.id]);
  }
}

function insertDexs(db: any, dexs: any) {
  db.exec(readFileSync(__dirname + '/sql/dexs.sql').toString());
  const stmt = db.prepare('INSERT INTO dexs (name, chain_id) VALUES (?, ?)');
  for (const dex of dexs) {
    const sql = `SELECT id FROM chains WHERE name = ?`;
    const chain = dex.chain;
    const res = db.prepare(sql).get(chain);
    stmt.run([dex.name, res.id]);
  }
}

function insertDexIndexers(db: any, dex_indexers: any) {
  db.exec(readFileSync(__dirname + '/sql/dex_indexers.sql').toString());
  const stmt = db.prepare(
    'INSERT INTO dex_indexers (url, dex_id) VALUES (?, ?)',
  );
  for (const indexer_list of dex_indexers) {
    const sql = `SELECT id FROM dexs WHERE name = ?`;
    const dex = indexer_list.name;
    const res = db.prepare(sql).get(dex);
    for (const indexer of indexer_list.indexers) {
      stmt.run([indexer, res.id]);
    }
  }
}

function insertDexPairs(db: any, dexPairs: any) {
  db.exec(readFileSync(__dirname + '/sql/dex_pairs.sql').toString());
  const stmt = db.prepare(
    'INSERT INTO dex_pairs (asset0_id, asset1_id, dex_id, pair_id) VALUES (?, ?, ?, ?)',
  );

  for (const pair of dexPairs) {
    const sql = `SELECT assets.id AS asset_id
      FROM assets INNER JOIN chains ON assets.chain_id = chains.id
      WHERE assets.symbol = ? and chains.name = ?`;
    const symbol0 = pair.asset0;
    const symbol1 = pair.asset1;
    const chain = pair.chain;
    const res0 = db.prepare(sql).get(symbol0, chain);
    const res1 = db.prepare(sql).get(symbol1, chain);
    const sql2 = `SELECT id FROM dexs WHERE name = ?`;
    const dex = db.prepare(sql2).get(pair.dex);
    stmt.run([res0.asset_id, res1.asset_id, dex.id, pair.pair_id]);
  }
}

function insertBridges(db: any, bridges: any) {
  db.exec(readFileSync(__dirname + '/sql/bridges.sql').toString());
  const stmt = db.prepare('INSERT INTO bridges (name, location) VALUES (?, ?)');
  for (const bridge of bridges) {
    stmt.run([bridge.name, bridge.location]);
  }
}

function insertBridgePairs(db: any, bridgePairs: any) {
  db.exec(readFileSync(__dirname + '/sql/bridge_pairs.sql').toString());
  const stmt = db.prepare(
    'INSERT INTO bridge_pairs (asset0_id, asset1_id, bridge_id) VALUES (?, ?, ?)',
  );

  for (const pair of bridgePairs) {
    const sql = `SELECT assets.id AS asset_id
      FROM assets INNER JOIN chains ON assets.chain_id = chains.id
      WHERE assets.symbol = ? and chains.name = ?`;
    const symbol0 = pair.asset0.symbol;
    const chain0 = pair.asset0.chain;
    const symbol1 = pair.asset1.symbol;
    const chain1 = pair.asset1.chain;
    const res0 = db.prepare(sql).get(symbol0, chain0);
    const res1 = db.prepare(sql).get(symbol1, chain1);
    const sql2 = `SELECT id FROM bridges WHERE name = ?`;
    const bridge = db.prepare(sql2).get(pair.bridge);
    stmt.run([res0.asset_id, res1.asset_id, bridge.id]);
  }
}

function exportDB(db: any) {
  const chains = db.prepare('SELECT * FROM chains').all();
  console.log(chains);
  const assets = db.prepare('SELECT * FROM assets').all();
  console.log(assets);
  const dexs = db.prepare('SELECT * FROM dexs').all();
  console.log(dexs);
  const dexIndexers = db.prepare('SELECT * FROM dex_indexers').all();
  console.log(dexIndexers);
  const dexPairs = db.prepare('SELECT * FROM dex_pairs').all();
  console.log(dexPairs);
  const bridges = db.prepare('SELECT * FROM bridges').all();
  console.log(bridges);
  const bridgePairs = db.prepare('SELECT * FROM bridge_pairs').all();
  console.log(bridgePairs);
}
