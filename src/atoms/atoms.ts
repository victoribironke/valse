import { User } from "@/types/auth";
import { atom } from "recoil";

export const user = atom<User | null>({
  key: "user",
  default: null,
});
