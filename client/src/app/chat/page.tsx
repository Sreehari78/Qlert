"use client";
import { Card } from "@material-tailwind/react";
import { Sidebar } from "@/components/Sidebar";
import React from "react";
import { ChatboxTextarea } from "@/components/Chatbox";
import { Chatbubble } from "@/components/Chatbubble";

interface msg {
  client: string;
  server: string;
}

const page = () => {
  const [childData, setChildData] = React.useState<msg[]>([]);
  const chat: msg = { client: "", server: "" };

  function CallBack(text: string) {
    handleQdrant(text);
  }

  const handleQdrant = async (input: string) => {
    chat.client = input;

    try {
      const response = await fetch("http://127.0.0.1:5000/get_response", {
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
        if (jsonData.output) {
          chat.server = jsonData.output;

          const data: msg[] = [...childData, chat];

          setChildData(data);
          console.log(data);
        }
      } else {
        console.error("Failed to upload");
      }
    } catch (error) {
      console.error("Error during upload:", error);
    }
  };

  return (
    <div className="flex justify-between">
      <Sidebar />
      <Card className="w-full max-w-[calc(100%-20rem)] p-4 shadow-xl bg-[#242528] my-8 mr-8 grid grid-cols-4 divide-gray-800 divide-x-[1px]">
        <div className="flex flex-col justify-between col-span-3 p-4 mb-2">
          <div className=" max-h-[70vh] overflow-y-auto">
            {childData.length ? (
              childData.map((chat, index) => (
                <div key={index}>
                  <div className="flex justify-end">
                    <Chatbubble
                      message={chat.client}
                      borderRadius="rounded-l-2xl rounded-b-2xl"
                    />
                  </div>
                  <div className="flex justify-start ">
                    <Chatbubble
                      message={chat.server}
                      borderRadius="rounded-r-2xl rounded-b-2xl"
                    />
                  </div>
                </div>
              ))
            ) : (
              <div></div>
            )}
          </div>

          <ChatboxTextarea handleCallBack={CallBack} attach={false} />
        </div>
        <div></div>
      </Card>
    </div>
  );
};

export default page;
