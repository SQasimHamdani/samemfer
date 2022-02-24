
import { InjectedConnector } from '@web3-react/injected-connector';
import { WalletLinkConnector } from '@web3-react/walletlink-connector';


const RPC_URLS = {
	1: 'https://mainnet.infura.io/v3/68c1d5701b71424999d3f11264af6b14',
};

//metamask
export const injected = new InjectedConnector({
	supportedChainIds: [ 1, 3, 4, 5, 42, 31337 ]
});



//coinbase
export const walletlink = new WalletLinkConnector({
	url: RPC_URLS[1],
	appName: 'demo-app',
	supportedChainIds: [ 1, 4 ]
});
