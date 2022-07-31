import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Area } from '@ant-design/plots';
import moment from 'moment'

const DemoStackgraph = (props) => {
  const [data, setData] = useState(undefined);
 console.log("PROPS FOR STACK GRAPH",props.StackData)

  // const getData = () => {
  //   fetch('../datasets/attack_replay.json', {
  //     headers: {
  //       'Content-Type': "application/json",
  //       'Accept': "application/json",
  //     }
  //   })
  //     .then((response) => {
  //       console.log(response);
  //       return response.json();
  //     })
  //     .then((myJson) => {
  //       console.log(myJson);
  //       setData(myJson);
  //     });
  // }


//   let Stack_data =props.StackData
//   const getData = (Stack_data) => {

//  for(let i = 0; i < props.StackData.length; i++){
//       let seriesData = props.StackData[i].CountryName
//       let xfield = props.StackData[i].AttackCategory
//       let yfield = props.StackData[i].Timestamp
  
      
//      }

//   }


  useEffect(() => {
    setData(props.StackData);
  }, []);

//   let timeframe = {
//     "Timestamp": moment.unix(props.StackData.Timestamp).format("DD MMM YYYY HH:mm:ss")
  
// }



  var config = {
  
    data: props.StackData,
    xField: 
      "Timestamp",
    yField:
      "Scales"
    ,
    seriesField: "AttackCategory",
    meta: {
      "Timestamp":{formatter: (value)=>{return moment.unix(value).format('DD/MM/YYYY')}
    }
  },
  // xAxis:{
  //   label:{
  //     formatter: function formatter() {
  //      return (text) => (moment.unix(text).format('DD MMM YYYY  HH:mm:ss'))
  //     },
    
  //   }
  // },
    // 
    slider: {
      start: 0.1,
      end: 0.9,
      formatter: (value) => (moment.unix(value).format('DD MMM YYYY'))
      
    },
  };

  return (<Area 
  dataSource = {props.StackData}
  {...config}
  />
  )
};

export default DemoStackgraph;
