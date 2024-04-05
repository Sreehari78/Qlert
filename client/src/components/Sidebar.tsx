"use client";
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  InboxIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";
import Image from "next/image";

export function Sidebar() {
  return (
    <Card className='h-screen w-full max-w-[18rem] p-6 shadow-xl bg-[#151619]'>
      <div className='mb-2 p-4'>
        <Image
          src='/logo-color.svg'
          width={125}
          height={100}
          alt='Qlert'
          priority
        />
      </div>
      <List className='text-[#fffdff] '>
        <ListItem>
          <ListItemPrefix>
            <PresentationChartBarIcon className='h-5 w-5' />
          </ListItemPrefix>
          Dashboard
        </ListItem>
        <ListItem>
          <ListItemPrefix>
            <ShoppingBagIcon className='h-5 w-5' />
          </ListItemPrefix>
          E-Commerce
        </ListItem>
        <ListItem>
          <ListItemPrefix>
            <InboxIcon className='h-5 w-5' />
          </ListItemPrefix>
          Inbox
        </ListItem>
        <ListItem>
          <ListItemPrefix>
            <UserCircleIcon className='h-5 w-5' />
          </ListItemPrefix>
          Profile
        </ListItem>
        <ListItem>
          <ListItemPrefix>
            <Cog6ToothIcon className='h-5 w-5' />
          </ListItemPrefix>
          Settings
        </ListItem>
        <ListItem>
          <ListItemPrefix>
            <PowerIcon className='h-5 w-5' />
          </ListItemPrefix>
          Log Out
        </ListItem>
      </List>
    </Card>
  );
}
