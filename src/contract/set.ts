import * as PhalaSdk from '@phala/sdk';
import { ApiPromise, WsProvider, Keyring } from '@polkadot/api';
import { ContractPromise } from '@polkadot/api-contract';
import * as fs from 'fs';
import { PRuntimeApi } from './pruntime';
import '@polkadot/api-augment';
import { types as PhalaSDKTypes } from '@phala/sdk';
import { khalaDev as KhalaTypes } from '@phala/typedefs';
import {
  contractApi,
  estimateGas,
  hex,
  loadContractFile,
  TxHandler,
} from './commons';

export async function set() {
  const nodeUrl = 'ws://localhost:9944';
  const workerUrls = ['http://localhost:8000'];

  const contract = loadContractFile('./res/flipper.contract');

  const wsProvider = new WsProvider(nodeUrl);
  const api = await ApiPromise.create({
    provider: wsProvider,
    types: {
      ...KhalaTypes,
      ...PhalaSDKTypes,
    },
  });

  const workers = await Promise.all(
    workerUrls.map(async (endpoint: string) => {
      const papi = new PRuntimeApi(endpoint);
      const pubkey = hex((await papi.getInfo()).publicKey);
      return {
        url: endpoint,
        pubkey: pubkey,
        api: papi,
      };
    }),
  );

  const default_worker = workers[0];
  const pruntimeURL = default_worker.url;
  console.log(`Connect to ${pruntimeURL} for query`);

  const flipper = await contractApi(
    api,
    pruntimeURL,
    contract,
    '0xf156b3be0c6e18db4161f0c49e59e371c96fe534398a6b83a29de7615bc230d1',
  );

  const keyring = new Keyring({ type: 'sr25519' });
  const alice = keyring.addFromUri('//Alice');
  const certAlice = await PhalaSdk.signCertificate({
    api: api,
    pair: alice,
  });

  const txConf = await estimateGas(flipper, 'flip', certAlice, []);
  const tx = flipper.tx.flip(txConf);
  await TxHandler.handle(tx, alice);

  await api.disconnect();
}
