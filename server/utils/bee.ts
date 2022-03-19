import { Bee } from '@ethersphere/bee-js';
import fs from 'fs';
import { requireEnv } from './env';

const postageBatchId = requireEnv('SWARM_POSTAGE_BATCH_ID');
const bee = new Bee(requireEnv('BEE_NODE_URL'));

export const uploadFile = async (file: Express.Multer.File) => {
  const buffer = await new Promise<Buffer>((res, rej) => {
    fs.readFile(file.path, (err, data) => {
      if (err) {
        rej(err);

        return;
      }

      res(data);
    });
  });

  const { reference } = await bee.uploadFile(postageBatchId, buffer, file.filename, { contentType: file.mimetype });

  return reference;
}
