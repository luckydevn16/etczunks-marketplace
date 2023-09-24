import React, { FC, useState, useEffect, useContext } from 'react'
import { Slider, Button, Row, Col, Spin  } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import {useMintHelper} from '../../helper/MintHelper';
import openNotification from '../Notification';
import {CollectionContext} from '../../context/CollectionContext';
import './index.less';
interface propsInterface{
    className:string;
}
const  Minter:FC<propsInterface> = (props : propsInterface)=>{
    const CollectionData = useContext(CollectionContext);
    const [numberOfNFT, setNumberofNFT] = useState(30);
    const [loading, setLoading] = useState(false);
    const [totalSupply, setTotalSupply] =useState(100);
    const [nftPrice, setNftPrice] = useState(2);
    const {onBuyNFT} = useMintHelper();

    const onMint = async()=>{
        setLoading(true);
        let result:{success:boolean,message:string} = await onBuyNFT(numberOfNFT);
        openNotification({title:"",message:result.message,ok:result.success,go:()=>{}});
        CollectionData.getMyNFTs();
        setLoading(false);
    }
    useEffect(()=>{
        setTotalSupply(CollectionData.mintedNum.length);
    },[CollectionData.mintedNum])
    return(<>
            <Row className={props.className}>
                <Col xs={{span:18,offset:3}} xl={{span:8,offset:8}} className="mint-back">
                    <Row>
                        <Col span={24}>
                            <span>{totalSupply} / 10000 </span>
                            <span>minted</span>
                        </Col>
                        
                    </Row>
                    <Row>
                        <Col span={24}>
                            <span className="md:text-2xl text-3xl text-white drop-shadow-xl">Mint Price: <b>{nftPrice} ETC</b></span>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <Slider autoFocus={false} value={numberOfNFT} onChange={setNumberofNFT} defaultValue={30} min={1} max={30} marks={ { 
                                    1: <span className="text-black">1</span>, 
                                    30: <span className="text-black">30</span> 
                                }} />
                            <span className="">{`${numberOfNFT} ${numberOfNFT==1?'ETCZUNK':'ETCZUNKS'} ,`}</span>
                            <span className="total-price"> Total Price: { nftPrice * numberOfNFT }ETC</span>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            {
                                loading ?
                                    <Button type="default" className="loading-button" size={'large'} style={{ backgroundColor: 'black', borderColor: 'black'}}>
                                        <Spin indicator={<LoadingOutlined style={{ fontSize: 32 }} spin />} />
                                    </Button> :
                                    <Button type="primary" onClick={onMint} className="mint-button" size={'large'} style={{ backgroundColor: 'black', borderColor: 'black'}}>
                                       <div>Mint</div> 
                                    </Button>
                            }
                        </Col>
                    </Row>
                </Col>
            </Row>
            </>
    ) 
}

export default Minter