# dePassword
A decentrailzed password and file management.

## Demo
TODO

## Deploy smart contracts on rinkeby network
```
$ cd contracts
$ npx hardhat compile
$ npm run rinkeby:deploy-v1
```
Deployed DePassword contract on Rinkeby: 0x1eA0b3dAb82B2802B122D8C78B424964E9B26022

## Running a server
1. You need to deploy your bee node. You can follow this guide https://docs.ethswarm.org/docs/installation/quick-start
2. Fund your node and buy a batch of stamps. You'll get a batchID and wait for it to be ready to use.
3. Configure environment variables, set your SWARM_POSTAGE_BATCH_ID and BEE_NODE_URL, and other variables.
```shell
$ cd server
$ cat .env.example > .env
```
4. If this is the first time, install dependencies
```shell
$ cd server
$ npm ci
```
5. Run the server
```
$ npm run build
$ npm run start
```
