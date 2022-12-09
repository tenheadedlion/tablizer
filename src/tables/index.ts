import { readFileSync } from 'fs';
import * as yaml from 'js-yaml';
import { join } from 'path';

function parse(file: string): any {
  return yaml.load(readFileSync(file, 'utf8')) as Record<string, any>;
}

export function parseConfig(filePath: string) {
  const config = parse(filePath);
  console.log(config);
  const assets = config['assets'];
  console.log(assets[0].symbol);
}
