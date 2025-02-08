import PageLoader from "@/components/general/PageLoader";
import { db } from "@/services/firebase";
import { Incident } from "@/types/dashboard";
import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import {
  TbProgress,
  TbProgressAlert,
  TbProgressBolt,
  TbProgressCheck,
} from "react-icons/tb";

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState({
    all: 0,
    reported: 0,
    inProgress: 0,
    resolved: 0,
  });

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "incidents"), (d) => {
      const data = d.docs.map((doc) => doc.data() as Incident);

      let inProgress = 0,
        reported = 0,
        resolved = 0;

      for (let i = 0; i < data.length; i++) {
        if (data[i].status === "in_progress") inProgress++;
        if (data[i].status === "reported") reported++;
        if (data[i].status === "resolved") resolved++;
      }

      setSummary({
        all: data.length,
        inProgress,
        reported,
        resolved,
      });
      setLoading(false);
    });

    return unsub;
  }, []);

  if (loading) return <PageLoader type="small" />;

  return (
    <section className="w-full max-w-[1440px] flex flex-col gap-4">
      <h1 className="font-bold text-2xl">INCIDENTS SUMMARY</h1>

      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 items-start">
        <div className="flex border rounded-xl shadow overflow-hidden p-4">
          <div className="flex flex-col gap-6 w-2/3">
            <p className="text-5xl font-bold text-main">{summary.all}</p>
            <p className="text-gray-500 font-medium">All</p>
          </div>

          <div className="bg-white border shadow-sm w-1/3 grid place-items-center rounded-lg">
            <TbProgress className="text-main text-4xl" />
          </div>
        </div>

        <div className="flex border rounded-xl shadow overflow-hidden p-4">
          <div className="flex flex-col gap-6 w-2/3">
            <p className="text-5xl font-bold text-red">{summary.reported}</p>
            <p className="text-gray-500 font-medium">Reported</p>
          </div>

          <div className="bg-white border shadow-sm w-1/3 grid place-items-center rounded-lg">
            <TbProgressAlert className="text-red text-4xl" />
          </div>
        </div>

        <div className="flex border rounded-xl shadow overflow-hidden p-4">
          <div className="flex flex-col gap-6 w-2/3">
            <p className="text-5xl font-bold text-yellow">
              {summary.inProgress}
            </p>
            <p className="text-gray-500 font-medium">In progress</p>
          </div>

          <div className="bg-white border shadow-sm w-1/3 grid place-items-center rounded-lg">
            <TbProgressBolt className="text-yellow text-4xl" />
          </div>
        </div>

        <div className="flex border rounded-xl shadow overflow-hidden p-4">
          <div className="flex flex-col gap-6 w-2/3">
            <p className="text-5xl font-bold text-green">{summary.resolved}</p>
            <p className="text-gray-500 font-medium">Resolved</p>
          </div>

          <div className="bg-white border shadow-sm w-1/3 grid place-items-center rounded-lg">
            <TbProgressCheck className="text-green text-4xl" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
