import { ContractPromise } from '@polkadot/api-contract';
import * as PhalaSdk from '@phala/sdk';
import * as fs from 'fs';
import { SignerOptions, SubmittableExtrinsic } from '@polkadot/api/types';
import type { ISubmittableResult } from '@polkadot/types/types';
import type { KeyringPair } from '@polkadot/keyring/types';

export async function estimateGas(
  contract: ContractPromise,
  method: string,
  cert: PhalaSdk.CertificateData,
  args: unknown[],
) {
  const { gasRequired, storageDeposit } = await contract.query[method](
    cert as any,
    {},
    ...args,
  );
  console.log('gasRequired:', gasRequired.toJSON());
  console.log('storageDeposit:', storageDeposit.asCharge.toJSON());
  const options = {
    // value: 0,
    gasLimit: (gasRequired as any).refTime,
    storageDepositLimit: storageDeposit.isCharge
      ? storageDeposit.asCharge
      : null,
  };
  return options;
}

export async function contractApi(
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

export function hex(b: any) {
  if (typeof b != 'string') {
    b = Buffer.from(b).toString('hex');
  }
  if (!b.startsWith('0x')) {
    return '0x' + b;
  } else {
    return b;
  }
}

export function loadContractFile(contractFile: string) {
  const metadata = JSON.parse(fs.readFileSync(contractFile, 'utf8'));
  const constructor = metadata.V3.spec.constructors.find(
    (c: any) => c.label == 'default',
  ).selector;
  const name = metadata.contract.name;
  const wasm = metadata.source.wasm;
  return { wasm, metadata, constructor, name };
}

export class TxHandler {
  public static async handle(
    transaction: SubmittableExtrinsic<any>,
    keyringPair: KeyringPair,
  ): Promise<ISubmittableResult> {
    return new Promise<any>(async (resolve, reject) => {
      const unsub: any = await transaction.signAndSend(
        keyringPair,
        (result: any) => {
          if (result.status.isReady) {
          } else if (result.status.isBroadcast) {
          } else if (result.status.isInvalid) {
            reject(result);
          } else if (result.status.isDropped) {
            reject(result);
          } else if (result.status.isRetracted) {
            reject(result);
          } else if (result.status.isInBlock) {
            resolve(result);
          } else if (result.status.isUsurped) {
            reject(result);
          }

          if (result.status.isFinalized || result.status.isFinalityTimeout) {
            resolve(result);
            unsub();
          }
        },
      );
    });
  }
}
