import React, { useState, useEffect, useRef, useMemo } from "react";
import Globe from "react-globe.gl";
import { renderToStaticMarkup } from "react-dom/server";
import regeneratorRuntime from "regenerator-runtime";
import { countries_json } from "./database/ne_110m_admin_0_countries";
import { places } from "./database/places";
import { country_lat_long } from "./database/country_lat_long";
import { arc_data_specific } from "./database/arc_data_specific";
import { arc_data } from "./database/arc_data";
import { arc_data_last_month } from "./database/arc_data_last_month";
import { country_detail_data } from "./database/country_detail_data";
import Layout1 from "./Layout1";
import HomeDetail from "./HomeDetail";
import { useNavigate, Navigate } from "react-router-dom";
import "./GlobeDemo.css";
import { Card, Statistic, Row, Col } from "antd";
import RadialBar from "./RadialBar";
import GlobeTableLive from "./GlobeTableLive";
import momentTZ from 'moment-timezone';
import { Menu } from "antd";




import {
  CaretUpOutlined,
  MinusOutlined,
  CaretDownOutlined,
  AppstoreOutlined
} from "@ant-design/icons";

import GlobeTopAttackTable from "./GlobeTopAttackTable";
import GlobeRadicalTable from "./GlobeRadicalTable";
import ArcFilter from "./ArcFilter";
import _ from "lodash";
import moment from 'moment'
import { TreeLayout } from "@antv/g6-pc";


const MAP_CENTER = { lat: 37.6, lng: -16.6, altitude: 4 };
const OPACITY = 0.9;

//Unknow Country for the arc_data
const UNKNOWNSRC = {
  country_code: "Unknownsrc",
  latitude: "-8.783195",
  longitude: "-124.50852299999997",
  country: "Unknownsrc",
  usa_state_code: null,
  usa_state_latitude: null,
  usa_state_longitude: null,
  usa_state: null,
};

const UNKNOWNDST = {
  country_code: "Unknowndst",
  latitude: "-77",
  longitude: "-150",
  country: "Unknowndst",
  usa_state_code: null,
  usa_state_latitude: null,
  usa_state_longitude: null,
  usa_state: null,
};
// const TIME_STEP = 3 * 1000; // per frame

// const markerSvg = `<svg viewBox="-4 0 36 36">
// <path fill="currentColor" d="M14,0 C21.732,0 28,5.641 28,12.6 C28,23.963 14,36 14,36 C14,36 0,24.064 0,12.6 C0,5.641 6.268,0 14,0 Z"></path>
// <circle fill="black" cx="14" cy="14" r="7"></circle>
// </svg>`;

const GlobeDemo = () => {
  const globeEl = useRef();
  const [routes, setRoutes] = useState([]);
  const [countryCapital, setCountryCapital] = useState([]);
  const [countryLatlong,setCountryLatlong] = useState([])
  const [countryFeatures, setCountryFeatures] = useState([]);
  const [countryNameCurr, setCountryNameCurr] = useState(undefined);
 // const [countryDetailsAfterMerged, setCountryDetailsAfterMerged] = useState(undefined);
  const [hover, setHover] = useState(undefined);
  const [hoverArc, setHoverArc] = useState(undefined);
  const [polygonProperties, setPolygonProperties] = useState(undefined);
  const [arcCategory, setArcCategory] = useState("All");
  const [time, setTime] = useState(new Date());

  // const h = window.innerHeight;
  // const shiftFactor = 0.2;
  // const shiftAmmount = shiftFactor * h;
  // console.log("-----",shiftAmmount)

  // const w = window.innerWidth;
  // const shiftFactor = 0.4;
  // const shiftAmmount = shiftFactor * w;

  // useEffect(() => {
  //   // time ticker
  //   (function frameTicker() {
  //     requestAnimationFrame(frameTicker);
  //     setTime(time => new Date(+time + TIME_STEP));
  //   })();
  // }, []);




  useEffect(() => {
    constructMapData();
    constructCountryPoint();
    constructArcData(arc_data);
    constructCountryLatLong([]);


 

    // Auto-rotate Globe
    // globeEl.current.controls().autoRotate = true;
    // globeEl.current.controls().autoRotateSpeed = 0.5;
  }, []);

  //This one take the value from ArcFilter.js
  useEffect(() => {
    if (arcCategory === "All") {
      constructArcData(arc_data);
    } else {
      filterArcData(arc_data, arcCategory);
    }
  }, [arcCategory]);


  // Construct map data
  const constructMapData = () => {
    const features = countries_json.features;
    setCountryFeatures(features);
  };

  

  function getItem(label, key, icon, children) {
    return {
      key,
      icon,
      children,
      label
    };
  }
  
  const items = [
    getItem("Top Victim IP Address", "sub1", <AppstoreOutlined />, [
      getItem("Option 3", "3"),
      getItem("Option 4", "4"),
      getItem("Option 4", "5")
    ])
  ];
  

  //EventTile  Component
  const EventtitleRenderer = () => {
    return (
      <div style={{ color: "#D8D8D8", fontSize: "14px", textAlign: "center" }}>
        Total Events
      </div>
    );
  };

   //EventTile  Component
   const AlerttitleRenderer = () => {
    return (
      <div style={{ color: "#D8D8D8", fontSize: "14px", textAlign: "center" }}>
        Total Alerts
      </div>
    );
  };

  //EvenText Componet
  const eventtextRenderer = () => {
    return (
      <div
        style={{
          color: "#D8D8D8",
          fontSize: "12px",
          fontFamily: "Verdana,sans-serif",
        }}
      >
        Compared to Last Month 
      </div>
    );
  };

  // const ArcMapData = () => {
  //   const arc = arc_data_specific

  //   setRoutes(arc)
  // }

  //Filter Arc data
  const filterArcData = (arc_data, category) => {
    var arcdata = arc_data.filter(function (arc_data) {
      return arc_data.l1_description === category;
    });
    console.log("Testingarcdata", arcdata);
    constructArcData(arcdata);
  };

  //Arc Color Function
  const arcColorRenderer = (d, op) => {
    if (d.l1_description === "DDOS") {
      return [`rgba(223, 35, 255, 1, ${op})`, `rgba(223, 35, 255, 1, ${op})`];
    }
    if (d.l1_description === "Suspicious") {
      return [`rgba(94, 255, 90, 1, ${op})`, `rgba(94, 255, 90, 1, ${op})`];
    }
    if (d.l1_description === "Policy Violation") {
      return [`rgba(255, 166, 63, 1, ${op})`, `rgba(255, 166, 63, 1, ${op})`];
    }
    if (d.l1_description === "Malware") {
      return [`rgba(244, 25, 123, 1, ${op})`, `rgba(244, 25, 123, 1, ${op})`];
    }
    if (d.l1_description === "Bruteforce") {
      return [`rgba(1, 241, 227, 1, ${op})`, `rgba(1, 241, 227, 1, ${op})`];
    }
  };

  //*****************GET COUNTRY RANK  **************** */

  //count and count sort algorithm for top tattack countries (dictionary data)

  const constructTopCounty = () => {
    var result = {};
    for (let i = 0; i < arc_data.length; i++) {
      if (!result[arc_data[i]["dst_country"]]) {
        result[arc_data[i]["dst_country"]] = 0;
      }
      result[arc_data[i]["dst_country"]]++;
    }
    return result;
  };

  //count and count sort algorithm for top tattack countries (collection  data)
  const convertDictToCollection = (data) => {
    let result = [];
    let sorteddata = [];
    for (let i = 0; i < Object.keys(data).length; i++) {
      let item = {};
      item["country"] = Object.keys(data)[i];
      item["count"] = Object.values(data)[i];
      result.push(item);
    }

    return result;
  };

  let countrycountDictionary = constructTopCounty();
  let countyucountCollection = convertDictToCollection(countrycountDictionary);

  const get_rankmap = (country_collection, group_property) => {
    let group_result = _.groupBy(country_collection, group_property);
    console.log("group_result",group_result)
    let item_keys = Object.keys(group_result);
    console.log("item_keys",item_keys)
    let number_item_keys = item_keys.map((item) => {
      item = Number(item);
      return item;
    });
    let ordered = number_item_keys.reverse();
    let ranking_map = {};
    for (let i = 0; i < ordered.length; i++) {
      ranking_map[ordered[i]] = i + 1;
    }
    return ranking_map;
  };

  //map the specifit rank for the country count
  //item_value --country name
  const get_rank = (ranking_map, item_value) => {
    console.log("Ranking map: ", ranking_map)
    // let rank = ranking_map.item_value
    let rank = ranking_map[item_value]
    return rank;
  };

  //*****************GET TOP VICTIM IP ADDRESS **************** */

  //map the hover over country with arc.data for the top vicitim IP address & Attack IP address
  const get_target_country = (country_collection, target_country) => {
    var result = [];
    if (target_country === undefined) return null;
    for (let i = 0; i < country_collection.length; i++) {
      if (country_collection[i].dst_country === target_country.ADMIN) {
        result.push(country_collection[i]);
      }
    }
    if (result.length === 0) {
      console.log(
        "The target country does not exist in current country collection."
      );
    } else {
      console.log(
        "The target country exists in current country collection. And it is been attacked " +
          result.length +
          " times."
      );
     // console.log("This " + result.length + " time(s) is(are) ", result);
    }
    return result;
  };

  //Count the Top Victim IP Address
  const construct_Victim_IP_data = (data) => {
    if (data === null) return null;

    let VictimIPData = {};

    for (let i = 0; i < data.length; i++) {
      if (!VictimIPData[data[i]["ip_dst_addr"]]) {
        VictimIPData[data[i]["ip_dst_addr"]] = 0;
      }
      VictimIPData[data[i]["ip_dst_addr"]]++;
    }

    //console.log("----Construct IP_dst_addr----", VictimIPData);
    return VictimIPData;
  };

  //convert to the collectiong for top Victim IP Address
  const convertDictToCollectionIP = (data) => {
    if (data === null) return null;
    let result = [];

    for (let i = 0; i < Object.keys(data).length; i++) {
      let item = {};
      item["Victim IP Address"] = Object.keys(data)[i];
      item["count"] = Object.values(data)[i];
      result.push(item);
    }
    //console.log("----Construct IP result Collection ----", result);

    return result;
  };

  let getTargetCountry = get_target_country(arc_data, polygonProperties);
  let construct_victim_data = construct_Victim_IP_data(getTargetCountry);
  let convert_victim_data_to_collection = convertDictToCollectionIP(
    construct_victim_data
  );
  let victim_ip_address_ranking_map = get_rankmap(
    convert_victim_data_to_collection,
    "count"
  );
  console.log("___Victim_ip_address_ranking", victim_ip_address_ranking_map);

  //convert_victim_data_to_collection = {
  //     "Victim IP Address": "192.168.159.32",  "count": 1
  //     }
  //
  // victim_ip_address_ranking_map = { "1": 1 }

  //get ranking Number one IP Address
  const get_top_IP = (
    victim_ip_address_ranking_map,
    victim_data_collection
  ) => {
    if (
      victim_ip_address_ranking_map === null ||
      victim_data_collection === null ||
      victim_ip_address_ranking_map === undefined ||
      victim_data_collection === undefined
    )
      return null;
    let top_IP = [];
    for (let i = 0; i < victim_data_collection.length; i++) {
      if (
        victim_data_collection[i]["count"] ===
        Object.values(victim_ip_address_ranking_map)[0]
      ) {
        top_IP.push(victim_data_collection[i]["Victim IP Address"]);
      }
    }
    return top_IP;
  };

  let top_ip = get_top_IP(
    victim_ip_address_ranking_map,
    convert_victim_data_to_collection
  );
  //console.log("top_ip", top_ip);

  //*****************MERGE DATA FOR DETAILS PAGE  **************** */
  
  const merge_data = () => {
    let detail_merge_data = _.merge(arc_data, country_detail_data);
    console.log("Detail Merged data: ", detail_merge_data)
    return detail_merge_data;
  };

  let getCountryDetails = get_target_country(merge_data(), polygonProperties);
  //console.log("---------MERGE DATA SET------------", getCountryDetails);

  const detailsElement = () => {
    return (
      <Navigate
        to={{
          pathname: `/HomeDetail/${countryNameCurr}`,
          state: { getCountryDetails },
        }}
      />
    );
  };

  //console.log("<------------detailsElements------------->",detailsElement)

  //*****************GET TOP ATTACK ADDRESS **************** */

  //Count the Top Attack IP Address
  const construct_Attack_IP_data = (data) => {
    if (data === null) return null;

    let AttackIPData = {};

    for (let i = 0; i < data.length; i++) {
      if (!AttackIPData[data[i]["ip_src_addr"]]) {
        AttackIPData[data[i]["ip_src_addr"]] = 0;
      }
      AttackIPData[data[i]["ip_src_addr"]]++;
    }

    console.log("----Construct IP Attack Address----", AttackIPData);
    return AttackIPData;
  };

  //convert to the collectiong for top Attack IP Address
  const convertDictToCollectionAttackIP = (data) => {
    if (data === null) return null;
    let result = [];

    for (let i = 0; i < Object.keys(data).length; i++) {
      let item = {};
      item["Attack IP Address"] = Object.keys(data)[i];
      item["count"] = Object.values(data)[i];
      result.push(item);
    }
    console.log("----Construct IP Attack Address Collection ----", result);

    return result;
  };

  let construct_attack_data = construct_Attack_IP_data(getTargetCountry);
  let convert_attack_data_to_collection = convertDictToCollectionAttackIP(
    construct_attack_data
  );
  let attack_ip_address_ranking_map = get_rankmap(
    convert_attack_data_to_collection,
    "count"
  );
  console.log("___Attack_ip_address_ranking", attack_ip_address_ranking_map);

  //get ranking Number one IP Address
  const get_top_attack_IP = (
    attack_ip_address_ranking_map,
    attack_data_collection
  ) => {
    if (
      attack_ip_address_ranking_map === null ||
      attack_data_collection === null ||
      attack_ip_address_ranking_map === undefined ||
      attack_data_collection === undefined
    )
      return null;
    let top_Attack_IP = [];
    for (let i = 0; i < attack_data_collection.length; i++) {
      if (
        attack_data_collection[i]["count"] ===
        Object.values(attack_ip_address_ranking_map)[0]
      ) {
        top_Attack_IP.push(attack_data_collection[i]["Attack IP Address"]);
      }
    }
    return top_Attack_IP;
  };

  let top_attack_ip = get_top_attack_IP(
    attack_ip_address_ranking_map,
    convert_attack_data_to_collection
  );
  console.log("top_ip", top_attack_ip);
   //****************COUNTRY COUNT FOR LAST MONTH******************/
   const constructTopCountyLastMonth = () => {
    var result = {};
    for (let i = 0; i < arc_data_last_month.length; i++) {
      if (!result[arc_data_last_month[i]["dst_country"]]) {
        result[arc_data_last_month[i]["dst_country"]] = 0;
      }
      result[arc_data_last_month[i]["dst_country"]]++;
    }
    return result;
  };
  let countrycountDictionaryLastMonth = constructTopCountyLastMonth();

  //*****************COMPARE LAST MONTH AND THIS MONTH (ALERT ICON AND PERCENTAGE) **************** */

  const compare_alert_last_month = (alert_this_month, alert_last_month) => {
    // let value = alert_this_month / alert_last_month;  /10  6
    let value = alert_this_month / alert_last_month;
    let percentage = 0;

    console.log("VALUE", value);

    if (value < 1) {
      let generate_percentage = value * 100;
      percentage = Math.round(100 - generate_percentage);
      console.log("< 1", percentage);
    }
    if (value > 1) {
      let generate_Percentage = value * 100;
      percentage = Math.round(generate_Percentage - 100);
      console.log("> 1", percentage);
    } else {
      console.log("0", percentage);
    }

    return parseInt(percentage);
  };

  const compare_alert_last_month_value = (
    alert_this_month,
    alert_last_month
  ) => {
    let value = alert_this_month / alert_last_month;
    let icon = <MinusOutlined style={{ fontSize: 16, color: "#cf1322" }} />;
    let icondown = (
      <CaretDownOutlined style={{ fontSize: 16, color: "#008000" }} />
    );
    let iconup = <CaretUpOutlined style={{ fontSize: 16, color: "#cf1322" }} />;

    console.log("VALUE", value);

    if (value < 1) {
      icon = icondown;
    }
    if (value > 1) {
      icon = iconup;
    } else {
    }

    return icon;
  };


  let compare_alert_last_month_computation = compare_alert_last_month(
    arc_data.length,
    arc_data_last_month.length

  );
  let compare_alert_last_month_value_icon = compare_alert_last_month_value(
    arc_data.length,
    arc_data_last_month.length
  );
  console.log("ARC DATA length ",arc_data.length);
  // console.log("DETAILS DATA length ",country_detail_data.length);
  //*****************ARC DATA COLLECTION  **************** */

  //Arc data collection
  const constructArcData = (arc_data) => {
    let arcDataset = [];
    //i< arc_data.length
    // i <= 10;
    for (let i = 0; i < arc_data.length; i++) {
      let arcData = {};

      arcData["src_log"] = (_.find(country_lat_long, function (item) {
        return item.country === arc_data[i]["src_country"];
      }) || UNKNOWNSRC)["longitude"];

      arcData["src_lag"] = (_.find(country_lat_long, function (item) {
        return item.country === arc_data[i]["src_country"];
      }) || UNKNOWNSRC)["latitude"];

      arcData["dst_log"] = (_.find(country_lat_long, function (item) {
        return item.country === arc_data[i]["dst_country"];
      }) || UNKNOWNDST)["longitude"];

      arcData["dst_lag"] = (_.find(country_lat_long, function (item) {
        return item.country === arc_data[i]["dst_country"];
      }) || UNKNOWNDST)["latitude"];

      arcData["src_country"] = arc_data[i]["src_country"];
      arcData["dst_country"] = arc_data[i]["dst_country"];
      arcData["l1_description"] = arc_data[i]["l1_description"];

      arcDataset.push(arcData);
    }
    // TODO: loop in sample_data (arc_data) -> [{l1_description: ,source: ,destination: },{}....]
    setRoutes(arcDataset);
  };
  // console.log("this is the Arc()",routes)

  const constructCountryPoint = () => {
    setCountryCapital(places);
  };

  const navigate = useNavigate();
  const polygonOnClick = () => {
    let getCountryDetails = get_target_country(merge_data(), polygonProperties);
    
    navigate(`/HomeDetail/${countryNameCurr}`, {
      state: { data_details_page: getCountryDetails },
    });
  };


 
//******************AUTO RENDER USER LOCATION*******************/
// const sortMatch = (country_lat_long) => {

//   let countryLocationDataset = [];
//   let now = moment.tz.guess()    // the timezone user is in 
//   let nowFormat = _.split(now,'/',2); //split the data to ['Aisa','Singapore']
//   let drop = _.drop(nowFormat,1);  //drop the asia and left with ['Singapore']
 

// for (let i = 0; i < country_lat_long.length; i++){
//   let countryLocationData = {};
//   if(country_lat_long[i]["country"] === drop[0]){
   
//     countryLocationData["lat"] = country_lat_long[i]["latitude"];
//     countryLocationData["long"]= country_lat_long[i]["longitude"];
//     countryLocationData["Country"]= country_lat_long[i]["country"];

//     countryLocationDataset.push(countryLocationData)
// }
// }

//  setLabelData(countryLocationDataset);
// };

// console.log("this is the Match()",labelData)

  //sortMatch(country_lat_long);
  const constructCountryLatLong = () =>{
      
  //const country_lat_long = countries_json.features;
  let countryLocationDataset = [];
  let now = moment.tz.guess()    // the timezone user is in 
  let nowFormat = _.split(now,'/',2); //split the data to ['Aisa','Singapore']
  let drop = _.drop(nowFormat,1);  //drop the asia and left with ['Singapore']
 

for (let i = 0; i < country_lat_long.length; i++){
  let countryLocationData = {};
  if(country_lat_long[i]["country"] === drop[0]){
   
    countryLocationData["lat"] = country_lat_long[i]["latitude"];
    countryLocationData["long"]= country_lat_long[i]["longitude"];
    countryLocationData["Country"]= country_lat_long[i]["country"];

    countryLocationDataset.push(countryLocationData)
}
}

 setCountryLatlong(countryLocationDataset);
};

console.log("this is the Match()",countryLatlong)

// const features = countries_json.features;
// setCountryFeatures(features);
  


// const items = [
//   getItem("Top Victim IP Address", "sub1", <AppstoreOutlined />, [
//     ///getItem("Option 3", "3")
//     getItem("top_ip","3")
  
//   ])
// ];


  {/* <table id="ip_address">
                  <tbody>
                    {top_ip.map((item) => {
                      return (
                        <tr key={item}>
                          <td>{item}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table> */}



//******************This a Globe Class ********************/

  return (
    // <div
    //   style={{
    //     marginTop: `-${shiftAmmount}px`
    //   }}
    // >
    <React.Fragment>
      <div className="globebackwards">
        <Globe
          ref={globeEl}
          // height={h + shiftAmmount}
         // '//cdn.jsdelivr.net/npm/three-globe/example/img/earth-night.jpg'
         //  //unpkg.com/three-globe/example/img/earth-dark.jpg
          globeImageUrl='//cdn.jsdelivr.net/npm/three-globe/example/img/earth-night.jpg'
          // backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
          backgroundColor="#000000"
          // style={{ backgroundColor: "red"}}
          //height={1000}
          // lineHoverPrecision={0}
          //pointsData={places}
          //pointsData={countryFeatures}
          // pointColor={() => "red"}
          //pointAltitude={0}
          //pointRadius={0.3}
          //pointsMerge={true}
          //pointOfView={(MAP_CENTER, 4000)}
          polygonsData={countryFeatures}
          // polygonCapColor={(d) => (d === hover ? "#00D6C7" : "#383838")}
          polygonCapColor={(d) =>
            d === hover
              ? `rgba(0, 214, 199, ${OPACITY})`
              : `rgba(56, 56, 56, ${OPACITY})`

          }
          onPolygonHover={(d) => {
            if (d) {
              setPolygonProperties(d.properties);
              setCountryNameCurr(d.properties.ADMIN);
              setHover(d);

              get_target_country(arc_data, d.properties.ADMIN);
              
            }
          

          }}
          polygonAltitude={(d) =>
            d === hover
              ? 0.15
              : 0.06

          }
      
          //polygonStrokeColor={() => "#00D6C7"}
          //polygonSideColor={() => "#b2f1e8"}
          polygonsTransitionDuration={300}
          polygonStrokeColor={() => "#84e2d8"}
          polygonSideColor={() => "rgba(0, 100, 0, 0.15)"}
          onPolygonClick={() => polygonOnClick()}
          // polygonLabel={({ properties: d }) => {
          //   console.log("HIII",d);
          //   setPolygonProperties(d);

          //   // hoverRenderer(d);
          // }}

          //This is the label text

          labelsData={[countryLatlong]}
          labelLat={(d) => d.lat}
          labelLng={(d) => d.long}
          labelText={(d) => d.Country}
          labelSize={(d) => 0.5 + d.size}
          labelDotRadius={(d) => 0.5 + d.size}
          labelColor={() => 'rgba(255, 165, 0, 0.75)'}
          labelResolution={2}
          labelIncludeDot = {true}

          // htmlElementsData={labelData}
          // htmlLat = {(d) => d.lat}
          // htmlLng = {(d) => d.long}
          // htmlElement={d => {
          //   const el = document.createElement('div');
          //   el.innerHTML = markerSvg;
          //   el.style.color = 'red';
          //   el.style.width = `${d.size}px`;

          //  // el.style['pointer-events'] = 'auto';
          //   //el.style.cursor = 'pointer';
          //   //el.onclick = () => console.info(d);
          //   return el;
          // }}

          //arcs parameters
          arcsData={routes}
          arcStartLat={(d) => d.src_lag}
          arcStartLng={(d) => d.src_log}
          arcEndLat={(d) => d.dst_log}
          arcEndLng={(d) => d.dst_lag}
          arcLabel={(d) =>
            `${d.l1_description}: ${d.src_country} &#8594; ${d.dst_country}`
          }
          onArcHover={setHoverArc}
          arcDashLength={0.4}
          arcDashGap={0.2}
          arcDashAnimateTime={2500}
          arcsTransitionDuration={0}
          arcColor={(d) => {
            const op = !hoverArc ? OPACITY : d === hoverArc ? 0.9 : OPACITY / 4;

            return arcColorRenderer(d, op);

            //return [`rgba(0, 255, 0, ${op})`, `rgba(255, 0, 0, ${op})`];
          }}
        />
      </div>

      <div class="containerRadial">
        <Statistic
          title={AlerttitleRenderer()}
          value={arc_data.length}
          valueStyle={{
            color: "#FFFFFF",
            fontSize: 30,
            fontFamily: "Open Sans",
            fontWeight: 600,
            textAlign: "center",
          }}
        />

        <Row>
          <Col>
            <Statistic
              value={compare_alert_last_month_computation}
              precision={2}
              valueStyle={{
                color: "#FFFFFF",
                fontSize: 15,
                fontFamily: "Open Sans",
                fontWeight: 600,
              }}
              prefix={compare_alert_last_month_value_icon}
              suffix="%"
            />
          </Col>
          <Col>
            <h1>{eventtextRenderer()}</h1>
          </Col>
        </Row>

        <Row>
          <Col>
            <RadialBar />
          
          </Col>
        </Row>
        <div style={{ width: "19rem", right: "9px", position: "absolute" }}>
          <GlobeRadicalTable />
        </div>
      </div>
      <div class="containerHover">
        {polygonProperties && (
          <div>
            <div className="stylehover">
              <p>Most Attack Country </p>
              <div class="inline-div" />
              <div class="h2hover">#</div>
              <div class="h1hover">
                {countrycountDictionary[polygonProperties.ADMIN] !== undefined
                  ? get_rank(
                      get_rankmap(countyucountCollection, "count"),
                      countrycountDictionary[polygonProperties.ADMIN]
                    )
                  : "Nil"}
              </div>
            </div>
            <b style={{ color: "#ffffff" }}>
              {polygonProperties.ADMIN} ({polygonProperties.ISO_A2})
            </b>
            <hr />
            <div class="w3-container">
              <div style={{ color: "#ffffff" }}>
                Total Attack : {countrycountDictionary[polygonProperties.ADMIN]}
              
                  
          
              </div>
     
          <Col>
            <Statistic
              value={

                countrycountDictionary[polygonProperties.ADMIN] !== undefined 
                
                ? compare_alert_last_month(countrycountDictionary[polygonProperties.ADMIN],countrycountDictionaryLastMonth[polygonProperties.ADMIN])
                : "0"
              }
              precision={0}
              valueStyle={{
                color: "#FFFFFF",
                fontSize: 15,
                fontFamily: "Open Sans",
                fontWeight: 600,
              }}
              prefix={
                compare_alert_last_month_value(countrycountDictionary[polygonProperties.ADMIN],countrycountDictionaryLastMonth[polygonProperties.ADMIN])
                
              }
              suffix="%"
            />
          </Col>
            <p style={{ color: "#D8D8D8",fontSize: "12px", fontFamily: "Verdana,sans-serif", }}>Compared to {countrycountDictionaryLastMonth[polygonProperties.ADMIN]} Attacks Last Month
                </p>
        
              <hr />
              <p style={{ color: "#ffffff" }}>Top Victim IP Address</p>
              <div class="title">
                <table id="ip_address">
                  <tbody>
                    {top_ip.map((item) => {
                      return (
                        <tr key={item}>
                          <td>{item}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              <hr />
              <p style={{ color: "#ffffff" }}>Top Attack IP Address</p>
              <div class="title">
                <table id="ip_address">
                  <tbody>
                    {top_attack_ip.map((item) => {
                      return (
                        <tr key={item}>
                          <td>{item}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* <div class="containerHover">
        {polygonProperties && (
          <div>
         
         <Menu
        style={{
          width: 256
        }}
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1"]}
        mode={'inline'}
        theme={'dark'}
        items={items}
      /> */}

  





      <div className="containerEventCard" headerBordered hoverable bordered>
        <Statistic
          title={EventtitleRenderer()}
          value={arc_data.length}
          valueStyle={{
            color: "#FFFFFF",
            fontSize: 30,
            fontFamily: "Open Sans",
            fontWeight: 600,
            textAlign: "center",
          }}
        />

        <Row>
          <Col>
            <Statistic
              value={compare_alert_last_month_computation}
              precision={2}
              valueStyle={{
                color: "#FFFFFF",
                fontSize: 15,
                fontFamily: "Open Sans",
                fontWeight: 600,
              }}
              prefix={compare_alert_last_month_value_icon}
              suffix="%"
            />
          </Col>
          <Col>
            <h1>{eventtextRenderer()}</h1>
          </Col>
        </Row>
      </div>

      {/* <br/> */}
      <div class="filterContainer">
        {" "}
        <ArcFilter arcCategory={arcCategory} setArcCategory={setArcCategory} />
      </div>
      <Row>
        <Col span="6">
      <h1  style={{
          color: "#D8D8D8",
          fontSize: "18px",
          textAlign:"center",
          fontFamily: "Verdana,sans-serif",
        }}>Top Attack Countries</h1>
        </Col>
        <Col span="18">
         <h1  style={{
          textAlign:"center",
          color: "#D8D8D8",
          fontSize: "18px",
          fontFamily: "Verdana,sans-serif",
        }}>Live Attacks</h1>
        </Col>
      </Row>
      
      <Row>
        
        <Col span="6">
          <GlobeTopAttackTable />
          {/* <WordCloudCountry /> */}
        </Col>
       
        {/* <Col span="18" class="containerTopAttackTable"> */}
        <Col span="18">
          <GlobeTableLive />
        </Col>
      </Row>

    </React.Fragment>
  );
};

export default GlobeDemo;
