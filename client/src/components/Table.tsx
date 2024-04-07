import {
  Card,
  Typography,
  CardBody,
  Chip,
  Avatar,
} from "@material-tailwind/react";

const TABLE_HEAD = [
  "Member",
  "Prompt",
  "Time",
  "Risk Level",
  "Risk Associated",
];

const TABLE_ROWS = [
  {
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg",
    name: "John Michael",
    email: "john@creative-tim.com",
    prompt:
      "Could you provide the main responsibilities of the individual with this email?",
    riskLevel: "low",
    riskAssociated: "blah blah blah",
  },
  {
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-2.jpg",
    name: "Alexa Liras",
    email: "alexa@creative-tim.com",
    prompt: "What's the specific department that this person oversees?",
    riskLevel: "high",
    riskAssociated: "blah blah blah",
  },
  {
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-1.jpg",
    name: "Laurent Perrier",
    email: "laurent@creative-tim.com",
    prompt: "Can you describe the projects this person is currently leading?",
    riskLevel: "low",
    riskAssociated: "blah blah blah",
  },
  {
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-4.jpg",
    name: "Michael Levi",
    email: "michael@creative-tim.com",
    prompt:
      "Please indicate the level of experience this person has in their field.",
    riskLevel: "high",
    riskAssociated: "blah blah blah",
  },
  {
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-5.jpg",
    name: "Richard Gran",
    email: "richard@creative-tim.com",
    prompt:
      "What unique skills or expertise does this person bring to the team?",
    riskLevel: "medium",
    riskAssociated: "blah blah blah",
  },
];

export function DataTable(props: { tableData: any[] }) {
  console.log(props.tableData);
  const colorPicker = (Risk_Level: string) => {
    switch (Risk_Level) {
      case "Low":
        return "green";
      case "Medium":
        return "yellow";
      case "High":
        return "red";
      default:
        return "blue-gray";
    }
  };

  return (
    <Card className='h-full w-full'>
      <CardBody className='overflow-scroll px-0'>
        <table className='w-full min-w-max table-auto text-left'>
          <thead className='top-0 sticky bg-blue-gray-200 z-10'>
            <tr>
              {TABLE_HEAD.map((head, index) => (
                <th
                  key={index}
                  className='border-y border-blue-gray-100 bg-blue-gray-50/50 p-4'>
                  <Typography
                    variant='small'
                    color='blue-gray'
                    className='font-normal leading-none opacity-70'>
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {props.tableData.map(
              (
                {
                  img,
                  User_ID,
                  Prompt,
                  Time_of_Prompting,
                  Risk_Level,
                  Risk_Associated,
                },
                index
              ) => {
                const isLast = index === props.tableData.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-2 border-b border-blue-gray-50";

                return (
                  <tr key={index}>
                    <td className={classes}>
                      <div className='flex items-center gap-3'>
                        <Avatar src={img} alt={User_ID} size='sm' />
                        <div className='flex flex-col'>
                          <Typography
                            variant='small'
                            color='blue-gray'
                            className='font-normal text-sm'>
                            {User_ID}
                          </Typography>
                          {/* <Typography
                            variant='small'
                            color='blue-gray'
                            className='font-normal opacity-70 text-[0.7rem]'>
                            {email}
                          </Typography> email here*/}
                        </div>
                      </div>
                    </td>
                    <td className={classes}>
                      <div className='flex flex-col'>
                        <Typography
                          variant='small'
                          color='blue-gray'
                          className='font-normal'>
                          {Prompt}
                        </Typography>
                      </div>
                    </td>
                    <td className={classes}>
                      <div className='flex flex-col'>
                        <Typography
                          variant='small'
                          color='blue-gray'
                          className='font-normal'>
                          {Time_of_Prompting}
                        </Typography>
                      </div>
                    </td>
                    <td className={classes}>
                      <div className='w-max'>
                        <Chip
                          variant='ghost'
                          size='sm'
                          value={Risk_Level}
                          color={colorPicker(Risk_Level)}
                        />
                      </div>
                    </td>
                    <td className={classes}>
                      <div className='flex flex-col'>
                        <Typography
                          variant='small'
                          color='blue-gray'
                          className='font-normal'>
                          {Risk_Associated}
                        </Typography>
                      </div>
                    </td>
                  </tr>
                );
              }
            )}
          </tbody>
        </table>
      </CardBody>
    </Card>
  );
}
