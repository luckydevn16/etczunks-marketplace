import * as React from "react";
import {useState, useContext, useRef, useEffect} from "react";
import { Link } from "react-router-dom";
import { FaTheaterMasks, FaHome, FaGripLines, FaShoppingCart } from "react-icons/fa";
import { LoadingOutlined } from '@ant-design/icons';
import { Row, Col, Menu, Dropdown} from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';
import { CollectionContext, NFT, initNFT, CollectionDataInterface, CollectionDataInit } from '../../context/CollectionContext';
import ConnectWallet from '../../component/ConnectWallet';
import Loading from '../../component/Loading';
import NFTview from '../../component/NFTview';
import SearchBox from '../../component/SearchBox';
import SelectBox from '../../component/SelectBox';
import NFTcard from '../../component/NFTcard';
import './index.less';
import { IMAGES, imageInferface } from "../../constant/image"


const showCount : number = 20;
const MarketPlace: React.FC = () => {
    const [isLoading, setLoading] = useState(true);
    const [selectNFT, setSelectNFT] = useState<NFT>(initNFT);
    const [showModal, setShowModal] = useState(false);
    const CollectionData = useContext(CollectionContext);
    const [search, setSearch] = useState("");

    const [count, setCount] = useState({
        prev: 0,
        next: showCount
      })
    const [hasMore, setHasMore] = useState(true);
    const [current, setCurrent] = useState<CollectionDataInterface[]>([CollectionDataInit]);


    const getMoreData = () => {
        if (current.length === CollectionData.NFTs?.length) {
            setHasMore(false);
            return;
        }
        if(CollectionData.NFTs)
            setCurrent(current.concat(CollectionData.NFTs.slice(count.prev + showCount, count.next + showCount)));
        setCount((prevState) => ({ prev: prevState.prev + showCount, next: prevState.next + showCount }));
    }



    useEffect(()=>{
        setLoading(CollectionData.downloading);
        if(CollectionData.NFTs)
            setCurrent(CollectionData.NFTs.slice(count.prev, count.next));

    },[CollectionData.downloading])
    useEffect(()=>{
        if(selectNFT.url.length>0)
            setShowModal(true)
    },[selectNFT])
    useEffect(()=>{
        setCount({prev:0, next:showCount});
    },[CollectionData.sort])
    const onSearch = (val:string)=>{
        setSearch(val);
    }
    const onSortChange = (val:number)=>{
        CollectionData.setSort(val);
    } 
    
    const menu = (
        <Menu >
          <Menu.Item key="1"><Link to="/"><FaHome size={18} style={{marginRight:'8px'}}/>Home</Link></Menu.Item>
          <Menu.Item key="2"><Link to="/myetczunks"><FaTheaterMasks size={18} style={{marginRight:'8px'}}/>My Etczunks</Link></Menu.Item>
          <Menu.Item key="3"><Link to="/marketplace"><FaShoppingCart size={18} style={{marginRight:'8px'}}/>Marketplace</Link></Menu.Item>
        </Menu>
      );
    return (
        <>
            {
                isLoading?
                    <Loading title="loading"/>
                :showModal && CollectionData.NFTs?
                
                <NFTview item={selectNFT} visible={showModal} setHide={()=>setShowModal(false)}/>
                 
                :
                <Row className="market-screen">
                    <Col span={24}>
                        
                    
                    <Row className="menu-bar">
                        <Col span={4} className="  nohamburger">
                            <Link to="/"><img src={IMAGES[0].url} style={{width:'80%',marginLeft:'16px',paddingTop:'8px'}}/></Link>
                        </Col>
                        <Col span={3} className=" menu-item nohamburger">
                            <Link to="/myetczunks"><FaTheaterMasks size={18} style={{marginRight:'8px'}}/>My Etczunks</Link>
                        </Col>
                        <Col span={3} className=" menu-item nohamburger">
                            
                            <Link to="/marketplace"><FaShoppingCart size={18} style={{marginRight:'8px'}}/>Marketplace</Link>
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
                                Explore All
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

                        {
                            search.length>0?
                                CollectionData.NFTs?.filter(item=>{
                                    if(CollectionData.sort==0)
                                        return item.id.toString()==search
                                    else
                                        return item.rank.toString()==search
                                })
                                    .map((item, idx)=>(
                                    <Col span={22} offset={1}>
                                        <Row> 
                                            <NFTcard key={idx}  item={item} onClick={setSelectNFT}/>
                                        </Row>
                                    </Col>
                                ))
                            :   <InfiniteScroll
                                    dataLength={current.length}
                                    next={getMoreData}
                                    hasMore={hasMore}
                                    loader={<h4 style={{color:'white'}}>Loading...</h4>}
                                    >
                                    {
                                        current&&
                                        <Col span={22} offset={1}>
                                            <Row >
                                                {  current.map((item,idx)=>(
                                                    
                                                    <NFTcard key={idx}  item={item} onClick={setSelectNFT}/>
                                                    
                                                    ))
                                                }
                                            </Row>
                                        </Col>
                        
                                    }
                                </InfiniteScroll>   
                        }  
                    </Row>
                    </Col>
                </Row>
            }
            
           
        </>
        
    )
}

export default MarketPlace;