import React,{FC} from 'react';
import {
  BrowserRouter,
  Link,
  Route,
  Routes
} from "react-router-dom";
import './App.less';
import {WalletContextProvider} from './context/WalletContext';
import {CollectionContextProvider} from './context/CollectionContext';
import Footer from './component/Footer';
import Home from './page/Home';
import MarketPlace from './page/MarketPlace';
import LastSales from './page/LastSales';
import MyETCZUNKS from './page/MyETCZUNKS';
const App:FC = () =>{
  return (
    <WalletContextProvider>
      <CollectionContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/explore" element={<MarketPlace/>}/>
            <Route path="/marketplace" element={<LastSales/>}/>
            <Route path="/myetczunks" element={<MyETCZUNKS/>}/>
          </Routes>
      
        </BrowserRouter>
        
        <Footer/>
      </CollectionContextProvider>
    </WalletContextProvider>
  );
}

export default App;
