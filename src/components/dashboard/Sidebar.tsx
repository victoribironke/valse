import { PAGES } from "@/constants/constants";
import { SidebarProps } from "@/types/dashboard";
import Link from "next/link";
import { useRouter } from "next/router";
import { FiLogOut, FiPlus } from "react-icons/fi";
import { MdKeyboardDoubleArrowLeft, MdPerson } from "react-icons/md";
import { auth } from "@/services/firebase";
import toast from "react-hot-toast";
import { cn, getValueFromTitle } from "@/lib/utils";
import { Button } from "../ui/button";
import { FaAngleRight } from "react-icons/fa6";
import { IoMail } from "react-icons/io5";
import { useState } from "react";
import { GoHomeFill } from "react-icons/go";
import NewUser from "./users/NewUser";
import NewIncident from "./incidents/NewIncident";
import { user } from "@/atoms/atoms";
import { TbReport } from "react-icons/tb";
import { useRecoilValue } from "recoil";

const Sidebar = ({ show, setShow }: SidebarProps) => {
  const { push, asPath } = useRouter();
  const userInfo = useRecoilValue(user);

  const signOutUser = async () => {
    try {
      await auth.signOut();

      push(PAGES.login);
    } catch (e) {
      toast.error("An error occured.");
    }
  };

  return (
    <div
      className={cn(
        "w-64 sm:w-[19rem] self-start bg-white h-screen overflow-scroll p-2 absolute z-20 sm:z-0 sm:translate-x-0 sm:static flex flex-col border transition-all duration-200 ease-[ease-in-out] gap-1",
        show ? "translate-x-0" : "-translate-x-full"
      )}
    >
      <Button
        onClick={setShow}
        className="bg-blue text-black py-1 px-3 rounded-md sm:hidden w-fit mb-4 self-end text-lg hover:bg-white"
      >
        <MdKeyboardDoubleArrowLeft className="text-black" />
      </Button>

      <Link href={PAGES.dashboard}>
        <Button
          className={cn(
            "w-full flex items-center justify-start gap-2 py-1 px-4 rounded-lg text-left hover:text-main hover:bg-gray-100",
            PAGES.dashboard === asPath
              ? "bg-gray-100 text-main"
              : "text-black bg-white"
          )}
        >
          <GoHomeFill />
          <p>Dashboard</p>
        </Button>
      </Link>

      <p className="px-3 mt-10 mb-2 text-sm text-gray-800 font-bold">
        INCIDENTS
      </p>

      <div className="flex flex-col gap-1">
        <NewIncident />

        <Link href={PAGES.incidents}>
          <Button
            className={cn(
              "w-full flex items-center justify-start gap-2 py-1 px-4 rounded-lg text-left hover:text-main hover:bg-gray-100",
              PAGES.incidents === asPath
                ? "bg-gray-100 text-main"
                : "text-black bg-white"
            )}
          >
            <TbReport />
            <p>All incidents</p>
          </Button>
        </Link>
      </div>

      {userInfo?.role === "admin" && (
        <>
          <p className="px-3 mt-10 mb-2 text-sm text-gray-800 font-bold">
            USERS
          </p>

          <div className="flex flex-col gap-1">
            <NewUser />

            <Link href={PAGES.users}>
              <Button
                className={cn(
                  "w-full flex items-center justify-start gap-2 py-1 px-4 rounded-lg text-left hover:text-main hover:bg-gray-100",
                  PAGES.users === asPath
                    ? "bg-gray-100 text-main"
                    : "text-black bg-white"
                )}
              >
                <MdPerson />
                <p>Manage users</p>
              </Button>
            </Link>
          </div>
        </>
      )}

      {/* <Link href="" className="mt-auto">
        <Button className="w-full flex items-center justify-start gap-2 px-4 rounded-lg text-left text-black bg-white hover:text-main hover:bg-gray-100">
          <IoMail />
          <p>Contact support</p>
        </Button>
      </Link> */}

      <Button
        className="w-full flex items-center mt-auto justify-start gap-2 px-4 rounded-lg text-left text-black bg-white hover:text-red-600 hover:bg-gray-100"
        onClick={signOutUser}
      >
        <FiLogOut />
        <p>Sign out</p>
      </Button>
    </div>
  );
};

export default Sidebar;
