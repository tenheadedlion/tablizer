import { Command, Flags } from '@oclif/core';
import { get } from '../contract/get';
import { set } from '../contract/set';
import { join, resolve } from 'path';

const SQLITE3_FILENAME = 'db.sqlite';

export default class Contract extends Command {
  static description = 'contract deployment and invocation';

  static examples = ['<%= config.bin %> <%= command.id %>'];

  static flags = {
    runtime: Flags.string({ char: 'r', description: 'runtime endpoint' }),
    node: Flags.string({ char: 'n', description: 'node endpoint' }),
    address: Flags.string({ char: 'a', description: 'contract address' }),
    database: Flags.string({ char: 'd', description: 'database file path' }),
    set: Flags.boolean({ description: 'save data to the registry contract' }),
    get: Flags.boolean({ description: 'get data from the registry contract' }),
  };

  public async run(): Promise<void> {
    const { flags } = await this.parse(Contract);

    const node = flags.node ?? `ws://localhost:9944`;
    const runtime = flags.runtime ?? `http://localhost:8000`;
    const address =
      flags.address ??
      `0x5374e93b68b40e3800785044e09a83a8502794516308597da6063c8bca46f3c9`;
    const db =
      flags.database ?? join(resolve(__dirname, '../..'), SQLITE3_FILENAME);

    if (flags.get && flags.set) {
      this.log('can not set flag "get" and "save" at the same time');
      return;
    } else if (flags.get) {
      this.log(`get graph`);
      get(node, runtime, address);
    } else if (flags.set) {
      this.log(`set graph`);
      set(node, runtime, address, db);
    } else {
      this.log('Neither set nor get, exiting...');
    }
  }
}
