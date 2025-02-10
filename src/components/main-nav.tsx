"use client";

import { type LucideIcon } from "lucide-react";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";

const MainNav = ({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon: LucideIcon;
  }[];
}) => {
  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      {/* <SidebarGroupLabel>Projects</SidebarGroupLabel> */}
      <SidebarMenu>
        {items.map((item, i) => (
          <SidebarMenuItem key={i}>
            <SidebarMenuButton asChild size="default">
              <Link href={item.url}>
                <item.icon />
                <span>{item.title}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
};

export { MainNav };
