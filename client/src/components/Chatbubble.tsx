// Import the React library
import React from "react";

// Define the properties for the Chatbubble component
interface Props {
  message: string; // The message to display in the chat bubble
  borderRadius: string; // The border radius for the chat bubble
}

// Define the Chatbubble component
export function Chatbubble(props: Props) {
  // Render the component
  return (
    // Create a div with the specified border radius, a dark background, padding, and margin
    // The w-fit class is used to make the width of the div fit its content
    <div
      className={`text-white bg-[#151619] p-4 ${props.borderRadius} w-fit mb-2 `}>
      {props.message} {/* Display the message */}
    </div>
  );
}
