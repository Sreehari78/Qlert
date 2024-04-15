"use client";
import { Card, CardBody } from "@material-tailwind/react";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function LineGraph(props: {
  graphData: { [key: string]: number };
}) {
  const [windowHeight, setWindowHeight] = useState<number>(0);

  useEffect(() => {
    if (windowHeight < 600) setWindowHeight(400);
    else if (windowHeight >= 600 && windowHeight < 1024) setWindowHeight(300);
    else setWindowHeight(425);
  }, []);

  console.log(windowHeight);

  let xaxis: string[] = [];
  let values: number[] = [];
  for (const key in props.graphData) {
    xaxis.push(key);
    values.push(props.graphData[key]);
  }

  const chartConfig = {
    type: "area",
    height: windowHeight,
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
  return (
    <Card>
      <CardBody className='px-2 pb-0'>
        <Chart {...chartConfig} />
      </CardBody>
    </Card>
  );
}
