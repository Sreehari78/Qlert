// Importing necessary components from the Material Tailwind library
import React from "react";
import {
  Typography,
  Card,
  List,
  ListItem,
  ListItemSuffix,
  IconButton,
  ListItemPrefix,
} from "@material-tailwind/react";

// Function component for the Trash Icon
function TrashIcon() {
  return (
    // SVG for the trash icon
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 24 24'
      fill='currentColor'
      className='h-5 w-5'>
      <path
        fillRule='evenodd'
        d='M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z'
        clipRule='evenodd'
      />
    </svg>
  );
}

// Function component for the Rule List
export function RuleList(props: {
  ruleTableData: any[];
  onDelete: (index: string) => void;
}) {
  // Function to handle the deletion of a rule
  const handleDelete = (index: string) => {
    props.onDelete(index);
  };

  // Render the component
  return (
    // Card component to hold the list
    <Card className='mb-4 overflow-y-auto max-h-[23rem]'>
      <List>
        {/* Mapping over the ruleTableData to create a list item for each rule */}
        {props.ruleTableData.map(({ id, payload }) => {
          return (
            <ListItem key={id} className='p-0'>
              <ListItemPrefix>
                {/* Display the threshold of the rule */}
                <Typography color='blue-gray' className='font-medium p-2'>
                  {payload.threshold}
                </Typography>
              </ListItemPrefix>
              <label
                htmlFor='vertical-list-react'
                className='flex w-full cursor-pointer items-center px-3 py-2'>
                {/* Display the description of the rule */}
                <Typography color='blue-gray' className='font-medium'>
                  {payload.description}
                </Typography>

                <ListItemSuffix>
                  {/* Button to delete the rule */}
                  <IconButton
                    variant='text'
                    color='blue-gray'
                    onClick={() => handleDelete(id)}>
                    <TrashIcon />
                  </IconButton>
                </ListItemSuffix>
              </label>
            </ListItem>
          );
        })}
      </List>
    </Card>
  );
}

// Export the RuleList component as default
export default RuleList;
