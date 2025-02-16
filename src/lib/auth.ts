import { PAGES } from "@/constants/constants";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";
import { cookies } from "next/headers";

export const logOut = () => {
  localStorage.removeItem("spotify_auth_data");

  redirect(PAGES.auth);
};

export const getAccessToken = async (code: string, push: any) => {
  try {
    const res = await fetch("/api/get-access-token?code=" + code, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();

    localStorage.setItem("spotify_auth_data", JSON.stringify(data.data));

    push(PAGES.dashboard);
  } catch (e) {
    console.log(e);
    toast.error("A server error occured.");
  }
};

export const saveNewUser = async (token: string) => {
  try {
    const res = await fetch("/api/save-new-user?token=" + token, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();

    localStorage.setItem("valse_user_data", JSON.stringify(data.userData));

    return { error: null };
  } catch (e) {
    return { error: e };
  }
};
