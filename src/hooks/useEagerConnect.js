import { useWeb3React } from "@web3-react/core"
import { useEffect } from "react";
import {toast} from "react-toastify";
import {connectors} from "../helpers/injectedConnector";



export const useEagerConnect = (setErrorMessageFun)=>{
    const {activate} = useWeb3React();
    
    useEffect(()=>{
        (async ()=>{
            const isAuthorized = await connectors.injected.isAuthorized();
            console.log("isAuthorized= ",isAuthorized);
            if(isAuthorized) {
                await activate(connectors.injected, async (error) => {
                    toast.error(error.message)
                    console.log({ error });
                    setErrorMessageFun(error.message);
                });
            }
        })();
    },[activate,setErrorMessageFun])
}

export const useInactiveListener = (suppress = false) =>{
    const { active, error, activate } = useWeb3React();

    useEffect(() => {
        const { ethereum } = window;
        if (ethereum && ethereum.on && !active && !error && !suppress) {
            const handleChainChanged = async (chainId) => {
                console.log('chainChanged', chainId);
                await activate(connectors.injected);
            };

            const handleAccountsChanged = async (accounts) => {
                console.log('accountsChanged', accounts);
                if (accounts.length > 0) {
                    await activate(connectors.injected);
                }
            };

            const handleNetworkChanged = async (networkId) => {
                console.log('networkChanged', networkId);
                await activate(connectors.injected);
            };

            ethereum.on('chainChanged', handleChainChanged);
            ethereum.on('accountsChanged', handleAccountsChanged);
            ethereum.on('networkChanged', handleNetworkChanged);

            return () => {
                if (ethereum.removeListener) {
                ethereum.removeListener('chainChanged', handleChainChanged);
                ethereum.removeListener('accountsChanged', handleAccountsChanged);
                ethereum.removeListener('networkChanged', handleNetworkChanged);
                }
            };
        }
        return () => {};
    }, [active, error, suppress, activate]);
}