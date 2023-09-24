import {useEffect, useState, useContext} from 'react';
import Web3 from 'web3';
import {CONTRACTADDRESS, CONTRACTABI} from '../constant/env';
import { WalletContext } from '../context/WalletContext';

export const useMintHelper = ()=>{
    const WalletData = useContext(WalletContext);
    
    const onBuyNFT = async (nums:number)=>{
        if(!(WalletData.ethereumAddress || WalletData.trust)){
            return {success:false, message:"Please connect to Wallet!"};
        }

        let contract = new WalletData.web3.eth.Contract(CONTRACTABI, CONTRACTADDRESS);
        let bn = WalletData.web3.utils.BN;
        let walletAddress = WalletData.ethereumAddress || WalletData.trust ;
        console.log("walletAddress", walletAddress);
        if(contract){
            try{
                let mintedTokens :number[] = await contract.methods.getRandomNumbers().call();
                console.log("minted", mintedTokens);
                let maxSupply : number = await contract.methods.maxSupply().call();
                console.log("max", maxSupply);
                let selects : number[] = getRandomNum(maxSupply, mintedTokens, nums);
                console.log("selects", selects);
                let tx = await contract.methods.mintToken(selects).send({ value: new bn(1e9).mul(new bn(1e9)).mul(new bn(2*nums)), from: walletAddress })
                        .on('error',function(error:any){
                            return {success:false, message:"error"};
                        })
                
                        return {success:true, message:`You mint ${nums} ETCZUNKS successfully! `};       
                
            }catch(err){
                return {success:false, message:"error"};
            }
            
        }

        return {success:false, message:"not found contract"};
        
    }

    const getRandomNum = (max:number, minted:number[], amount:number) => {
        let tokens : number[] = [];
        let selects : number[] = [];
        for(let i=0;i<max;i++){
            if(!minted.includes(i))
                tokens.push(i);
        }
        for(let i=0;i<amount;i++){
            let ran = Math.floor(Math.random() * (tokens.length + 1));
            selects.push(tokens[ran]);
            tokens.splice(ran,1);
        }
        return selects;
    }
    return {onBuyNFT}

}
