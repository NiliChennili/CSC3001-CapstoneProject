import React, { useState, useEffect } from 'react';
import { Line } from '@ant-design/charts';
import moment from 'moment'




const DemoLine = (props) => {
    const [data, setData] = useState(undefined); //using useState to hook to store the data and render it on the DOM
    
    
    useEffect(() => {
        setData(props.StackData);
    }, []);

    // const asyncFetch = () => {

    //     fetch('../datasets/datatesting.json')
    //         .then((response) => response.json())
    //         .then((json) => setData(json))
    //         .catch((error) => {
    //         console.log('fetch data failed', error);
    //     });
    // };


    var config = {
        data: props.LineData,
        xField: "Timestamp",
        yField: "VolumeIn",
        seriesField: "FlowCategory",
        meta: {
            "Timestamp":{formatter: (value)=>{return moment.unix(value).format('DD/MM/YYYY')}
          }},  
          //set the field(the line)
        // xAxis: { type: 'time' },  
        // yAxis: {
        //     label: {
        //         formatter: function formatter(v) {
        //             return ''.concat(v).replace(/\d{1,3}(?=(\d{3})+$)/g, function (s) {
        //                 return ''.concat(s, ',');
        //             });
        //         },
        //     },
        // },
        animation: {
            appear: {
              animation: 'path-in',
              duration: 5000,
            },
          },
    };
    return (<Line 
        dataSource = {props.LineData}
        {...config}
        />
        )
    // return React.createElement(Line, Object.assign({}, config));

};
export default DemoLine;