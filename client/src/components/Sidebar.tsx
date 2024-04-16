"use client";
import { Card, List, ListItem, ListItemPrefix } from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  InboxIcon,
  PowerIcon,
  ChatBubbleBottomCenterIcon,
} from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";

export function Sidebar() {
  return (
    <Card className="h-screen w-full max-w-[18rem] p-6 shadow-xl bg-[#151619]">
      <div className="mb-2 p-4">
        <Image
          src="/logo-color.svg"
          width={125}
          height={100}
          alt="Qlert"
          priority
        />
      </div>
      <List className="text-[#fffdff] ">
        <Link href="./chat">
          <ListItem>
            <ListItemPrefix>
              <ChatBubbleBottomCenterIcon className="h-8 w-8" />
            </ListItemPrefix>
            Chat
          </ListItem>
        </Link>
        <Link href="./admin">
          <ListItem>
            <ListItemPrefix>
              <PresentationChartBarIcon className="h-8 w-8" />
            </ListItemPrefix>
            Admin
          </ListItem>
        </Link>
        <ListItem>
          <ListItemPrefix>
            <Image
              src="/chatgpt-icon.svg"
              width={30}
              height={30}
              alt="ChatGPT"
            />
          </ListItemPrefix>
          ChatGPT
        </ListItem>
        <ListItem>
          <ListItemPrefix>
            <Image
              src="/google-gemini-icon.svg"
              width={30}
              height={30}
              alt="ChatGPT"
            />
          </ListItemPrefix>
          Gemini
        </ListItem>
        <ListItem>
          <ListItemPrefix>
            <Image
              src="/copilot-icon.svg"
              width={30}
              height={30}
              alt="ChatGPT"
            />
          </ListItemPrefix>
          Copilot
        </ListItem>
        <ListItem>
          <ListItemPrefix>
            <Image
              src="/claude-ai-icon.svg"
              width={30}
              height={30}
              alt="ChatGPT"
            />
          </ListItemPrefix>
          Calude AI
        </ListItem>
      </List>
    </Card>
  );
}
