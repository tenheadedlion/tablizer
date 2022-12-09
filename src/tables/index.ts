import { readFileSync, unlinkSync, existsSync } from 'fs';
import * as yaml from 'js-yaml';
import * as Database from 'better-sqlite3';

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
  insertChains(db, chains);
  insertAssets(db, assets);
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
    const res = db.prepare(sql, [asset.chain]).get(asset.chain);
    stmt.run([asset.symbol, res.id]);
  }
}
