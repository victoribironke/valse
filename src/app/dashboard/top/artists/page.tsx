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
import { formatNumber } from "@/lib/utils";
import { TopArtist } from "@/types/dashboard";
import { useEffect, useState } from "react";

const Page = () => {
  const durations = ["4 weeks", "6 months", "1 year"];
  const [duration, setDuration] = useState("4 weeks");
  const { data, isFetching, refetch } = useGetTopItems("artists", duration);

  useEffect(() => {
    refetch();
  }, [duration]);

  return (
    <div className="flex flex-col gap-4 p-4">
      <h2 className="text-main text-2xl md:text-3xl font-medium">
        Your top artists
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
            <TableHead>Artist</TableHead>
            <TableHead>Genre(s)</TableHead>
            <TableHead className={!isFetching ? "text-right" : ""}>
              Followers
            </TableHead>
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
                        <AvatarImage src={d.image_src} alt="Artist cover" />
                        <AvatarFallback className="rounded-lg">
                          {(d as TopArtist).artist.slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>{" "}
                      {(d as TopArtist).artist}
                    </div>
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    {(d as TopArtist).genres?.join(", ")}
                  </TableCell>
                  <TableCell className="whitespace-nowrap text-right">
                    {typeof (d as TopArtist).followers === "number" &&
                      formatNumber((d as TopArtist).followers)}
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
