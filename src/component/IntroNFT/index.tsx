import React, { FC, useState, useEffect } from 'react'
import { Slider, Button, Row, Col } from 'antd';
import Fade from 'react-reveal/Fade';
import Zoom from 'react-reveal/Zoom';
import './index.less';

const title = "EVERY ETCZUNK IS UNIQUE";
const content = "Early minters will have the chance to win free Etczunks Nft airdrops and take part in upcoming giveaways.";
const introImgs = [
    'assets/img/Zunk1.png',
    'assets/img/Zunk2.png',
    'assets/img/Zunk3.png',
    'assets/img/Zunk4.png',
]
const  IntroNFT:FC = ()=>{
    
    return(
        <>
            <Row className="intro-back">
                <Col span={24} >
                    <p className="subtitle">{title}</p>
                    <Fade cascase>
                       <div>{content}</div>
                    </Fade>
                </Col>
                <Col span={24}>
                <Fade  cascase>
                
                    <img src='assets/img/Zunk1.png' className="intro-img"/>
                    <img src='assets/img/Zunk2.png' className="intro-img"/>    
                </Fade >
                <Fade  cascase>
                
                    <img src='assets/img/Zunk3.png' className="intro-img"/>
                    <img src='assets/img/Zunk4.png' className="intro-img"/>    
                </Fade >
                    
                </Col>
            </Row>    
        </>
    ) 
}

export default IntroNFT