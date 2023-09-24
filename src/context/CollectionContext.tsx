import React, {useState, useContext, useEffect} from "react";
import Web3 from 'web3';
import { rarity } from "../constant/rarity";
import { WalletContext} from './WalletContext';
import {CONTRACTADDRESS, CONTRACTABI, rpcURL} from '../constant/env';
import {compareStrings} from '../helper/stringHelper';
export interface NFT{
    id:number;
    rating:number;
    owner:string;
    url:string;
    attributes:string[],
    price:number,
    time:number,
    
}
export interface CollectionDataInterface{
    id:number;
    rank:number;
    owner:string;
}
export const CollectionDataInit :  CollectionDataInterface = {
    id:0,
    rank:0,
    owner:'',
}
export const initNFT : NFT = {
    time:10000,
    id:-1,
    rating:-1,
    owner:'none',
    url:'',
    attributes:[],
    price:2,
}
interface CollectionContextInterface{
    downloading : boolean;
    sort : number;
    mintedNum : number[];
    setSort : (val : number) => void;
    getMyNFTs : () => void;
    NFTs : CollectionDataInterface[] | undefined;
    myNFTs : CollectionDataInterface[] | undefined;
}
const initData = {
    downloading : true,
    NFTs : [],
    sort : 1,
    mintedNum : [],
    setSort : (val : number)=>{},
    getMyNFTs : () => {},
    myNFTs : []
}
const CollectionContext = React.createContext<CollectionContextInterface>(initData);

const CollectionContextProvider = ({children}:{children:any}) => {

    const [downloading, setDownloading] = useState(true);
    const [NFTs, setNFTs] = useState<CollectionDataInterface[]>();
    const [myNFTs, setMyNFTs] = useState<CollectionDataInterface[]>([]);
    const [sort, setSort] = useState(1);
    const [mintedNum, setMinteNum] = useState<number[]>([]);
    const WalletData = useContext(WalletContext);
    useEffect(()=>{
        getCollectionData();
        
               
    },[])
    useEffect(()=>{
        getMyNFTs();
    },[WalletData.ethereumAddress || WalletData.trust])

    const getMyNFTs = async()=>{
        setDownloading(true);
        const web3:any = new Web3(rpcURL);
        const contract:any = new web3.eth.Contract(CONTRACTABI, CONTRACTADDRESS);
        let myTokens : CollectionDataInterface[] = [];
        const mintedToken = await contract.methods.getRandomNumbers().call();
        
        if(WalletData.ethereumAddress || WalletData.trust)
            for(let i=0; i<rarity.length; i++){
                const tokenId = parseInt(rarity[i].Name)-10000;
                if(mintedToken.includes(tokenId.toString())){
                    let ownerOfTOken = contract.methods.ownerOf(tokenId).call().then((ownerOfTOken:string)=>{
                        if(compareStrings(ownerOfTOken, (WalletData.ethereumAddress || WalletData.trust))){
                            myTokens.push({
                                id:tokenId,
                                rank:parseInt(rarity[i].Rank),
                                owner:'you', 
                            })

                        setMyNFTs(myTokens);
                        }
                            
                    });
                    
                    
                }
            }
        // if(WalletData.ethereumAddress || WalletData.trust){
        //     let myTokensString : string[] = await contract.methods.getTokensofOwner(WalletData.ethereumAddress || WalletData.trust).call();
        //     rarity.map(item=>{
        //         if(myTokensString.includes((parseInt(item.Name)-10000).toString())){
        //             myTokens.push({
        //                 id:parseInt(item.Name)-10000,
        //                 rank:parseInt(item.Rank),
        //                 owner:'you', 
        //             })
                    
        //         }
        //     })
           
        // }
        setMyNFTs(myTokens);
        setTimeout(function(){
            setDownloading(false)
        }, 10000);
    }
    const getCollectionData = async()=>{
        const web3:any = new Web3(rpcURL);
        const contract:any = new web3.eth.Contract(CONTRACTABI, CONTRACTADDRESS);
        const minted : number[] = await contract.methods.getRandomNumbers().call();
        setMinteNum(minted);
        let oldNFTs : CollectionDataInterface[] = [];
        for(let i=0; i<rarity.length; i++){
            const tokenId = parseInt(rarity[i].Name)-10000;
           
            oldNFTs.push({
                id:parseInt(rarity[i].Name)-10000,
                rank:parseInt(rarity[i].Rank),
                owner:'none',
            });
        }
        setNFTs(oldNFTs);

    }
    const sortById = ()=>{

        let sortFn2 = (obj1:CollectionDataInterface , obj2:CollectionDataInterface):number => { return obj1.id - obj2.id; }
        if(NFTs?.length){
            let sortedArray:CollectionDataInterface[] = [...NFTs];
            sortedArray = sortedArray.sort(sortFn2);
            setNFTs(sortedArray);
        }
        
    }
    const sortByRating = ()=>{

        let sortFn2 = (obj1:CollectionDataInterface , obj2:CollectionDataInterface):number => { return obj1.rank - obj2.rank; }
        if(NFTs?.length){
            let sortedArray:CollectionDataInterface[] = [...NFTs];
            sortedArray = sortedArray.sort(sortFn2);
            setNFTs(sortedArray);
        }
    }
    useEffect(()=>{
        setDownloading(true);
        if(NFTs?.length){
            if(sort===1)
                sortByRating();
            if(sort===0)
                sortById();
        }
        
    },[sort])
    useEffect(()=>{
        if(NFTs?.length){
            setDownloading(false);
        }
    },[NFTs])
    
    
    return (
        <CollectionContext.Provider 
            value={{
                downloading,
                NFTs,
                sort,
                setSort,
                getMyNFTs,
                mintedNum,
                myNFTs
            }}>
            {children}
        </CollectionContext.Provider>
    )
}

export {CollectionContext, CollectionContextProvider};