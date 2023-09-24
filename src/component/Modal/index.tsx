import React, {FC, useRef} from 'react';
import {Row, Col, } from 'antd';
import {CloseOutlined } from '@ant-design/icons';
import useOnClickOutside from '../../helper/useClickOutside';
import './index.less'
interface ModalInterface{
    title:string;
    visible:boolean;
    children?:React.ReactNode;
    close:() => void;
}
const Modal : FC<ModalInterface> = (props:ModalInterface)=>{
    const ref = useRef<any>();
    useOnClickOutside(ref,props.close)
    return (
        <>
        
        {props.visible && 
            <Row className="modal-back" align={'middle'} >
            <Col xs={{span:20, offset:2}} lg={{span:8, offset:8}} className="modal" ref={ref}>
                <Col span={24}className="modal-title">
                    <Row>
                        <Col span={16} offset={4}>
                            {props.title}
                        </Col>
                        <Col span={4}>
                            <a onClick={props.close}><CloseOutlined /></a>
                            
                        </Col>
                    </Row>
                </Col>
                <Col span={24}>
                    {props.children}
                </Col>
            </Col>
        </Row>
        }
        </>
        
    )
}

export default Modal;