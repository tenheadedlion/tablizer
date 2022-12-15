import { Command, Flags } from '@oclif/core';
import { deploy } from '../contract/deploy';

export default class Contract extends Command {
  static description = 'contract deployment and invocation';

  static examples = ['<%= config.bin %> <%= command.id %>'];

  static flags = {
    // flag with a value (-n, --name=VALUE)
    deploy: Flags.boolean({ char: 'd', description: 'deploy contract' }),
  };

  public async run(): Promise<void> {
    const { args, flags } = await this.parse(Contract);

    if (flags.deploy) {
      this.log('deploying contract');
      deploy();
    }
  }
}
