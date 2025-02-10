import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import crypto from "crypto";

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

export const generateRandomString = (length: number) =>
  crypto.randomBytes(60).toString("hex").slice(0, length);

export const stringifyQuery = (data: any) => {
  const arr = [];

  for (let i in data) arr.push(`${i}=${encodeURIComponent(data[i])}`);

  return arr.join("&");
};
