import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import { useSelector, useDispatch } from "react-redux";
import allActions from "../actions";
import MaterialTable from "material-table";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
} from "recharts";
import { DateRangePicker } from "react-date-range";

export default function Dashboard() {
  const tableData = useSelector((state) => state.tableData?.result?.data);
  const barData = useSelector((state) => state.barData?.result?.data);
  const pieData = useSelector((state) => state.pieData?.result?.data);
  const [dateRange, setDateRange] = useState();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  const dispatch = useDispatch();

  const cookies = new Cookies();

  const getTableData = () => {
    var myHeaders = new Headers();
    myHeaders.append("x-auth-token", cookies.get("token"));
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      _id: "dashboard1516252439345",
      emailId: "candidate@sigmoid.com",
      orgViewReq: {
        organization: "DemoTest",
        view: "Auction",
      },
      chartObject: {
        metadata: {
          title: "chartobject:1516252439345",
          img_thumbnail: "../img/chart.png",
          chartType: "table",
          dataLimit: 50,
        },
        requestParam: {
          granularity: "hour",
          timeZone: {
            name: "UTC (+00:00)",
            location: "UTC",
          },
          dateRange: {
            startDate: "" + startDate,
            endDate: "" + endDate,
          },
          xAxis: ["D044"],
          yAxis: ["M002"],
          approxCountDistinct: [],
          specialCalculation: [],
          filter: [],
          orderBy: {
            metricOrdByList: [
              {
                id: "M002",
                desc: true,
              },
            ],
          },
          percentCalList: [],
        },
      },
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("https://sigviewauth.sigmoid.io/api/v1/getData", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        dispatch(allActions.dataActions.table(result));
      })
      .catch((error) => console.log("error", error));
  };

  const getBarData = () => {
    var myHeaders = new Headers();
    myHeaders.append("x-auth-token", cookies.get("token"));
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      _id: "dashboard1516252235693",
      emailId: "candidate@sigmoid.com",
      orgViewReq: {
        organization: "DemoTest",
        view: "Auction",
      },
      chartObject: {
        metadata: {
          title: "chartobject:1516252235693",
          img_thumbnail: "../img/chart.png",
          chartType: "bar",
          dataLimit: 50,
        },
        requestParam: {
          granularity: "hour",
          timeZone: {
            name: "UTC (+00:00)",
            location: "UTC",
          },
          dateRange: {
            startDate: "" + startDate,
            endDate: "" + endDate,
          },
          xAxis: ["D017"],
          yAxis: ["M002"],
          approxCountDistinct: [],
          specialCalculation: [],
          filter: [],
          orderBy: {
            metricOrdByList: [
              {
                id: "M002",
                desc: true,
              },
            ],
          },
          percentCalList: [],
        },
      },
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("https://sigviewauth.sigmoid.io/api/v1/getData", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        dispatch(allActions.dataActions.bar(result));
      })
      .catch((error) => console.log("error", error));
  };

  const getPieData = () => {
    var myHeaders = new Headers();
    myHeaders.append("x-auth-token", cookies.get("token"));
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      _id: "Datastory_ChartId_1535224664111",
      emailId: "candidate@sigmoid.com",
      orgViewReq: {
        organization: "DemoTest",
        view: "Auction",
      },
      chartObject: {
        metadata: {
          title: "",
          img_thumbnail: "images/pie.png",
          chartType: "pie",
          dataLimit: 500,
        },
        text: [],
        requestParam: {
          granularity: "hour",
          timeZone: {
            name: "UTC (+00:00)",
            location: "UTC",
          },
          dateRange: {
            startDate: "" + startDate,
            endDate: "" + endDate,
          },
          xAxis: ["D005"],
          yAxis: [],
          approxCountDistinct: [],
          specialCalculation: ["CM001"],
          filter: [],
          orderBy: {
            customMetricOrdByList: [
              {
                id: "CM001",
                desc: true,
              },
            ],
          },
          percentCalList: [
            {
              id: "CM001",
            },
          ],
        },
      },
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("https://sigviewauth.sigmoid.io/api/v1/getData", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.status.statusCode === "200") {
          result.result.data = result.result.data.map((data) => {
            return {
              ...data,
              name: data.advertiserId,
              CM001: parseInt(data.CM001),
            };
          });
          dispatch(allActions.dataActions.pie(result));
        }
      })
      .catch((error) => console.log("error", error));
  };

  const getDateRange = () => {
    var myHeaders = new Headers();
    myHeaders.append("x-auth-token", cookies.get("token"));
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      organization: "DemoTest",
      view: "Auction",
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("https://sigviewauth.sigmoid.io/api/v1/getDateRange", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        let startDate = new Date(parseInt(result.result.startDate));
        let endDate = new Date(parseInt(result.result.endDate));
        result = {
          startDate: startDate,
          endDate: endDate,
        };
        setDateRange(result);
      })
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    getTableData();
    getBarData();
    getPieData();
  }, [endDate, startDate]);

  useEffect(() => {
    getDateRange();
  }, []);

  const handleSelect = (date) => {
    setStartDate(date.selection.startDate.valueOf());
    setEndDate(date.selection.endDate.valueOf());
  };

  const selectionRange = {
    startDate: dateRange?.startDate,
    endDate: dateRange?.endDate,
    key: "selection",
  };

  return (
    <>
      <div className="mainContainer">
        <div className="subContainer">
          <DateRangePicker ranges={[selectionRange]} onChange={handleSelect} />
          <div className="barData">
            <BarChart width={400} height={200} data={barData}>
              <Bar dataKey="impressions_offered" fill="#33aa22" />
              <Tooltip />
              <XAxis dataKey="appSiteId" fill="#8884d8" />
              <YAxis />
            </BarChart>
          </div>
          <div>
            <PieChart width={400} height={300}>
              <Pie
                dataKey="CM001"
                isAnimationActive={false}
                data={pieData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#22aa00"
                label
              />
              <Tooltip />
            </PieChart>
          </div>
        </div>
        <div className="tableData">
          <MaterialTable
            columns={[
              { title: "Publisher Id", field: "publisherId" },
              { title: "Impressions Offered", field: "impressions_offered" },
            ]}
            data={tableData}
            title="Table"
            options={{
              sorting: true,
              search: true,
              maxBodyHeight: 300,
              paginationType: "stepped",
              showFirstLastPageButtons: false,
            }}
          />
        </div>
      </div>
    </>
  );
}
