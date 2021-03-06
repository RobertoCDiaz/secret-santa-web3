import { MutableRefObject } from 'react';
import { ethers } from 'ethers';
import Web3Modal from 'web3modal';

import { CONTRACT_ADDRESS, CONTRACT_ABI } from '../constants';

/**
 * Return type for the promise in the `getProviderOrSigner` function.
 */
type ProviderOrSigner = ethers.providers.Web3Provider | ethers.providers.JsonRpcSigner;

// Rinkeby's Testnet ID is 4.
const NETWORK_ID: number = 4;

/**
 * Returns a Provider if the operations to be executed on the blockchain are "read-only".
 * If you need to actually update the state on the blockchain, you should ask this function for a Signer instead.
 * 
 * @param web3ModalReference - React reference to a Web3Modal instance.
 * @param shouldBeSigner - Whether the return type of the promise should be a signer or not.
 * @returns Provider or Signer, depending on the arguments passed.
 */
export async function getProviderOrSigner(web3ModalReference: MutableRefObject<Web3Modal>,  shouldBeSigner: boolean = false): Promise<ProviderOrSigner> {
    const provider = await web3ModalReference.current.connect();
    const web3Provider = new ethers.providers.Web3Provider(provider);

    // check if it's connected to a blockchain network
    const { chainId } = await web3Provider.getNetwork();
    if (chainId !== NETWORK_ID) {
        alert('Please, connect using the appropiate Ethereum network');
        return;
    }

    return shouldBeSigner ? web3Provider.getSigner() : web3Provider;
}

/**
 * Creates a new contract instance to perform operations on the Ethereum Blockchain's instance of the SecretSantaOrganizer smart contract.
 * 
 * @param web3ModalReference - React reference to a Web3Modal object.
 * @param usingSigner - Whether the contract should be created using a Signer or not. If false, a Provider will be used instead.
 * @returns Freshly created contract instance.
 */
export async function newContractInstance(web3ModalReference: MutableRefObject<Web3Modal>, usingSigner: boolean = false): Promise<ethers.Contract> {
    const contract = new ethers.Contract(
        CONTRACT_ADDRESS,
        CONTRACT_ABI,
        await getProviderOrSigner(web3ModalReference, usingSigner),
    );

    return contract;
}

/**
 * Connects to an Ethereum Wallet using a Web3Modal.
 * 
 * @param web3ModalReference - React reference to a Web3Modal object.
 */
export async function connectToWallet(web3ModalReference: MutableRefObject<Web3Modal>) {
    await web3ModalReference.current.connect();
}

/**
 * Creates a new instance of a Web3Modal object.
 * 
 * @returns Web3Model instance.
 */
export function newWeb3ModalInstance(): Web3Modal {
    return new Web3Modal({
        network: 'rinkeby',
        providerOptions: {},
        disableInjectedProvider: false,
    });;
}