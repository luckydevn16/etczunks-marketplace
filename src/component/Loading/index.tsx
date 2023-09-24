import {FC, useEffect, useState} from 'react';
import './index.less'
interface loadingInterface{
    title:string;
}
const Loading : FC<loadingInterface>= (props:loadingInterface)=> {
    
    return(
        <div className="loading">
            {props.title} ...
        </div>
    )
}
export default Loading;