
import 'antd/dist/antd.css';
import { Column } from "@ant-design/charts";
import { Tabs } from 'antd';
import React, { useEffect, useState } from "react";


const { TabPane } = Tabs;
function callback(key) {
    console.log(key);
  }

const DemoColumn = () => {
    const [data,setData] = useState([]); //using useState to hook to store the data and render it on the DOM
   
    const getData=()=>{
        fetch('../datasets/attack_replay.json'
        ,{
          headers : { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
           }
        }
        )
          .then(function(response){
            console.log(response)
            return response.json();
          })
          .then(function(myJson) {
            console.log(myJson);
            setData(myJson)
          });
      }
      useEffect(()=>{
        getData()
      },[])

  

    var config = {
        data: data,
        xField: "Date",
        yField: "scales",
        seriesField: "country",
        isPercent: true,
        isStack: true,
        label: {
            position: "middle",
            content: function content(item) {
                return item.scales.toFixed(2);
            },
            style: { fill: "#fff" }
        },
        xAxis: { tickCount: 5 },
        slider: {
            start: 0.1,
            end: 0.5
        }
    };
     
    
    return React.createElement(Column, Object.assign({}, config));
    
 

};

export default DemoColumn;