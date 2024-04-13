import React from "react";

export function Chatbubble(props: { message: string; borderRadius: string }) {
  return (
    <div
      className={`text-white bg-[#151619] p-4 ${props.borderRadius} w-fit mb-2 `}>
      {props.message}
    </div>
  );
}
