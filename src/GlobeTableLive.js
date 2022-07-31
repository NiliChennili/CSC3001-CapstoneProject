import React, { useEffect, useState } from "react";
import "antd/dist/antd.css";
import { Table, Tag } from "antd";
import "./GlobeTableLive.css";
import moment from 'moment'
import { render } from "@testing-library/react";
import { arc_data } from "./database/arc_data";


const GlobeTableLive = () => {
const [data,setData] = useState(undefined); //using useState to hook to store the data and render it on the DOM
// ./database/places
const getData=()=>{
    fetch("./datasets/arc_data1.json"

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

  //let timestamp = moment.unix(this.props.unixTimestamp[0]).format('DD MMM YYYY HH:mm:ss') + " - " + moment.unix(this.props.unixTimestamp[1]).format('DD MMM YYYY HH:mm:ss')
  
const columns = [
    {
        title: "Timestamp",
        dataIndex: "timestamp",
        width: 100,
        key: "timestamp",
        render: (text) => (moment.unix(text).format('DD MMM YYYY  HH:mm:ss'))
        
    },
    {
        title: "Source Country",
        dataIndex: "src_country",
        width: 80,
        key: "src_country"
    },
    {
        title: "Destination Country",
        dataIndex: "dst_country",
        width: 80,
        key: "src_country"
    },
    // {
    //     title: "Serverity",
    //     key: "src_country",
    //     width: 50,
    //     dataIndex: "src_country",
    //     render: (src_country) => (React.createElement(React.Fragment, null, src_country.map((tag) => {
    //         let color = tag.length > 5 ? "geekblue" : "green";
    //         if (tag === "US") {
    //             color = "volcano";
    //         }
    //         return (React.createElement(Tag, { color: color, key: tag }, tag.toUpperCase()));
    //     })))
    // },
    {
        title: "Attack Category",
        dataIndex: "l1_description",
        width: 80,
        key: "l1_description"
    }
];

return (
  <Table 
   className  = "antd_live_table"
    dataSource = {data}
    columns    = {columns}
   
    // pagination = {{pageSize: 50}}
    pagination = {false}
    scroll = {{y: 240 }}
  
  />
)
};
export default GlobeTableLive;