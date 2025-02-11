"use client";

import TopItemsPlaceholder from "@/components/top-items-placeholder";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGetTopItems } from "@/lib/spotify";
import { TopTrack } from "@/types/dashboard";
import { useEffect, useState } from "react";

const Page = () => {
  const durations = ["4 weeks", "6 months", "1 year"];
  const [duration, setDuration] = useState("4 weeks");
  const { data, isFetching, refetch } = useGetTopItems("tracks", duration);

  //   console.log(data);
  // if (loading) return <PageLoader fullScreen />;

  useEffect(() => {
    refetch();
  }, [duration]);

  return (
    <div className="flex flex-col gap-4 p-4">
      <h2 className="text-main text-2xl md:text-3xl font-medium">
        Your top tracks
      </h2>

      <Tabs defaultValue={duration} className="w-fit">
        <TabsList className="w-full">
          {durations.map((d, i) => (
            <TabsTrigger value={d} onClick={() => setDuration(d)} key={i}>
              {d}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>#</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Artist(s)</TableHead>
            <TableHead>Album</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {!isFetching
            ? data?.map((d, i) => (
                <TableRow key={i}>
                  <TableCell>{d.pos}</TableCell>

                  <TableCell className="font-medium whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-9 w-9 rounded-lg">
                        <AvatarImage src={d.image_src} alt="Track cover" />
                        <AvatarFallback className="rounded-lg">
                          {(d as TopTrack).title?.slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>{" "}
                      {(d as TopTrack).title}
                    </div>
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    {(d as TopTrack).artists?.join(", ")}
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    {(d as TopTrack).album}
                  </TableCell>
                </TableRow>
              ))
            : Array.from({ length: 5 }).map((_, i) => (
                <TopItemsPlaceholder key={i} />
              ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Page;
