import * as PhalaSdk from '@phala/sdk';
import { ApiPromise, WsProvider, Keyring } from '@polkadot/api';
import { ContractPromise } from '@polkadot/api-contract';
import * as fs from 'fs';
import { PRuntimeApi } from './pruntime';
import '@polkadot/api-augment';
import { types as PhalaSDKTypes } from '@phala/sdk';
import { khalaDev as KhalaTypes } from '@phala/typedefs';
import { join, resolve } from 'path';
import { contractApi, hex, loadContractFile } from './commons';

export async function get(node: string, runtime: string, contractID: string) {
  const nodeUrl = node;
  const workerUrls = [runtime];

  const contract = loadContractFile(join(__dirname, './res/registry.contract'));

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

  const client = await contractApi(api, pruntimeURL, contract, contractID);

  const keyring = new Keyring({ type: 'sr25519' });
  const alice = keyring.addFromUri('//Alice');
  const certAlice = await PhalaSdk.signCertificate({
    api: api,
    pair: alice,
  });

  const res = await client.query.getGraph(certAlice as unknown as string, {});
  console.log(res.output?.toJSON());

  await api.disconnect();
}
