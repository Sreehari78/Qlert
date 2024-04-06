import React from "react";

export function Chatbubble(props: { message: string }) {
  return (
    <div className='text-white bg-[#151619] p-4 rounded-2xl w-fit'>
      {props.message}
    </div>
  );
}
