import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import "./index.css";
import { Table, Tag } from "antd";
import { ModelServiceRegistry } from "@antv/xflow-core/es/model-service";
import moment from 'moment'


const DemoTable = (props) => {
  const [data, setData] = useState(undefined); //using useState to hook to store the data and render it on the DOM
 console.log("TABLE PROPS __________>",props.Timestamp)

// const getData = () =>{
//     fetch('../datasets/alert_summary_scaledown.json'
//     ,{
//       headers : { 
//         'Content-Type': 'application/json',
//         'Accept': 'application/json'
//        }
//     }
//     )
//       .then((response) => {
//         console.log(response)
//         return response.json();
//       })
//       .then(function(myJson) {
//         console.log(myJson);
//         setData(myJson)
//       });
//   }
  useEffect(()=>{
    setData(props.TableData)
  },[])

  
const columns = [
    {
        title: "Timestamp",
        dataIndex: "Timestamp",
        width: 150,
        key: "Timestamp",
        render: (text) => (moment.unix(text).format('DD MMM YYYY  HH:mm:ss'))
    },
    {
        title: "Source IP",
        dataIndex: "SourceAddr",
        width: 150,
        key: "SourceAddr"
    },
    {
        title: "Destination IP",
        dataIndex: "DestinationAddr",
        width: 150,
        key: "DestinationAddr"
    },
    {
        title: "Serverity",
        key: "serverity",
        width: 150,
        dataIndex: "Serverity",
        render: (text,record) => {
          //console.log("WHAT IS TEXT",text);
          //console.log("WHAT IS RECORD",record);
          let tag = text;
          let color = tag.length > 2 ? "geekblue" : "green" ;
          if (tag === "Low") {
              color = "green";
          }
          if (tag === "High")
          {
            color = "red"
          }
          if (tag === "Middle")
          {
            color = "geekblue"
          }
       
          return <Tag key={tag} color={color} >{tag.toUpperCase()}</Tag>
        }
    },

    {
        title: "Category",
        dataIndex: "Category",
        width: 150,
        key: "Category"
    }
];


  return (
    <Table 
     //className  = "antd_live_table"
      dataSource = {data}
      columns    = {columns}
      // pagination = {{pageSize: 50}}
      pagination = {false}
      scroll = {{y: 240 }}
    
    />
  )
// return React.createElement(Table, { columns: columns,size:"small",dataSource: data,pagination: {pageSize: 50}  ,scroll: {y: 240 }});
};
export default DemoTable;