import os from 'os';
import express from 'express';
import asyncHandler from 'express-async-handler';
import multer from 'multer';
import { validationResult, checkSchema } from 'express-validator';
import { requireEnv } from '../utils/env';
import { ExtendedRequest } from './type';
import ValidationError from '../errors/validation';
import { uploadFile } from '../utils/bee';

const maxFileSize = parseInt(requireEnv('MAX_UPLOAD_FILE_SIZE_IN_MIB')) || 1_310_720; // 10MiB as default
const router = express.Router();
const upload = multer({
  dest: os.tmpdir(),
});

const updateValidator = checkSchema({
  encryptedFile: {
    custom: {
      options: (_, { req }) => {
        if (!req.file) {
          throw new Error('encryptedFile is required');
        }
        if (req.file.size > maxFileSize) {
          throw new Error(`file size exceeds maximum limit at ${maxFileSize / 1024 / 1024}MiB`);
        }

        return true;
      }
    }
  },
});

router.post(
  '/upload',
  upload.single('encryptedFile'),
  updateValidator,
  asyncHandler(async (req: ExtendedRequest, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new ValidationError(errors.array());
    }

    const reference = await uploadFile(req.file!);

    res.json({ reference });
  }),
);

export default router;
