import * as React from 'react';
import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { BulbOutlined ,LeftOutlined, FundFilled } from '@ant-design/icons';
import { Button, Row, Col, BackTop, Menu   } from 'antd';
import './index.less';
const RoadMap = [
    '1 Etczunks creation',
    '2 Launching Etczunks website',
    '3 Grow Etczunks community',
    '4 launch Telegram,Discord and Twitter ',
    '5 Etczunks available for minting ',
    '6 Marketing ',
    '7 All etczunks minted',
    '8 Launching the marketplace ',
    '9 More coming soon'
]
const TimeLine:React.FC = ()=>{
    return(
        <Row className="back-black">
            <Col span={24}>
            <p className="subtitle  margin-top">RoadMap</p>
            <Row >
            
                <VerticalTimeline>
                    {
                        RoadMap.map((item,idx) => (
                            <VerticalTimelineElement
                                key={idx}
                                className="vertical-timeline-element--work"
                                contentArrowStyle={{ borderRight: '7px solid  #1a6c09' }}
                                contentStyle={{ background: '#1a6c09', color: '#fff' }}
                                iconStyle={{ background: '#1a6c09', color: '#fff' }}
                                icon={<BulbOutlined />}
                            >
                                <p>
                                    2021/12/24
                                </p>
                                <p>
                                    {item}
                                </p>
                            </VerticalTimelineElement>
                        ))
                    }
                
                </VerticalTimeline>
            </Row>
            </Col>
            
        </Row>
        
        
    )
}


export default TimeLine;