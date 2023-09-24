import { useEffect, useRef, useState, useContext } from 'react';
import * as React from 'react';
import { Button} from 'antd';
import { WalletContext } from '../../context/WalletContext';
import useOnClickOutside from '../../helper/useClickOutside';
import './index.less';
import { getShortAddress} from '../../helper/stringHelper';


const ConnectWallet: React.FC = () => {

    const WalletData = useContext(WalletContext);
    const handleOpenConnectWalletDialog = () => {
        WalletData.setShowConnectModal(true);
    };
    const [openDropdown, setOpenDropdown] = useState(false);
    
    const handleOpenDropdown = () => {
        setOpenDropdown(true);
    };
    const handleCloseDropdown = () => {
        setOpenDropdown(false);
    }
    const disconnectWallet = async()=>{
       WalletData.setEthereumAddress("");
       WalletData.setTrustAddress("");
    }
    useEffect(() => {
        handleCloseDropdown();
    }, [WalletData.isConnected]);

    return (
        <>
        {WalletData.isConnected ? (
            <>
             {WalletData.ethereumAddress ? (
                <Button  type="ghost" style={{color:'white'}} onClick={disconnectWallet}>
                    {getShortAddress(WalletData.ethereumAddress)}
                </Button>
                ) : null}
                {WalletData.trust ? (
                    <Button  type="ghost" style={{color:'white'}} onClick={disconnectWallet}>
                    
                        {getShortAddress(WalletData.trust)}
                    </Button>
                ) : null}
            </>
        ) : (
            <Button   type="ghost" style={{color:'white'}} onClick={handleOpenConnectWalletDialog}>
                Connect wallet
            </Button>
        )}
        </>
    );
};
export default ConnectWallet;
