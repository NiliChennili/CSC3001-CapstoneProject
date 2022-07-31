import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Layout1 from './Layout1';
import HomeDetail from "./HomeDetail";
import Home from './Home';
import 'antd/dist/antd.css';
import '@ant-design/pro-layout/dist/layout.css';
import '@ant-design/pro-card/dist/card.css';
import { Progress } from "antd";
import { Card } from "antd";
import { Icon } from "antd";
import { Statistic} from "antd";



function App() {
  return (
    
    <div className="app">
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/HomeDetail" element={<HomeDetail/>}/>
            <Route path="/HomeDetail/:countryname" element={<HomeDetail/>}/>
          </Routes>
      </BrowserRouter>
      </div>
  );
}
  
export default App;
