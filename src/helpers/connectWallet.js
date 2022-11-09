
import {toast} from "react-toastify";
import {connectors} from "./injectedConnector";

const WALLET_CONNECT_TYPE = {
    META_MASK: connectors.injected,
    WALLET_CONNECT: connectors.walletConnect,
    COIN_BASE: connectors.coinbaseWallet
}

export const connectWallet = async(activate,errorMessageCallback, walletType = 'META_MASK')=>{

    await activate(WALLET_CONNECT_TYPE[walletType], async (error) => {
        toast.error(error.message);
        console.log(error);
        errorMessageCallback(error.message);
    });
}