import React, { useEffect, useState } from "react";
import { Table } from "antd";
import "./GlobeRadicalTable.css";

import {
  Sparkline,
  LineSeries,
  PointSeries,
  PatternLines,
  BandLine,
  HorizontalReferenceLine,
} from "@data-ui/sparkline";
import { allColors } from "@data-ui/theme";

const CountryeRadicalTable = () => {
  const [data, setData] = useState([]); //using useState to hook to store the data and render it on the DOM

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    fetch("../datasets/country_total_alert.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then(function (response) {
        console.log(response);
        return response.json();
      })
      .then(function (myJson) {
        console.log(myJson);
        setData(myJson);
      });
  };


  const columns = [
    {
      dataIndex: "name",
      key: "name",
      width: '18%',
      height: '15%',
    },
    {
      dataIndex: "star",
      key: "star",
       width: '18%',
       height: '15%',
    },
    {
      dataIndex: "dataset",
      key: "dataset",
       width: '20%',
       height: '20%',
      render: (record) => (
        //console.log("---record",record)
        <Sparkline
          //  ariaLabel="This is a Sparkline of..."
          width={150}
          height={40}
          //margin={{ top: 24, right: 50, bottom: 24}}
          data={record}
          valueAccessor={(datum) => datum}
        >
          {/* this creates a <defs> referenced for fill */}
          <PatternLines
            id="unique_pattern_id"
            height={6}
            width={6}
            stroke={allColors.indigo[6]}
            strokeWidth={1}
            orientation={["diagonal"]}
          />
          {/* display innerquartiles of the data */}
          <BandLine band="innerquartiles" fill="url(#unique_pattern_id)" />
          {/* display the median */}
          <HorizontalReferenceLine
            stroke={allColors.indigo[8]}
            strokeWidth={1}
            strokeDasharray="4 4"
            reference="median"
          />
          {/* Series children are passed the data from the parent Sparkline */}
          <LineSeries showArea={false} stroke={allColors.cyan[7]} />
          {/* <PointSeries points={["all"]}  />
          <PointSeries
            points={["max"]}
            fill={allColors.grape[3]}
            //size={3}
            stroke="#fff"
            //renderLabel={val => val.toFixed(2)}
          /> */}
        </Sparkline>
      ),
    },
  ];

  return (
    <Table 
      className  = "antd_chart_table"
      dataSource = {data}
      columns    = {columns}
      pagination = {false}
    />
  )

};
export default CountryeRadicalTable;
