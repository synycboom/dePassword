import * as dotenv from 'dotenv';

dotenv.config();

import express, { Application } from "express";
import cors from 'cors';
import logger from './utils/logger';
import errorHandler from './errors/handler';
import fileHandler from './apis/file';

const app: Application = express();
const port = process.env.PORT || 8080;
const domains: RegExp[] = [/\.ethswarm\.org$/, /\.bzz\.link$/];

app.use(
  cors({
    origin: [/localhost:*/, ...domains],
    credentials: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/v1/files', fileHandler);
app.use(errorHandler);

async function start() {
  app.listen(port, (): void => {
    logger.info(`Running server on port ${port}`);
  });
}

start().catch((err) => {
  logger.error(err.message, { stack: err.stack });
  process.exit(1);
});
