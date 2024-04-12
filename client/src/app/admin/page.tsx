"use client";
import { Card } from "@material-tailwind/react";
import { Sidebar } from "@/components/Sidebar";
import React, { useEffect } from "react";
import LineGraph from "@/components/Graph";
import { DataTable } from "@/components/Table";
import RuleList from "@/components/Rulelist";
import { ChatboxTextarea } from "@/components/Chatbox";

const page = () => {
  const [logTableData, setLogTableData] = React.useState([]);
  const [ruleTableData, setRuleTableData] = React.useState([]);
  const [childData, setChildData] = React.useState<string[]>([]);
  const [graphData, setGraphData] = React.useState<{ [key: string]: number }>();

  function CallBack(text: string) {
    const data: string[] = [...childData, text];
    setChildData(data);
    console.log(data);
  }

  useEffect(() => {
    try {
      fetch("http://localhost:3000/api/getLogTable")
        .then((res) => res.json())
        .then((data) => setLogTableData(data.message));

      fetch("http://localhost:3000/api/getRuleTable")
        .then((res) => res.json())
        .then((data) => setRuleTableData(data.message));

      fetch("http://localhost:3000/api/getGraphData")
        .then((res) => res.json())
        .then((data) => setGraphData(data.graphData));
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <div className='flex justify-between gap-10 h-screen'>
      <Sidebar />
      <Card className='w-full align-middle p-4 shadow-xl bg-[#242528] my-8 mr-8 grid grid-cols-2 grid-rows-2 gap-4'>
        <LineGraph graphData={graphData} />
        <div>
          <RuleList ruleTableData={ruleTableData} />

          <ChatboxTextarea handleCallBack={CallBack} />
        </div>

        <div className='col-span-2'>
          <DataTable logTableData={logTableData} />
        </div>
      </Card>
    </div>
  );
};

export default page;
