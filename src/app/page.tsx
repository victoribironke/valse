import { PAGES } from "@/constants/constants";
import { redirect } from "next/navigation";

const Home = () => {
  redirect(PAGES.dashboard);
};

export default Home;
