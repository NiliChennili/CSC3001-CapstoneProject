import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import "./GlobeDemo.css";
import { Radio } from 'antd';
import { country_lat_long } from "./database/country_lat_long";




const ArcFilter = (props) => {
const { CheckableButton } = Radio;

  const onChange = e => {
    props.setArcCategory(e.target.value);
  };
  
  
    console.log("--------", props.arcCategory)
    //const { selectedButton } = this.state;
    return (
      <div>
      <Radio.Group
        value={props.arcCategory}
        onChange={onChange}
        style={{ marginBottom: 16 }}
      >
        <Radio.Button className="button_DDOS" value="DDOS">DDOS</Radio.Button>
        <Radio.Button className="button_Suspicious" value="Suspicious">Suspicious</Radio.Button>
        <Radio.Button className="button_PolicyViolation" value="Policy Violation">Policy Violation</Radio.Button>
        <Radio.Button className="button_Malware" value="Malware">Malware</Radio.Button>
        <Radio.Button className="button_Bruteforce" value="Bruteforce">Bruteforce</Radio.Button>
        <Radio.Button className="button_All" value="All">All</Radio.Button>
      </Radio.Group>
    </div>
    );
  

};

export default ArcFilter;

