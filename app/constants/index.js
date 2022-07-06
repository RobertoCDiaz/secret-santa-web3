export const CONTRACT_ADDRESS = "0x3C9bCd061994185c88FB739828e31992c7B2f1B1";
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