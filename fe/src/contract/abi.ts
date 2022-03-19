const abi = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "targetIndex",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "maximumIndex",
        type: "uint256",
      },
    ],
    name: "IndexOutOfBound",
    type: "error",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "string",
            name: "name",
            type: "string",
          },
          {
            internalType: "string",
            name: "website",
            type: "string",
          },
          {
            internalType: "string",
            name: "maskedUsername",
            type: "string",
          },
          {
            internalType: "string",
            name: "encryptedUsername",
            type: "string",
          },
          {
            internalType: "string",
            name: "encryptedPassword",
            type: "string",
          },
        ],
        internalType: "struct DePassword.Credential",
        name: "_credential",
        type: "tuple",
      },
    ],
    name: "addCredential",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "string",
            name: "name",
            type: "string",
          },
          {
            internalType: "string",
            name: "fileName",
            type: "string",
          },
          {
            internalType: "string",
            name: "fileType",
            type: "string",
          },
          {
            internalType: "string",
            name: "swarmReference",
            type: "string",
          },
        ],
        internalType: "struct DePassword.File",
        name: "_file",
        type: "tuple",
      },
    ],
    name: "addFile",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "credentialCount",
    outputs: [
      {
        internalType: "uint256",
        name: "count",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
    ],
    name: "deleteCredential",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
    ],
    name: "deleteFile",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "fileCount",
    outputs: [
      {
        internalType: "uint256",
        name: "count",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "listCredentials",
    outputs: [
      {
        components: [
          {
            internalType: "string",
            name: "name",
            type: "string",
          },
          {
            internalType: "string",
            name: "website",
            type: "string",
          },
          {
            internalType: "string",
            name: "maskedUsername",
            type: "string",
          },
          {
            internalType: "string",
            name: "encryptedUsername",
            type: "string",
          },
          {
            internalType: "string",
            name: "encryptedPassword",
            type: "string",
          },
        ],
        internalType: "struct DePassword.Credential[]",
        name: "credentials",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "listFiles",
    outputs: [
      {
        components: [
          {
            internalType: "string",
            name: "name",
            type: "string",
          },
          {
            internalType: "string",
            name: "fileName",
            type: "string",
          },
          {
            internalType: "string",
            name: "fileType",
            type: "string",
          },
          {
            internalType: "string",
            name: "swarmReference",
            type: "string",
          },
        ],
        internalType: "struct DePassword.File[]",
        name: "files",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
      {
        components: [
          {
            internalType: "string",
            name: "name",
            type: "string",
          },
          {
            internalType: "string",
            name: "website",
            type: "string",
          },
          {
            internalType: "string",
            name: "maskedUsername",
            type: "string",
          },
          {
            internalType: "string",
            name: "encryptedUsername",
            type: "string",
          },
          {
            internalType: "string",
            name: "encryptedPassword",
            type: "string",
          },
        ],
        internalType: "struct DePassword.Credential",
        name: "_credential",
        type: "tuple",
      },
    ],
    name: "updateCredential",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

export default abi;