import React, { useState, useEffect } from "react";
import { Button, Result, Input, PageHeader, Statistic } from "antd";
import "./Layout1.css";
import ProLayout, { PageContainer } from "@ant-design/pro-layout";
import RcResizeObserver from "rc-resize-observer";
import { Space, Card } from "antd";
import DemoLine from "./DemoLine";
import DemoColumn from "./DemoColumn";
import RadialBar from "./RadialBar";
import DemoTable from "./DemoTable";
import GlobeDemo from "./GlobeDemo";
import DemoStackgraph from "./DemoStackgraph";
import Title from "antd/lib/typography/Title";
import { CaretUpOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import { DatePicker, Row, Col } from "antd";
import moment from "moment";
import { Select } from "antd";
import { LeftCircleOutlined } from "@ant-design/icons";
import GlobeRadicalTable from "./GlobeRadicalTable";
import CountryRadicalTable from "./CountryRadicalTable";
import { PADDING_TOP } from "@antv/s2";

const Layout1 = (props) => {
  //const [pathname, setPathname] = useState("/welcome");
  const [responsive, setResponsive] = useState(false);
  const [countryName, setCountryName] = useState(undefined);
  const [countryDetails, setCountryDetails] = useState(undefined);
  const { Meta } = Card;
  const { RangePicker } = DatePicker;
  const { Option } = Select;

  // const onChange = e => {
  //   props.setCountryNameCurr(e.target.value);
  // };

  //console.log("-----PROPS---", props.countryName);
  //console.log ("-----PROPS 2 ---",props.countryDetails)

  useEffect(() => {
    setCountryName(props.countryName);
    setCountryDetails(props.countryDetails);
    //console.log("Test format timestamp from the first element ", props.countryDetails[0].timestamp)
    // console.log("Props and country name: "+ props.countryName, + " " + countryName)
    console.log("DATA COMING IN", props.countryDetails);
    console.log("Test src_country ", props.countryDetails[0].src_country);
    console.log("Test src_country ", props.countryDetails[0].dst_country);
  }, []);

  let countryDetailData = props.countryDetails;

  const get_country_details_to_stack_graph = () => {
    let stack_graph_dataset = [];
    for (let i = 0; i < countryDetailData.length; i++) {
      let stackData = {};
      stackData["CountryName"] = countryDetailData[i]["dst_country"];
      stackData["AttackCategory"] = countryDetailData[i]["attack_category"];
      stackData["Timestamp"] = countryDetailData[i]["timestamp"];
      stackData["Scales"] = countryDetailData[i]["star_count"];
      stack_graph_dataset.push(stackData);
    }

    return stack_graph_dataset;
  };
  // console.log("---------------stack----------------",get_country_details_to_stack_graph())

  const get_country_details_to_line_graph = () => {
    let line_graph_dataset = [];
    for (let i = 0; i < countryDetailData.length; i++) {
      let lineData = {};
      lineData["FlowCategory"] = countryDetailData[i]["flow_category"];
      lineData["VolumeIn"] = countryDetailData[i]["vol_in"];
      lineData["Timestamp"] = countryDetailData[i]["timestamp"];
      lineData["CountryName"] = countryDetailData[i]["dst_country"];
      line_graph_dataset.push(lineData);
    }

    return line_graph_dataset;
  };

  const get_country_details_to_table = () => {
    let table_dataset = [];
    for (let i = 0; i < countryDetailData.length; i++) {
      let tableData = {};
      tableData["SourceAddr"] = countryDetailData[i]["ip_src_addr"];
      tableData["DestinationAddr"] = countryDetailData[i]["ip_dst_addr"];
      tableData["Timestamp"] = countryDetailData[i]["timestamp"];
      tableData["Serverity"] = countryDetailData[i]["serverity"];
      tableData["Category"] = countryDetailData[i]["l1_description"];
      table_dataset.push(tableData);
    }

    return table_dataset;
  };

  //**********get the top incoming country*************/

  const RadicaltitleRenderer = () => {
    return (
      <div style={{ color: "#D8D8D8", fontSize: "14px", textAlign: "center" }}>
        Total Events
      </div>
    );
  };
  const RadicaltextRenderer = () => {
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

  const TopIncomingCountry = () => {
    return (
      <div style={{ color: "#D8D8D8", fontSize: "16px", textAlign: "center" }}>
        Top Incoming Country
      </div>
    );
  };
  const TopOutgoingCountry = () => {
    return (
      <div style={{ color: "#D8D8D8", fontSize: "16px", textAlign: "center" }}>
        Top Outgoing Country
      </div>
    );
  };

  function onChange(dates, dateStrings) {
    console.log("From: ", dates[0], ", to: ", dates[1]);
    console.log("From: ", dateStrings[0], ", to: ", dateStrings[1]);
  }
  //Select value
  function handleChange(value) {
    console.log(value); // { value: "lucy", key: "lucy", label: "Lucy (101)" }
  }

  // flexbox
  const divStyle = {
    display: "flex",
    justifyContent: "space-around"
  };

  return (
    <>
      <RcResizeObserver
        key="resize-observer"
        onResize={(offset) => {
          setResponsive(offset.width < 596);
        }}
      >
        <PageContainer>
          <div
            style={{
              height: "120vh",
            }}
          >
            <PageHeader
              className="Pageheader"
              onBack={() => {
                window.history.back();
              }}
              backIcon={<LeftCircleOutlined className="logo_leftcircle" />}
              title={countryName}
              extra={[
                <RangePicker
                  ranges={{
                    Today: [moment(), moment()],
                    "This Month": [
                      moment().startOf("month"),
                      moment().endOf("month"),
                    ],
                    "This Week": [
                      moment().startOf("week"),
                      moment().endOf("week"),
                    ],
                  }}
                  onChange={onChange}
                />,

                <Select
                  labelInValue
                  defaultValue={{ value: "Interval" }}
                  style={{ width: 120 }}
                  onChange={handleChange}
                >
                  <Option value="jack">Hour</Option>
                  <Option value="lucy">Minutes</Option>
                </Select>,

                <Select
                  labelInValue
                  defaultValue={{ value: "Show" }}
                  style={{ width: 120 }}
                  onChange={handleChange}
                >
                  <Option value="jack">ALL</Option>
                  <Option value="lucy">Top 10</Option>
                </Select>,
              ]}
            />
            <div style={divStyle}>
              <Space direction="vertical" colSpan="30%">
                <Card
                  headerBordered
                  hoverable
                  bordered
                  style={{
                    width: 300,
                    height: 620,
                    background: "#191932",
                    border: 15,
                  }}
                >
                  <Statistic
                    title={RadicaltitleRenderer()}
                    value={247}
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
                        value={6.0}
                        precision={2}
                        valueStyle={{
                          color: "#FFFFFF",
                          fontSize: 15,
                          fontFamily: "Open Sans",
                          fontWeight: 600,
                        }}
                        prefix={
                          <CaretUpOutlined
                            style={{ fontSize: 16, color: "#cf1322" }}
                          />
                        }
                        suffix="%"
                      />
                    </Col>
                    <Col>
                      <h1>{RadicaltextRenderer()}</h1>
                    </Col>
                  </Row>

                  <Row>
                    <Col>
                      <RadialBar />
                    </Col>
                  </Row>
                  <div
                    style={{
                      width: "18rem",
                      right: "15px",
                      position: "absolute",
                    }}
                  >
                    <CountryRadicalTable />
                  </div>
                </Card>

                <Card
                  headerBordered
                  hoverable
                  bordered
                  style={{ width: 300, background: "#191932" }}
                >
                  <Statistic
                    title={RadicaltitleRenderer()}
                    value={247}
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
                        value={6.0}
                        precision={2}
                        valueStyle={{
                          color: "#FFFFFF",
                          fontSize: 15,
                          fontFamily: "Open Sans",
                          fontWeight: 600,
                        }}
                        prefix={
                          <CaretUpOutlined
                            style={{ fontSize: 16, color: "#cf1322" }}
                          />
                        }
                        suffix="%"
                      />
                    </Col>
                    <Col>
                      <h1>{RadicaltextRenderer()}</h1>
                    </Col>
                  </Row>
                </Card>

                <Card
                  headerBordered
                  hoverable
                  bordered
                  style={{ width: 300, background: "#191932" }}
                >
                  <Meta title={TopIncomingCountry()} />
                  <hr />
                  <p style={{ color: "white", textAlign: "center" }}>
                    {" "}
                    {props.countryDetails[0].src_country}
                  </p>
                </Card>

                <Card
                  headerBordered
                  hoverable
                  bordered
                  style={{ width: 300, background: "#191932" }}
                >
                  <Meta
                    //avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                    title={TopOutgoingCountry()}
                  />
                  <hr />
                  <p style={{ color: "white", textAlign: "center" }}>
                    {" "}
                    {props.countryDetails[0].dst_country}
                    

                  </p>
                </Card>
              </Space>

              <Space direction="vertical" colSpan="70%">
                <Card
                  headerBordered
                  hoverable
                  bordered
                  title="Attack Replay"
                  style={{ width: 860, height: 500 }}
                  className="detail-stack-graph"
                >
                  {/* < DemoColumn/> */}
                  <DemoStackgraph
                    StackData={get_country_details_to_stack_graph()}
                  />
                </Card>

                <Card
                  headerBordered
                  hoverable
                  bordered
                  title="Line Graph"
                  style={{ width: 860, height: 500 }}
                  className="detail-line-graph"
                >
                  <DemoLine LineData={get_country_details_to_line_graph()} />
                </Card>

                <Card
                  headerBordered
                  hoverable
                  title="Live Attacks"
                  bordered
                  style={{ width: 860, height: 400 }}
                  className="detail-live-attack"
                >
                  <DemoTable TableData={get_country_details_to_table()} />
                </Card>
              </Space>
            </div>
          </div>
        </PageContainer>
      </RcResizeObserver>
    </>
  );
};
export default Layout1;
