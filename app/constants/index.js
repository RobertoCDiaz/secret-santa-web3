export const CONTRACT_ADDRESS = "0xa753204f0993037f9C50741FafC4f1A30f3a85B0";
export const CONTRACT_ABI = [
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "eventId",
        "type": "string"
      },
      {
        "internalType": "string[]",
        "name": "participants",
        "type": "string[]"
      },
      {
        "internalType": "uint256",
        "name": "date",
        "type": "uint256"
      }
    ],
    "name": "createEvent",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "eventId",
        "type": "string"
      }
    ],
    "name": "eventExists",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "eventId",
        "type": "string"
      }
    ],
    "name": "getEventDate",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "eventId",
        "type": "string"
      }
    ],
    "name": "getOrder",
    "outputs": [
      {
        "internalType": "string[]",
        "name": "",
        "type": "string[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];