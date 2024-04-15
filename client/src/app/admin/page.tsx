"use client";
import { Card } from "@material-tailwind/react";
import { Sidebar } from "@/components/Sidebar";
import React, { useEffect } from "react";
import LineGraph from "@/components/Graph";
import { DataTable } from "@/components/Table";
import RuleList from "@/components/Rulelist";
import { ChatboxTextarea } from "@/components/Chatbox";
import { send } from "process";

const page = () => {
  const [logTableData, setLogTableData] = React.useState([]);
  const [ruleTableData, setRuleTableData] = React.useState([]);
  const [graphData, setGraphData] = React.useState<{ [key: string]: number }>();
  const [deleteFlag, setDeleteFlag] = React.useState(false);

  function CallBack(text: string) {
    sendText(text);
  }

  const sendText = async (input: string) => {
    try {
      const response = await fetch("http://127.0.0.1:5000/get_new_rule", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: input,
        }),
      });

      if (response.ok) {
        const jsonData = await response.json();
        console.log(jsonData.output);
      } else {
        console.error("Failed to upload");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchRuleData();
  }, [deleteFlag]);

  const fetchRuleData = async () => {
    try {
      const ruleResponse = await fetch("http://127.0.0.1:5000/get_rules");
      const ruleData = await ruleResponse.json();
      setRuleTableData(ruleData.output);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchData = async () => {
    try {
      const logResponse = await fetch("http://localhost:3000/api/getLogTable");
      const logData = await logResponse.json();
      setLogTableData(logData.message);

      const graphResponse = await fetch(
        "http://localhost:3000/api/getGraphData"
      );
      const graphData = await graphResponse.json();
      setGraphData(graphData.graphData);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteItem = async (id: number) => {
    const newData = [...ruleTableData];
    newData.splice(id, 1);
    console.log(newData);
    setRuleTableData([]);
    setRuleTableData(newData);
    setDeleteFlag(!deleteFlag);

    try {
      await fetch(`http://localhost:3000/api/getUpdateRuleTable?point=${id}`, {
        method: "GET",
      });
    } catch (error) {
      console.error("Error deleting points:", error);
    }
  };

  return (
    <div className='flex justify-between gap-10 h-screen'>
      <Sidebar />
      <Card className='w-full align-middle p-4 shadow-xl bg-[#242528] lg:my-8 lg:mr-8 grid grid-cols-2 grid-rows-2 gap-4'>
        <LineGraph graphData={graphData ?? {}} />
        <div>
          <RuleList ruleTableData={ruleTableData} onDelete={handleDeleteItem} />

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
