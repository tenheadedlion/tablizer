import axios from 'axios';
import { pruntime_rpc } from './proto/pruntime_rpc';

export class PRuntimeApi {
  uri = '';
  rpc: pruntime_rpc.PhactoryAPI;
  constructor(endpoint: string) {
    this.uri = endpoint;
    const client = axios.create({
      baseURL: endpoint,
      headers: {
        'Content-Type': 'application/octet-stream',
      },
      responseType: 'arraybuffer',
    });
    this.rpc = new pruntime_rpc.PhactoryAPI((method, data, callback) => {
      client
        .post('/prpc/PhactoryAPI.' + method.name, data)
        .then((r) => callback(null, r.data))
        .catch((error) => callback(error));
    });
  }

  async getInfo() {
    return await this.rpc.getInfo({});
  }

  async calculateContractId(args: pruntime_rpc.IContractParameters) {
    console.log(`calculateContractId(${JSON.stringify(args)})`);
    return await this.rpc.calculateContractId(args);
  }
}

module.exports = { PRuntimeApi };
