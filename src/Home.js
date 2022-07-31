import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import GlobeDemo from './GlobeDemo';
import DemoLine from './DemoLine';
import RadialBar from './RadialBar';
import Layout1 from './Layout1';
import DemoColumn from './DemoColumn';
import 'antd/dist/antd.css';
import '@ant-design/pro-layout/dist/layout.css';
import '@ant-design/pro-card/dist/card.css';
import { Layout } from 'antd';
import Title from 'antd/lib/typography/Title';
import { Avatar } from 'antd';
import { AntDesignOutlined } from '@ant-design/icons';
import { PageHeader } from 'antd';
import { Button, Result, Input } from "antd";
import { QuestionCircleFilled  } from '@ant-design/icons';



const { Header, Footer, Sider, Content } = Layout;


function Home() {
  return (
    
    <Layout>

    <Header className="header">
    <Avatar className ="logo" icon={<AntDesignOutlined />} />
   
    {/* <Avatar className ="logo_question" icon={<QuestionCircleFilled />} />
    <Input.Search className = "header_search" key="search"
        style={{
          width: 200
        }}
      /> */}
    <Title className = "header_title" style={{color: 'white'}} level={4}>Aegis Technologies</Title>
    </Header>
    
    <Content>
     
    < GlobeDemo/>
    
    </Content>

    </Layout>
     
    

  );
}

export default Home;
