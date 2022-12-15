import * as PhalaSdk from '@phala/sdk';
import { ApiPromise, WsProvider, Keyring } from '@polkadot/api';
import { ContractPromise } from '@polkadot/api-contract';
import * as fs from 'fs';
import { PRuntimeApi } from './pruntime';
import '@polkadot/api-augment';
import { types as PhalaSDKTypes } from '@phala/sdk';
import { khalaDev as KhalaTypes } from '@phala/typedefs';

export async function get(node: string, runtime: string, contractID: string) {
  const nodeUrl = node;
  const workerUrls = [runtime];

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

  console.log(`contract: ${contract}`);

  const flipper = await contractApi(api, pruntimeURL, contract, contractID);

  const keyring = new Keyring({ type: 'sr25519' });
  const alice = keyring.addFromUri('//Alice');
  const certAlice = await PhalaSdk.signCertificate({
    api: api,
    pair: alice,
  });

  const res = await flipper.query['get'](certAlice as unknown as string, {});
  console.log(`result: ${res.output}`);

  await api.disconnect();
}

async function contractApi(
  api: any,
  pruntimeUrl: any,
  contract: any,
  contractID: string,
) {
  const { api: workerApi } = await PhalaSdk.create({
    api,
    baseURL: pruntimeUrl,
    contractId: contractID,
    autoDeposit: true,
  });
  const contractApi = new ContractPromise(
    <any>workerApi,
    contract.metadata,
    contractID,
  );
  return contractApi;
}

function hex(b: any) {
  if (typeof b != 'string') {
    b = Buffer.from(b).toString('hex');
  }
  if (!b.startsWith('0x')) {
    return '0x' + b;
  } else {
    return b;
  }
}

function loadContractFile(contractFile: string) {
  const metadata = JSON.parse(fs.readFileSync(contractFile, 'utf8'));
  const constructor = metadata.V3.spec.constructors.find(
    (c: any) => c.label == 'default',
  ).selector;
  const name = metadata.contract.name;
  const wasm = metadata.source.wasm;
  return { wasm, metadata, constructor, name };
}
