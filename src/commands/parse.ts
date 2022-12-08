import { Command, Flags } from '@oclif/core';
import { parseConfig } from '../tables';

export default class Parse extends Command {
  static description = 'parse a yaml-formatted graph manifest file';

  static examples = ['<%= config.bin %> <%= command.id %>'];

  static flags = {
    // flag with a value (-n, --name=VALUE)
    file: Flags.string({
      char: 'f',
      description: 'configuration file to be parsed2',
      required: true,
    }),
  };

  public async run(): Promise<void> {
    const { flags } = await this.parse(Parse);
    const file = flags.file;
    this.log(`parsing ${file}`);
    parseConfig(file);
  }
}
