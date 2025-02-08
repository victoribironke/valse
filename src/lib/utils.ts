import { Status } from "@/types/dashboard";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import {
  TbProgress,
  TbProgressAlert,
  TbProgressBolt,
  TbProgressCheck,
} from "react-icons/tb";

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

export const isValidEmail = (email: string) =>
  /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/.test(email);

export const getValueFromTitle = (title: string) =>
  title.toLowerCase().split(" ").join("-");

export const getClassNamesByStatus = (status: Status) => {
  const base =
    "text-white py-1 pl-2 pr-3 rounded-full w-fit flex items-center justify-center gap-1.5";

  if (status === "reported")
    return {
      main: base + " " + "bg-red",
      icon: TbProgressAlert,
    };

  if (status === "in_progress")
    return {
      main: base + " " + "bg-yellow",
      icon: TbProgressBolt,
    };

  if (status === "resolved")
    return {
      main: base + " " + "bg-green",
      icon: TbProgressCheck,
    };

  return { main: base + " " + "bg-gray-400", icon: TbProgress };
};
