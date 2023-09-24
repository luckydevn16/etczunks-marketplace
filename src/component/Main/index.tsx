import * as React from "react";
import {Row, Col} from 'antd';
import ConnectWallet from '../ConnectWallet';
import MintButton from '../MintButton';
import './index.less';
interface MainInterface{
    gotoRoadMap : ()=>void;
}
const Main: React.FC<MainInterface> = (props:MainInterface) => {
    return (
        <>   
            <Row>
                <Col span={24} className="relative ">
                    <img src="assets/img/border.png" className="full-screen"/>
                    <img src="assets/img/homeback.jpg" className="full-window absolute z-index-0"/>
                    <Row className="full-window absolute ">
                        <Col span={4} className=" menu-item">
                            <a >MarketPlace</a>
                        </Col>
                        <Col span={4} className=" menu-item">
                            
                            <a >Latest sales</a>
                        </Col>
                        <Col span={4} className=" menu-item">

                             <a onClick={props.gotoRoadMap}>RoadMap</a>

                        </Col>
                        <Col span={4} offset={8} className=" menu-item">
                            <ConnectWallet />
                        </Col>
                        <Col span={18} offset={3}  >
                            
                            <img src="assets/img/title.png" className="full-window margin-top"/>
                            <MintButton className="margin-top"/>
                        </Col>
                    </Row>
                    
                </Col>
            </Row>
        </>
        
    )
}

export default Main;