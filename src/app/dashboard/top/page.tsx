"use client";

import PageLoader from "@/components/page-loader";
import { TopArtistComp, TopTrackComp } from "@/components/top";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

const Page = () => {
  const tabs = ["Tracks", "Artists"];
  const durations = ["4 weeks", "6 months", "1 year"];
  const [tab, setTab] = useState("tracks");
  const [duration, setDuration] = useState("4 weeks");
  const [loading, setLoading] = useState(false);

  if (loading) return <PageLoader fullScreen />;

  return (
    <div className="flex flex-col gap-4 p-4">
      <h2 className="text-main text-2xl md:text-3xl font-medium">
        Your top {tab}
      </h2>

      <div className="flex gap-4">
        <Tabs defaultValue={tab} className="w-fit">
          <TabsList className="grid w-full grid-cols-2">
            {tabs.map((t, i) => (
              <TabsTrigger
                value={t.toLowerCase()}
                onClick={() => setTab(t.toLowerCase())}
                key={i}
              >
                {t}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        <Tabs defaultValue={duration} className="w-fit">
          <TabsList className="w-full">
            {durations.map((d, i) => (
              <TabsTrigger value={d} onClick={() => setDuration(d)} key={i}>
                {d}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"></div>
    </div>
  );
};

export default Page;
