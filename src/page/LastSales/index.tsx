import * as React from "react";
import {useState, useContext, useRef, useEffect} from "react";
import { Link } from "react-router-dom";
import { FaHome, FaTheaterMasks, FaEnvelopeOpen, FaLockOpen, FaDoorOpen, FaMapSigns, FaGripLines, FaListAlt } from "react-icons/fa";
import { Button, Row, Col, BackTop, Menu, Dropdown, Card, Input, Select, } from 'antd';
import { CollectionContext } from '../../context/CollectionContext';
import { WalletContext } from '../../context/WalletContext';
import ConnectWallet from '../../component/ConnectWallet';
import Loading from '../../component/Loading';
import NFTview from '../../component/NFTview';
import { getShortAddress} from '../../helper/connectWallet';
import SearchBox from '../../component/SearchBox';
import SelectBox from '../../component/SelectBox';
import NFTcard from '../../component/NFTcard';
import './index.less';
import { IMAGES, imageInferface } from "../../constant/image"
const LastSales: React.FC = () => {
    const [isLoading, setLoading] = useState(true);
    const [select, setSelect] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const CollectionData = useContext(CollectionContext);
    const WalletData = useContext(WalletContext);
    const [search, setSearch] = useState("");
    const [nftarray, setNftArray] = useState(CollectionData.NFTs);
    const { Meta } = Card;
    const { Search } = Input;
    const { Option } = Select;
    useEffect(()=>{
        setLoading(CollectionData.downloading);

    },[CollectionData.downloading])
    
    useEffect(()=>{
    },[CollectionData.NFTs])
    const onSearch = (val:string)=>{
        setSearch(val);
    }
    const onSortChange = (val:number)=>{
        CollectionData.setSort(val);
    }
    const popup = (idx:number)=>{
        setSelect(idx);
        setShowModal(true)
    }
    const menu = (
        <Menu >
          <Menu.Item key="1"><Link to="/"><FaHome size={18} style={{marginRight:'8px'}}/>Home</Link></Menu.Item>
          <Menu.Item key="2"><Link to="/explore"><FaListAlt size={18} style={{marginRight:'8px'}}/>Explore All</Link></Menu.Item>
          <Menu.Item key="3"><Link to="/myetczunks"><FaTheaterMasks size={18} style={{marginRight:'8px'}}/>My Etczunks</Link></Menu.Item>
        </Menu>
      );
    return (
        <>
            <Row className="market-screen">
                    <Col span={24}>
                        
                    
                    <Row className="menu-bar">
                        <Col span={4} className="  nohamburger">
                            <Link to="/"><img src={IMAGES[0].url} style={{width:'80%',marginLeft:'16px',paddingTop:'8px'}}/></Link>
                        </Col>
                        <Col span={3} className=" menu-item nohamburger">
                            <Link to="/explore"><FaListAlt size={18} style={{marginRight:'8px'}}/>Explore All</Link>
                        </Col>
                        <Col span={3} className=" menu-item nohamburger">
                            
                            <Link to="/myetczunks"><FaTheaterMasks size={18} style={{marginRight:'8px'}}/>My Etczunks</Link>
                        </Col>
                        <Col span={11} className="menu-item humburger">
                            <Dropdown
                                overlay={menu}
                                trigger={['click']}
                            >
                            <a ><FaGripLines size={32} style={{marginRight:'8px'}}/></a>
                            </Dropdown>
                        </Col>
                        <Col xs={{span:4,offset:5}} sm={{span:4,offset:10}} className=" menu-item">
                            <ConnectWallet />
                        </Col>
                    </Row>
                    <Row>
                        <Col span={22} offset={1}>
                            <p className='page-title margin-top'>
                               Marketplace
                            </p>
                        </Col>
                    </Row>
                    <Row className="margin-top">
                        <Col span={22} offset={1} className="down-border">
                        <Row>
                                <Col span={6}>
                                    <SearchBox onChange={onSearch} value={search}/>
                                </Col>
                                <Col span={4} offset={14}>
                                    
                                    <Row className='sort-item'>
                                        <span className='sort-item-label'>
                                            Sort by  
                                        </span>
                                        <div className='sort-select'>
                                            <SelectBox defaultValue={CollectionData.sort} onChange={onSortChange}/>
                                        </div>
                                        
                                    </Row>
                                </Col>
                            </Row>   
                        </Col>
                    </Row>
                    <Row style={{marginTop:'8px', textAlign:'center'}} >
                        <Loading title="coming soon"/>
                         
                    </Row>
                    </Col>
                </Row>
        </>
        
    )
}

export default LastSales;
