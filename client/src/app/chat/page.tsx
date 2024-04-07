"use client";
import { Card } from "@material-tailwind/react";
import { Sidebar } from "@/components/Sidebar";
import React from "react";
import { ChatboxTextarea } from "@/components/Chatbox";
import { Chatbubble } from "@/components/Chatbubble";
const page = () => {
  const [childData, setChildData] = React.useState<string[]>([]);
  const [responseData, setResponseData] = React.useState("");

  function CallBack(text: string) {
    const data: string[] = [...childData, text];
    setChildData(data);
    console.log(data);
    handleQdrant();
  }

  const handleQdrant = async () => {
    try {
      const response = await fetch("http://localhost:5000/get_response", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages: childData }),
      });

      // Check if the request was successful
      if (response.ok) {
        const jsonData = await response.json();
        console.log(jsonData.result);
        if (jsonData.result) {
          setResponseData(jsonData.result);
        }
      } else {
        console.error("Failed to upload");
      }
    } catch (error) {
      console.error("Error during upload:", error);
    }
  };

  return (
    <div className='flex justify-between'>
      <Sidebar />
      <Card className='w-full max-w-[calc(100%-20rem)] p-4 shadow-xl bg-[#242528] my-8 mr-8 grid grid-cols-4 divide-gray-800 divide-x-[1px]'>
        <div className='flex flex-col justify-between col-span-3 p-4 mb-2'>
          <div className=''>
            {childData.length ? (
              childData.map((text, index) => (
                <div key={index}>
                  <div className='flex justify-end'>
                    <Chatbubble message={text} />
                  </div>
                  <div className='flex justify-start'>
                    <Chatbubble message={responseData} />
                  </div>
                </div>
              ))
            ) : (
              <div></div>
            )}
          </div>

          <ChatboxTextarea handleCallBack={CallBack} />
        </div>
        <div></div>
      </Card>
    </div>
  );
};

export default page;
