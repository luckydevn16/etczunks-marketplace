import {useState,FC} from 'react';
import './index.less';
interface SelectInterface {
    onChange:(value:number)=>void;
    defaultValue:number;
}
const SelectBox : FC<SelectInterface> = (props:SelectInterface)=>{

    return(
        <select className="select-back" defaultValue={props.defaultValue} onChange={(e)=>props.onChange(parseInt(e.target.value))}>
            <option value={0} >id</option>
            <option value={1}>rank</option>
        </select>
    )
}

export default  SelectBox;