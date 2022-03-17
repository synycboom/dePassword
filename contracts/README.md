# DePassword Smart Contracts

## Run tests
```shell
npx hardhat compile
npx hardhat test
```

## Deploy to hardhat network
1. First, start the hardhat node
```shell
npx hardhat node
```
2. Deploy contracts
```
npm run hardhat:deploy-v1
```

## Deploy to rinkeby network
```
npm run rinkeby:deploy-v1
```

# Etherscan verification
Copy the deployment address and paste it in to replace `DEPLOYED_CONTRACT_ADDRESS` in this command:

```shell
npx hardhat verify --network rinkeby DEPLOYED_CONTRACT_ADDRESS
```

# Performance optimizations

For faster runs of your tests and scripts, consider skipping ts-node's type checking by setting the environment variable `TS_NODE_TRANSPILE_ONLY` to `1` in hardhat's environment. For more details see [the documentation](https://hardhat.org/guides/typescript.html#performance-optimizations).
