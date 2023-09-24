import * as React from "react";
import {useState, useContext, useRef, useEffect} from "react";
import {CloseOutlined } from '@ant-design/icons';
import { Row, Col,} from 'antd';
import { CollectionContext, NFT } from '../../context/CollectionContext';
import { WalletContext,} from '../../context/WalletContext';
import { getShortAddress, compareStrings} from '../../helper/stringHelper';
import './index.less';

interface NFTviewInterface{
    item:NFT;
    visible:boolean;
    setHide:()=>void;
}
const NFTview: React.FC<NFTviewInterface> = (props:NFTviewInterface) => {
   const WalletData = useContext(WalletContext);

    return (
        <>
            {
                props.visible&&
                <Row className="NFT-view">
                    <Col span={20} offset={0}className="NFT-modal">
                        <Row>
                            <Col span={1} offset={23}> 
                                <a onClick={props.setHide} style={{color:"black"}}><CloseOutlined /></a>
                            </Col>
                        </Row>
                        <Row>
                            <Col  xs={{span:24}} md={{span:12}}>
                                <img src={props.item.url} className="NFT-image"/>
                            </Col>
                            <Col xs={{span:24}} md={{span:11,offset:1}}>
                                <span>Name</span><br/>
                                <span className="title-24"># {props.item.id}</span><br/><br/>
                                <span>Attributes</span><br/>
                                {
                                    props.item.attributes.map((item,idx)=>(
                                        <span className="round">
                                            {item}
                                        </span>
                                    ))
                                }
                                <br/><br/>
                                <span>Owner</span><br/>
                                <span className="title-24 title-green">{compareStrings(props.item.owner, WalletData.trust || WalletData.ethereumAddress)?'you':getShortAddress(props.item.owner)}</span><br/><br/>
                                {/* <span>Price</span><br/>
                                <span className="title-24 title-green">{props.item.price}</span><br/><br/> */}
                                <span>Rank</span><br/>
                                <span className="title-24 title-green">{props.item.rating}</span><br/><br/>

                            </Col>
                        </Row>  
                    </Col> 
                </Row>
            }
        </>
        
    )
}

export default NFTview;