"use client";
import { Textarea, IconButton, Tooltip } from "@material-tailwind/react";
import { handleClientScriptLoad } from "next/script";
import { useState } from "react";

interface Props {
  handleCallBack: (message: string) => void;
}

export function ChatboxTextarea(props: Props) {
  const [message, setMessage] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const handleButtonClick = async () => {
    if (message === "") return;
    props.handleCallBack(message);
    setMessage(""); // Clear textarea after button click
  };

  const handleMessageChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setMessage(event.target.value);
  };

  const handleEnterPress = (
    event: React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleButtonClick();
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLInputElement>) => {
    event.preventDefault();
    if (!file) return;

    try {
      const data = new FormData();
      data.set("file", file);

      const res = await fetch("http://localhost:3000/api/getPdfData", {
        method: "POST",
        body: data,
      });
      if (res.ok) console.log("File uploaded");
    } catch (error: any) {
      console.error("error");
    }
  };

  return (
    <div className='flex w-full flex-row items-center gap-2 rounded-[99px] border border-gray-400/10 bg-gray-400/5 p-2'>
      <div className='flex'>
        <form onSubmit={handleSubmit}>
          <input
            type='file'
            id='file'
            onChange={(event) => {
              setFile(event.target.files?.item(0) ?? null);
            }}
          />
          <input type='submit' value='upload' />
          <Tooltip
            content='Attach'
            animate={{
              mount: { scale: 1, y: 0 },
              unmount: { scale: 0, y: 25 },
            }}>
            <IconButton variant='text' className='rounded-full'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'
                stroke='gray'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'>
                <path d='M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48'></path>
              </svg>
            </IconButton>
          </Tooltip>
        </form>
      </div>
      <Textarea
        rows={1}
        // resize={true}
        placeholder='Your Message'
        className='min-h-full !border-0 focus:border-transparent text-lg text-white'
        value={message}
        onChange={handleMessageChange}
        onKeyDown={handleEnterPress}
        containerProps={{
          className: "grid h-full",
        }}
        labelProps={{
          className: "before:content-none after:content-none",
        }}
      />

      <div onClick={handleButtonClick}>
        <IconButton
          variant='text'
          className='rounded-full bg-[#007fff] hover:bg-[#005dff] active:bg-[#0058b2]'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
            strokeWidth={2}
            className='h-5 w-5'>
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5'
            />
          </svg>
        </IconButton>
      </div>
    </div>
  );
}
