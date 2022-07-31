import './App.css';
import React, { useState, useEffect, useRef } from "react";
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
import { Switch } from 'antd';
import { AntDesignOutlined } from '@ant-design/icons';
import { PageHeader } from 'antd';
import { Button, Result, Input } from "antd";
import { QuestionCircleFilled  } from '@ant-design/icons';
import { useThemeSwitcher } from "react-css-theme-switcher";
import { useParams, useLocation } from 'react-router-dom';



const { Header, Footer, Sider, Content } = Layout;


function HomeDetail(props) {

  console.log("CHECK FOR PROPS ", props)
  console.log("----HomeDetail-----")


  const para = useParams();

  const location = useLocation();

  useEffect(() => {
  
    console.log("This is the URL parameter in home details ", para)
    console.log("This is the location parameter in home details ", location)
 
  }, []);
  
 
  const [isDarkMode, setIsDarkMode] = React.useState();
  //const { switcher, currentTheme, status, themes } = useThemeSwitcher();

  // const toggleTheme = (theme) => {
  //   setIsDarkMode(theme.dark);
  //  // switcher({ theme: isChecked ? themes.dark : themes.light });
  // };
   // Avoid theme change flicker
  //  if (status === "loading") {
  //   return null;
  // }
  return (
    // <div className="fade-in">
    
    <Layout>

    <Header className="header">
    <Avatar className ="logo" icon={<AntDesignOutlined />} />
   
    <Avatar className ="logo_question" icon={<QuestionCircleFilled />} />
    
    <Input.Search className = "header_search" key="search"
        style={{
          width: 200
        }}
      />
    <Title className = "header_title" style={{color: 'white'}} level={3}>Aegis Technologies</Title>
    {/* <Switch checked={isDarkMode} onChange={toggleTheme} /> */}
    </Header>
    
    <Content>
     
    < Layout1 countryName = {para.countryname} countryDetails = {location.state.data_details_page}/>
    
    </Content>

    </Layout>
     
    
    // </div> 
  );
}

export default HomeDetail;
