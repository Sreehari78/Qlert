"use client";
import { Card } from "@material-tailwind/react";
import { Sidebar } from "@/components/Sidebar";
import React from "react";
import LineGraph from "@/components/Graph";
import { DataTable } from "@/components/Table";

const page = () => {
  return (
    <div className='flex justify-between gap-10 h-screen'>
      <Sidebar />
      <Card className='w-full align-middle p-4 shadow-xl bg-[#242528] my-8 mr-8 grid grid-cols-2 grid-rows-2 gap-4'>
        <LineGraph />
        <DataTable />
      </Card>
    </div>
  );
};

export default page;
