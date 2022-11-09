import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { WalletLinkConnector } from "@web3-react/walletlink-connector";

const injectedConnector = new InjectedConnector({
    supportedChainIds: [
        //1, // Mainet
        3, // Ropsten
        4, // Rinkeby
        // 5, // Goerli
        //42, // Kovan
        97,
        1337
    ]
})

const walletconnect = new WalletConnectConnector({
    rpcUrl: `https://mainnet.infura.io/v3/${process.env.INFURA_KEY}`,
    bridge: "https://bridge.walletconnect.org",
    qrcode: true
});

const walletlink = new WalletLinkConnector({
    url: `https://mainnet.infura.io/v3/${process.env.INFURA_KEY}`,
    appName: "web3-react-demo"
});

export const connectors = {
    injected: injectedConnector,
    walletConnect: walletconnect,
    coinbaseWallet: walletlink
};