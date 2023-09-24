import * as React from 'react';
import { useState, useContext } from 'react';
import { Button, Row, Col, BackTop} from 'antd';
import { WalletContext } from '../../context/WalletContext';
import { connectMetaMask, connectTrust } from '../../helper/connectWallet';
import Modal from '../Modal';
import './index.less'

const ConnectWalletDialog: React.FC = () => {

  const WalletData = useContext(WalletContext);
  // Check network
  const checkNetwork = () => {
    if (!window.ethereum) {
        console.log("no metamask!");
    }
    const netId = window.ethereum.networkVersion
      ? +window.ethereum.networkVersion
      : +window.ethereum.chainId;
    if (netId) {
      if (netId === 1 || netId === 3) {
        if (netId === 3 && process.env.REACT_APP_ENV === 'prod') {
         console.log("you are using testnet")
        } else if (netId === 1 && process.env.REACT_APP_ENV === 'dev') {
          console.log("you are using maninnet");
        } 
      } else {
        console.log("you are using another network!");
      }
    }
  };
  // Connect MetaMask
  const handleConnectMetaMask = async () => {
    try {
      if (WalletData.ethereumAddress) {
        console.log("please open metamask!")
      } else {
        checkNetwork();
        const result = await connectMetaMask();
        WalletData.setEthereumAddress(result?.address);
        WalletData.setWeb3(result?.web3);
      }
    } catch (e: any) {
        console.log(e);
      }
    WalletData.setShowConnectModal(false);
  };

  // Connect Trust
  const handleConnectTrust = async() => {
    WalletData.setShowConnectModal(false);
    const result = await connectTrust();
    if (result.address) {
      WalletData.setTrustAddress(result.address);
      WalletData.setWeb3(result.web3);
    } else {
      console.log('Connect to Trust wallet did not success!');
    }
  }

  

  return (
    <Modal 
      visible={WalletData.showConnectModal} 
      close={()=>WalletData.setShowConnectModal(false)} 
      title={'Connect Wallet'}>
       <Row gutter={0} className="margin-top">
         
         <Col xs={{span:20, offset:2}} xl={{span:16,offset:4}} className="wallet-connect" onClick={handleConnectMetaMask}>
           <Row>
              <Col span={8}>
                  <img src="assets/img/metamask.png" style={{width:'46px',height:'46px'}}/>
              </Col>
              <Col span={16}>
                   <span style={{fontSize:'24px',color:'black'}}>MetaMask</span>
              </Col>
           </Row>
          </Col>
          <Col xs={{span:20, offset:2}} xl={{span:16,offset:4}} className="wallet-connect" onClick={handleConnectTrust}>
            <Row>
              <Col span={8}>
                 <img src="assets/img/trustwallet.png" style={{width:'46px',height:'46px'}}/>
              </Col>
              <Col span={16}>
                <span style={{fontSize:'24px',color:'black'}}>Trust</span>
              </Col>
            </Row>
            
         </Col>
       </Row>
       
    </Modal>
  );
};
export default ConnectWalletDialog;
