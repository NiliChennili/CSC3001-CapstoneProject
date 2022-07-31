import React, { useEffect, useState } from "react";
import { Table} from "antd";
import "./GlobeTopAttackTable.css";


const GlobeTopAttackTable = () => {
const [data,setData] = useState([]); //using useState to hook to store the data and render it on the DOM

const getData=()=>{
    fetch('./datasets/top_attack_sample.json'
        // './datasets/alert_summary_scaledown.json'
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
  // {
  //   title: "Percentage",
  //   dataIndex: 'alert',
  //   key: "percentage",
  //   width: "20%",
  //   defaultSortOrder: "descend",
  //   sorter: (a, b) =>  a.alert - b.alert,
  //   render: (text,record) => {
  //      let percentage = record.alert / props.total
  //      return `${numeral(percentage).format(" 0.00%")}`
  //   }
  // },
  
const columns = [
  {
    title: "Rank",
    dataIndex: "rank",
    width: '10%',
    height: '20%',
    key: "rank"
},
    {
        title: "Country",
        dataIndex: "country",
        width: '30%',
        height: '20%',
        key: "country"
    },
    // {
    //     title: "Attack",
    //     dataIndex: "attack",
    //     width: '12%',
    //     height: '20%',
    //     key: "attack"
    // },
   
   
];
return (
  <Table 
    className  = "antd_top_attack_table"
    dataSource = {data}
    columns    = {columns}
    pagination = {false}
    scroll = {{y: 240 }}
 
  />
)


};
export default GlobeTopAttackTable;