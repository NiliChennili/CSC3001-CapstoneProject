import React, { useEffect, useState } from "react";
import { RadialBar } from '@ant-design/charts';

const DemoRadialBar = () => {
    const [data,setData] = useState([]); //using useState to hook to store the data and render it on the DOM


    const getData=()=>{
        fetch('../datasets/total_alert.json'
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


          setData(data)
      }
      useEffect(()=>{
        getData()
        // setData([ 
        //     {
        //       name: 'X6',
        //       star: 297,
        //     }])
        // console.log("DEMO RADICAL BAR")

      },[])

    let config = {
        // data: [ 
        //     {
        //       name: 'X6',
        //       star: 297,
        //     }],
        data: data,
        autoFit: true,
        width: 300,
        height: 200,
        xField: 'name',
        yField: 'star',
        maxAngle: 270,
        radius: 0.8,
        innerRadius: 0.2,
        // tooltip: {
        //     formatter: (datum)=> {
        //         return {
        //             name: 'Alert',
        //             value: datum.star,
        //         };
        //     }
        // },

        color: function color(_ref) {
          var name = _ref.name;
          if (name == 'DDOS') {
              return '#B71EFC';
          }
          else if (name =='Suspicious') {
              return '#2CA955';
          }
          else if (name =='Policy Violation'){
              return '#DC913D'
          }
          else if (name =='Malware'){
              return '#F4197B'
          }
          else if (name =='Bruteforce'){
              return '#1C76FD'
          }
          return '#36c361';
      },

        // colorField: 'name',        
        // color:({name})=> {
        //     // var name = _ref.name;
        //     if (name == 'DDOS') {
        //         return '#B71EFC';
        //     }
        //     else if (name =='Suspicious') {
        //         return '#2CA955';
        //     }
        //     else if (name =='Policy Violation'){
        //         return '#DC913D'
        //     }
        //     else if (name =='Malware'){
        //         return '#F4197B'
        //     }
        //     else if (name =='Bruteforce'){
        //         return '#1C76FD'
        //     }
        //     return '#36c361';
        // },
     
    };
 
  return(
      <RadialBar
         {...config}
         
      />

  )
  
};
export default DemoRadialBar;