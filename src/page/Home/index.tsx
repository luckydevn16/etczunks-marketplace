import * as React from "react";
import {useState, useContext, useRef, useEffect} from "react";
import { Link } from "react-router-dom";
import { Button, Row, Col, BackTop, Menu, Dropdown    } from 'antd';
import { FaShoppingCart, FaTheaterMasks, FaEnvelopeOpen, FaLockOpen, FaDoorOpen, FaMapSigns, FaGripLines, FaListAlt } from "react-icons/fa";
import ConnectWallet from '../../component/ConnectWallet';
import TimeLine from '../../component/TimeLine';
import MintButton from '../../component/MintButton';
import IntroNFT from '../../component/IntroNFT';
import Loading from '../../component/Loading';
import './index.less';
import { IMAGES, imageInferface } from "../../constant/image"
// import 'antd/dist/antd.css';
const Home: React.FC = () => {
    const roadMap = useRef< null | HTMLDivElement >(null);
    const gotoRoadMap = ()=>roadMap.current?.scrollIntoView({ behavior: 'smooth' });
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        const loadImage = (image:imageInferface) => {
          return new Promise((resolve, reject) => {
            const loadImg = new Image();
            loadImg.src = image.url;
            loadImg.onload = () =>
              setTimeout(() => {
                resolve(image.url)
              }, 2000)
    
            loadImg.onerror = err => reject(err);
          })
        }
    
        Promise.all(IMAGES.map(image => loadImage(image)))
          .then(() => setLoading(false))
          .catch(err => console.log("Failed to load images", err))
      }, [])
    const menu = (
        <Menu >
          <Menu.Item key="1"><Link to="/explore"><FaListAlt size={18} style={{marginRight:'8px'}}/>Explore All</Link></Menu.Item>
          <Menu.Item key="2"><Link to="/myetczunks"><FaTheaterMasks size={18} style={{marginRight:'8px'}}/>My Etczunks</Link></Menu.Item>
          <Menu.Item key="4"><Link to="/marketplace"><FaShoppingCart size={18} style={{marginRight:'8px'}}/>Marketplace</Link></Menu.Item>
          <Menu.Item key="3"><a onClick={gotoRoadMap}><FaMapSigns size={18} style={{marginRight:'8px'}}/>RoadMap</a></Menu.Item>
        </Menu>
      );
    return (
        <>
            {
                isLoading?
                    <Loading title="loading"/>
                :
                <div className="fade-in">
                    <Row className="">
                        <Col span={24} className="relative full-screen "  >
                            <img src="assets/img/border.png" className="full-screen"/>
                            <Row className="full-window absolute menu-bar">
                                <Col span={3} className=" menu-item nohamburger">
                                    <Link to="/explore"><FaListAlt size={18} style={{marginRight:'8px'}}/>Explore All</Link>
                                </Col>
                                <Col span={3} className=" menu-item nohamburger">
                                    <Link to="/myetczunks"><FaTheaterMasks size={18} style={{marginRight:'8px'}}/>My Etczunks</Link>
                                </Col>
                                <Col span={3} className=" menu-item nohamburger">
                                    <Link to="/marketplace"><FaShoppingCart size={18} style={{marginRight:'8px'}}/>Markeplace</Link>
                                </Col>
                                <Col span={3} className=" menu-item nohamburger">
                                    <a onClick={gotoRoadMap}><FaMapSigns size={18} style={{marginRight:'8px'}}/>RoadMap</a>
                                    

                                </Col>
                                <Col span={11} className="menu-item humburger">
                                    <Dropdown
                                        overlay={menu}
                                        trigger={['click']}
                                    >
                                    <a ><FaGripLines size={32} style={{marginRight:'8px'}}/></a>
                                    </Dropdown>
                                </Col>
                                <Col xs={{span:4,offset:4}} sm={{span:4,offset:8}} className=" menu-item">
                                    <ConnectWallet />
                                </Col>
                                <Col xs={{span:22,offset:1}} sm={{span:18,offset:3}}>
                                    
                                    <img src={IMAGES[0].url} className=" margin-top title-image"/>
                                    <p className="title">
                                        ETCZUNKS are the official sequel to EtcPunks.
                                        <br/>Not affiliated with larva labs etczunks fair launch & fair distribution means each Etczunks nft will be minted at complete random Get your etczunks for 2 Etc each.
                                        <br/>The marketplace will open when all ETCZUNKS have been minted.
                                    </p>
                                    <MintButton className="margin-top"/>
                                </Col>
                            </Row>
                            
                        </Col>
                    </Row>
                    <IntroNFT />
                    <Row  ref={roadMap}>
                        <Col span={24}>
                            <TimeLine/>
                        </Col>
                    </Row>
                </div>
            }
            
        </>
        
    )
}

export default Home;