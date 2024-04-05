import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { PencilIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Tabs,
  TabsHeader,
  Tab,
  Avatar,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";

const TABS = [
  {
    label: "All",
    value: "all",
  },
  {
    label: "Monitored",
    value: "monitored",
  },
  {
    label: "Unmonitored",
    value: "unmonitored",
  },
];

const TABLE_HEAD = ["Member", "Prompt", "Risk Level"];

const TABLE_ROWS = [
  {
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg",
    name: "John Michael",
    email: "john@creative-tim.com",
    prompt:
      "Could you provide the main responsibilities of the individual with this email?",
    riskLevel: "low",
  },
  {
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-2.jpg",
    name: "Alexa Liras",
    email: "alexa@creative-tim.com",
    prompt: "What's the specific department that this person oversees?",
    riskLevel: "high",
  },
  {
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-1.jpg",
    name: "Laurent Perrier",
    email: "laurent@creative-tim.com",
    prompt: "Can you describe the projects this person is currently leading?",
    riskLevel: "low",
  },
  {
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-4.jpg",
    name: "Michael Levi",
    email: "michael@creative-tim.com",
    prompt:
      "Please indicate the level of experience this person has in their field.",
    riskLevel: "high",
  },
  {
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-5.jpg",
    name: "Richard Gran",
    email: "richard@creative-tim.com",
    prompt:
      "What unique skills or expertise does this person bring to the team?",
    riskLevel: "medium",
  },
  {
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg",
    name: "John Michael",
    email: "john@creative-tim.com",
    prompt:
      "Could you elaborate on the professional achievements of this individual?",
    riskLevel: "medium",
  },
  {
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-2.jpg",
    name: "Alexa Liras",
    email: "alexa@creative-tim.com",
    prompt:
      "What are the key objectives of this person's role within the organization?",
    riskLevel: "high",
  },
  {
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-1.jpg",
    name: "Laurent Perrier",
    email: "laurent@creative-tim.com",
    prompt:
      "In what capacity does this person interact with clients or stakeholders?",
    riskLevel: "low",
  },
  {
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-4.jpg",
    name: "Michael Levi",
    email: "michael@creative-tim.com",
    prompt:
      "ProgramatorCan you specify the technology stack this person specializes in?",
    riskLevel: "low",
  },
  {
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-5.jpg",
    name: "Richard Gran",
    email: "richard@creative-tim.com",
    prompt:
      "Describe any leadership roles or initiatives undertaken by this individual.",
    riskLevel: "high",
  },
];

export function DataTable() {
  const colorPicker = (riskLevel: string) => {
    switch (riskLevel) {
      case "low":
        return "green";
      case "medium":
        return "yellow";
      case "high":
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
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
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
            {TABLE_ROWS.map(
              ({ img, name, email, prompt, riskLevel }, index) => {
                const isLast = index === TABLE_ROWS.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-2 border-b border-blue-gray-50";

                return (
                  <tr key={name}>
                    <td className={classes}>
                      <div className='flex items-center gap-3'>
                        <Avatar src={img} alt={name} size='sm' />
                        <div className='flex flex-col'>
                          <Typography
                            variant='small'
                            color='blue-gray'
                            className='font-normal text-sm'>
                            {name}
                          </Typography>
                          <Typography
                            variant='small'
                            color='blue-gray'
                            className='font-normal opacity-70 text-[0.7rem]'>
                            {email}
                          </Typography>
                        </div>
                      </div>
                    </td>
                    <td className={classes}>
                      <div className='flex flex-col'>
                        <Typography
                          variant='small'
                          color='blue-gray'
                          className='font-normal'>
                          {prompt}
                        </Typography>
                      </div>
                    </td>
                    <td className={classes}>
                      <div className='w-max'>
                        <Chip
                          variant='ghost'
                          size='sm'
                          value={riskLevel}
                          color={colorPicker(riskLevel)}
                        />
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
