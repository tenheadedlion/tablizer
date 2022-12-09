import { Command, Flags } from '@oclif/core';
import { parseConfig } from '../tables';
import { join, resolve } from 'path';

const YAML_CONFIG_FILENAME = '../resources.yaml';

export default class Parse extends Command {
  static description = 'parse a yaml-formatted graph manifest file';

  static examples = ['<%= config.bin %> <%= command.id %>'];

  static flags = {
    file: Flags.string({
      char: 'f',
      description: 'configuration file to be parsed',
    }),
  };

  public async run(): Promise<void> {
    const { flags } = await this.parse(Parse);
    const file =
      flags.file ?? join(resolve(__dirname, '..'), YAML_CONFIG_FILENAME);
    this.log(`parsing ${file}`);
    parseConfig(file);
  }
}
