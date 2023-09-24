import React, {useState, useContext, useEffect} from "react";
import ConnectWalletDialog from '../component/WalletConnectDialog';
import Web3 from 'web3';

interface WalletContextInterface{
    isConnected : boolean;
    ethereumAddress : string;
    showConnectModal : boolean;
    walletConnect : boolean;
    trust : string;
    web3 : any;
    setWeb3 : (value : any)=>void;
    setTrustAddress : (value:string)=>void;
    setEthereumAddress : (value:string)=>void;
    setShowConnectModal : (value:boolean)=> void;
    setWalletConnect : (value:boolean)=>void;
    setConnect : (value:boolean)=> void
}
const initData = {
    isConnected : false,
    ethereumAddress : "",
    showConnectModal : false,
    walletConnect : false,
    trust : "",
    web3 : null,
    setWeb3 : (value:Web3)=>{},
    setTrustAddress : (value:string)=>{},
    setEthereumAddress : (value:string)=>{},
    setShowConnectModal : (value:boolean)=> {},
    setWalletConnect : (value:boolean)=>{},
    setConnect : (value:boolean)=> {}
}
const WalletContext = React.createContext<WalletContextInterface>(initData);

const WalletContextProvider = ({children}:{children:any}) => {

    const [isConnected, setConnect] = useState(false);
    const [ethereumAddress, setEthereumAddress] = useState("");
    const [showConnectModal, setShowConnectModal] = useState(false);
    const [walletConnect, setWalletConnect] = useState(false);
    const [address, setAddress] = useState("");
    const [trust, setTrustAddress] =useState("");
    const [web3, setWeb3] = useState<any>();

    useEffect(()=>{

        console.log("die",ethereumAddress || trust);
        if(ethereumAddress || trust)
            setConnect(true);
        else{
            setConnect(false);
            console.log("disconnected",ethereumAddress,trust)
        }
            
    },[ethereumAddress,trust])
    return (
        <WalletContext.Provider 
            value={{
                isConnected,
                ethereumAddress,
                showConnectModal,
                walletConnect,
                trust,
                web3,
                setWeb3,
                setTrustAddress,
                setEthereumAddress,
                setShowConnectModal,
                setWalletConnect,
                setConnect:(value:boolean)=>setConnect(value)
            }}>
            {children}
            <ConnectWalletDialog/>
        </WalletContext.Provider>
    )
}

export {WalletContext, WalletContextProvider};