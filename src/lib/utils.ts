import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import crypto from "crypto";

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

export const generateRandomString = (length: number) =>
  crypto.randomBytes(60).toString("hex").slice(0, length);

export const stringifyQuery = (data: any) => {
  const arr = [];

  for (const i in data) arr.push(`${i}=${encodeURIComponent(data[i])}`);

  return arr.join("&");
};

export const msToHMS = (milliseconds: number) => {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  let timeString = "";

  if (hours > 0) {
    timeString += hours + ":";
  }

  const minutesString =
    hours === 0 ? String(minutes) : String(minutes).padStart(2, "0"); // Key change here
  const secondsString = String(seconds).padStart(2, "0");

  timeString += minutesString + ":" + secondsString;

  return timeString;
};

export const getTimeSince = (isoString: string) => {
  const pastDate = new Date(isoString);
  const now = new Date(); // Get current time
  const milliseconds = now.getTime() - pastDate.getTime(); // Calculate the difference

  if (isNaN(milliseconds)) {
    return "Invalid date";
  }

  const seconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30); // Approximate
  const years = Math.floor(days / 365); // Approximate

  if (years > 0) {
    return years + "y";
  } else if (months > 0) {
    return months + "mo";
  } else if (weeks > 0) {
    return weeks + "w";
  } else if (days > 0) {
    return days + "d";
  } else if (hours > 0) {
    return hours + "h";
  } else if (minutes > 0) {
    return minutes + "m";
  } else {
    return "less than a minute";
  }
};
