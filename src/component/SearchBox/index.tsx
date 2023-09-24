import {useState,FC} from 'react';
import './index.less';
interface SearchInterface {
    onChange:(value:string)=>void;
    value:string;
}
const SearchBox : FC<SearchInterface> = (props:SearchInterface)=>{

    return(
        <input className="search-back" type='text' placeholder='Search..' value={props.value} onChange={(e)=>props.onChange(e.target.value)}/>
    )
}

export default  SearchBox;