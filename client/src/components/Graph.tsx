// Import necessary libraries and components
import { Card, CardBody } from "@material-tailwind/react";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

// Dynamically import the Chart component from react-apexcharts
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

// Define the LineGraph component
export default function LineGraph(props: {
  graphData: { [key: string]: number };
}) {
  // Define a state variable for the window height
  const [windowHeight, setWindowHeight] = useState<number>(0);

  // Use an effect to set the window height based on the inner height of the window
  useEffect(() => {
    if (window.innerHeight < 1024) setWindowHeight(325);
    else setWindowHeight(400);
  }, []);

  // Define arrays for the x-axis labels and the data values
  let xaxis: string[] = [];
  let values: number[] = [];

  // Populate the x-axis labels and data values from the graphData prop
  for (const key in props.graphData) {
    xaxis.push(key);
    values.push(props.graphData[key]);
  }

  // Define the configuration for the chart
  const chartConfig = {
    type: "area",
    height: 400,
    width: "100%",
    series: [
      {
        name: "Violations",
        data: values,
      },
    ],
    options: {
      chart: {
        toolbar: {
          show: false,
        },
      },
      title: {
        show: "",
      },
      dataLabels: {
        enabled: false,
      },
      colors: ["#020617"],
      stroke: {
        lineCap: "round",
        curve: "smooth",
      },
      markers: {
        size: 0,
      },
      xaxis: {
        axisTicks: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
        labels: {
          style: {
            colors: "#616161",
            fontSize: "12px",
            fontFamily: "inherit",
            fontWeight: 400,
          },
        },
        categories: xaxis,
      },
      yaxis: {
        labels: {
          style: {
            colors: "#616161",
            fontSize: "12px",
            fontFamily: "inherit",
            fontWeight: 400,
          },
        },
      },
      grid: {
        show: true,
        borderColor: "#dddddd",
        strokeDashArray: 5,
        xaxis: {
          lines: {
            show: true,
          },
        },
        padding: {
          top: 5,
          right: 20,
        },
      },
      fill: {
        opacity: 0.8,
      },
      tooltip: {
        theme: "dark",
      },
    },
  };

  // Render the LineGraph component
  return (
    <Card>
      <CardBody className='px-2 pb-0'>
        <Chart {...chartConfig} />
      </CardBody>
    </Card>
  );
}
