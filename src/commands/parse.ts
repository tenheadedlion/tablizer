import { Command, Flags } from '@oclif/core';
import { parseConfig } from '../tables/insert-table';
import { join, resolve } from 'path';

const YAML_CONFIG_FILENAME = 'resources.yaml';
const SQLITE3_FILENAME = 'db.sqlite';

export default class Parse extends Command {
  static description = 'parse a yaml-formatted graph manifest file';

  static examples = ['<%= config.bin %> <%= command.id %>'];

  static flags = {
    config: Flags.string({
      char: 'c',
      description: 'configuration file to be parsed',
    }),
    db: Flags.string({
      char: 'd',
      description: 'sqlite3 file',
    }),
  };

  public async run(): Promise<void> {
    const { flags } = await this.parse(Parse);
    const config =
      flags.file ?? join(resolve(__dirname, '../..'), YAML_CONFIG_FILENAME);
    const db =
      flags.file ?? join(resolve(__dirname, '../..'), SQLITE3_FILENAME);
    this.log(`configuration: ${config}`);
    this.log(`sqlite3: ${db}`);
    parseConfig(config, db);
  }
}
