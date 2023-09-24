import {FC} from 'react';
import {Row, Col} from 'antd';
import { FaTwitter, FaDiscord, FaTelegramPlane, FaEthereum } from "react-icons/fa";
import './index.less';
const Footer:FC = ()=>{
    return(
        <Row className="footer margin-top">
            <Col span={22} offset={1} className="margin-top">
                <Col span={24}>
                    <Row className="div-flex">
                        <Col md={{span:12}} xs={{span:24}}>
                            <a className="foot-button" target='_blank' href='#'><FaTwitter size={24} className="footer-item"/></a>
                            <a className="foot-button" target='_blank' href='#'><FaDiscord size={24} className="footer-item"/></a>
                            <a className="foot-button" target='_blank' href='#'><FaTelegramPlane size={24} className="footer-item"/></a>
                        </Col>
                        <Col md={{span:12}} xs={{span:24}} className="text-right">
                            <a className="foot-button" target='_blank' href='https://ethereumclassic.org/'>
                                <img src="assets/img/icon.svg" style={{marginRight:'8px',width:'16px'}}/>
                                <span >Powered by Ethereum Classic</span>
                                
                            </a>
                        </Col>
                        <Col span={24}>
                            <a className="footer-item" target='_blank' href='https://blockscout.com/etc/mainnet/address/0x28cdE342AC623C1aC3Ba25D0A22fCa385911b57C/'> Contract Address</a>
                        </Col>
                    </Row>
                       
                </Col>
                
            </Col>
        </Row>
    )
}

export default Footer;