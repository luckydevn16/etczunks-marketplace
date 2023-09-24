import WalletConnectProvider from '@walletconnect/web3-provider';
import Web3 from 'web3';
import Web3Modal from 'web3modal';
import WalletLink from 'walletlink';
import { stringify } from 'querystring';
export interface WalletData {
    bsc: string,
    ethereumAddress: string,
    trust: string,
    coinbase: string,
    walletconnect: string,
    openConnectDialog: boolean;
}



// CONNECT METAMASK
export const getShortAddress = (address: string) => {
  if(address.length>8)
    return address.slice(0, 4) + '...' + address.slice(-4);
  else
    return address;
};
export const connectMetaMask = async () => {
  if (window.ethereum) {
    window.web3 = new Web3(window.ethereum);

    console.log(window.web3);
    const accounts = await window.ethereum.request({
      method: 'eth_requestAccounts',
    });
    return {web3 : window.web3, address : accounts[0]};
  } else if (window.web3) {
    window.web3 = new Web3(window.web3.currentProvider);
    const accounts = window.web3.eth.getAccounts();
    return {web3 : window.web3, address : accounts[0]};
  } else {
    
  }
};

// Connect Trust wallet
export const connectTrust = async() => {
  // const connector = new WalletConnect({
  //   bridge: `${process.env.REACT_APP_TRUST_BRIDGE}`,
  //   qrcodeModal: QRCodeModal,
  // });
  // let accounts;
  // if (!connector.connected) {
  //   // create new session
  //   connector.createSession();
  // }
  // connector.on("connect", (error, payload) => {
  //   if (error) {
  //     console.log('CONNECT TRUST ERROR: ', error);
  //     const exception: UninstallExtensionException = {
  //       walletType: SoftwareWalletType.TRUST,
  //       message: MISSING_EXTENSION_ERROR,
  //     };
  //     throw exception;
  //   }
  //   // Get provided accounts and chainId
  //   accounts = payload.params[0].accounts;
  //   console.log('SERVICE: ', payload.params[0]);
  // });
  const providerOptions = {
    walletconnect: {
      package: WalletConnectProvider,
      options: {
        rpc: {
          56: 'https://bridge.walletconnect.org'
        },
        chainId: 56
      }
    }
  };
//   const INFURA_ID = '460f40a260564ac4a4f4b3fffb032dad'

// const providerOptions = {
//   walletconnect: {
//     package: WalletConnectProvider, // required
//     options: {
//       infuraId: INFURA_ID, // required
//     },
//   },
//   'custom-walletlink': {
//     display: {
//       logo: 'https://play-lh.googleusercontent.com/PjoJoG27miSglVBXoXrxBSLveV6e3EeBPpNY55aiUUBM9Q1RCETKCOqdOkX2ZydqVf0',
//       name: 'Coinbase',
//       description: 'Connect to Coinbase Wallet (not Coinbase App)',
//     },
//     options: {
//       appName: 'Coinbase', // Your app name
//       networkUrl: `https://mainnet.infura.io/v3/${INFURA_ID}`,
//       chainId: 1,
//     },
//     package: WalletLink,
//     connector: async (_, options) => {
//       const { appName, networkUrl, chainId } = options
//       const walletLink = new WalletLink({
//         appName,
//       })
//       const provider = walletLink.makeWeb3Provider(networkUrl, chainId)
//       await provider.enable()
//       return provider
//     },
//   },
// }
  const web3Modal = new Web3Modal({
    network: "mainnet", // optional
    cacheProvider: false, // optional
    providerOptions // required
  });
  const provider = await web3Modal.connect();
  await web3Modal.toggleModal();
  // regular web3 provider methods
  const newWeb3 = new Web3(provider);
  const accounts = await newWeb3.eth.getAccounts();
  return {web3 :newWeb3, address : accounts[0]};
}

export const isConnected = (wallet: WalletData): boolean => {
  return !!(wallet.ethereumAddress || wallet.trust || wallet.coinbase || wallet.walletconnect);
}
