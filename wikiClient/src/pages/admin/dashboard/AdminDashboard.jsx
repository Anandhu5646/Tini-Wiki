import React, { useEffect, useState } from "react";
import axios from "axios";
import ApexCharts from "react-apexcharts";
import "./Dashboard.css";

const AdminDashboard = () => {
  const [count, setCount] = useState(0);
  const [mostSearchedTerm, setMostSearchedTerm] = useState({
    searchTerm: "No searches yet",
    count: 0,
  });
  const [chartOptions, setChartOptions] = useState({
    series: [
      {
        name: "Total Searches",
        data: [0],
      },
      {
        name: "Most Searched Term",
        data: [0],
      },
    ],
    chart: {
      height: 350,
      type: "bar",
    },
    plotOptions: {
      bar: {
        borderRadius: 5,
        dataLabels: {
          position: "top",
        },
      },
    },
    dataLabels: {
      enabled: true,
      formatter: function (val) {
        return val;
      },
      offsetY: -20,
      style: {
        fontSize: "12px",
        colors: ["#304758"],
      },
    },
    xaxis: {
      categories: ["Total Searches", "Most Searched Term"],
      position: "top",
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      tooltip: {
        enabled: false,
      },
    },
    yaxis: {
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        show: false,
        formatter: function (val) {
          return val;
        },
      },
    },
  });
  const [pieChartLabels, setPieChartLabels] = useState([]);
  const [pieChartOptions, setPieChartOptions] = useState({
    series: [0],
    chart: {
      width: 380,
      type: "pie",
    },
    labels: ["Most Searched Term"],
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  });
  const getCount = async () => {
    try {
      const response = await axios.get("/admin/");

      console.log(response.data, "rrrrrrrrrrrr");
      setCount(response.data.totalSearches);

      // Check if mostSearchedTerm is defined
      if (
        response.data.mostSearchedTerm &&
        response.data.mostSearchedTerm.length > 0
      ) {
        setMostSearchedTerm({
          searchTerm:
            response.data.mostSearchedTerm[0]?.searchTerm || "No searches yet",
          count: response.data.mostSearchedTerm[0]?.count || 0,
        });
      }

      const searchTermCounts = response.data.searchTermCounts || [];
      const pieChartData = searchTermCounts.map((entry) => entry.count);
      const pieChartLabels = searchTermCounts.map((entry) => entry.searchTerm);

      setChartOptions({
        ...chartOptions,
        series: [{ data: [response.data.totalSearches, ...pieChartData] }],
      });

      setPieChartOptions({
        ...pieChartOptions,
        series: pieChartData,
        labels: [...pieChartLabels],
      });
      //   setPieChartLabels(pieChartLabels);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getCount();
  }, []);
const handleLogout=async ()=>{
    try {
       
        const response = await axios.post("/admin/logout");
        if (response.data.success) {
    
          console.log("Logout successful");
          window.location.href = "/";
        } else {
          console.error("Logout failed:", response.data.error);
        }
      } catch (err) {
        console.error("Error:", err);
      }
}
  return (
    <div className="dashboard-container">
      <div className="navbar">
        <h1>Dashboard</h1>
        <button onClick={handleLogout}>
          <h4>Logout</h4>
        </button>
      </div>

      <div className="charts">
        <div className="chart-container1">
          <h2>Total Searches</h2>
          <ApexCharts
            options={chartOptions}
            series={chartOptions.series}
            type="bar"
            height={380}
          />
        </div>
        <div className="chart-container2">
          <h2>Most Searched Term</h2>
          <ApexCharts
            options={pieChartOptions}
            series={pieChartOptions.series}
            type="pie"
            height={380}
          />
        </div>
        <div className="search-terms">
          {pieChartLabels.map((label, index) => (
            <div key={index}>{label}</div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
