import { Contract, ethers, Wallet } from "ethers";
import { unichatAbi, unichatAddress } from "../constants";
import * as dotenv from 'dotenv';

dotenv.config()

export const getWallet = () => {
    const url = process.env.URL;
    const private_key = process.env.PRIVATE_KEY;
    const provider = new ethers.providers.JsonRpcProvider(url);
    //provider.getBalance("0x739c0b2413B8778Dfd2B8cBA58b1FAc12A3AEb6E").then(x => console.log(x.toNumber()))
    //provider.getBlock.then(console.log)
    //@ts-ignore
    const walletPrivateKey = new Wallet(private_key)
    //console.log(walletPrivateKey)
    const wallet = walletPrivateKey.connect(provider)

    return { provider, wallet, walletPrivateKey }
}

export const getContractReference = () => {
    const { provider, wallet } = getWallet()
    provider.listAccounts().then(x => console.log("ACCOUNTS", x)) // this is going to be empty
    const signer = wallet
    //console.log("SIGNER", signer)
    const unichatContract = new ethers.Contract(unichatAddress, unichatAbi, signer); 
    const connectedContract = unichatContract.connect(signer)
    //connectedContract.deployed().then(x => console.log("Connected Contract", x))
    return connectedContract
}

