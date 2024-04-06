"use client";
import { Card } from "@material-tailwind/react";
import { Sidebar } from "@/components/Sidebar";
import React from "react";
import { ChatboxTextarea } from "@/components/Chatbox";
import { Chatbubble } from "@/components/Chatbubble";
const page = () => {
  const [childData, setChildData] = React.useState("");

  function CallBack(data: any) {
    setChildData(data);
    console.log(data);
  }

  return (
    <div className='flex justify-between'>
      <Sidebar />
      <Card className='w-full max-w-[calc(100%-20rem)] p-4 shadow-xl bg-[#242528] my-8 mr-8 grid grid-cols-4 divide-gray-800 divide-x-[1px]'>
        <div className='flex flex-col justify-between col-span-3 p-4 mb-2'>
          {childData ? <Chatbubble message={childData} /> : <div></div>}
          <ChatboxTextarea handleCallBack={CallBack} />
        </div>
        <div></div>
      </Card>
    </div>
  );
};

export default page;
