"use client";

import CurrentlyPlayingPlaceholder from "@/components/currently-playing-placeholder";
import TableRowComp from "@/components/table-row";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetCurrentlyPlaying, useGetRecentlyPlayed } from "@/lib/spotify";
import { msToHMS } from "@/lib/utils";
import Marquee from "react-fast-marquee";
import { Clock3 } from "lucide-react";

const Page = () => {
  const { data: currData, isLoading: currLoading } = useGetCurrentlyPlaying();
  const { data: recData } = useGetRecentlyPlayed();
  const progressBarwWidth =
    ((currData?.progress as number) / (currData?.duration as number)) * 100;

  // handle the error state, and when the data is null

  return (
    <div className="flex flex-col gap-4 p-4">
      <h2 className="text-main text-2xl md:text-3xl font-medium">
        Currently playing
      </h2>

      {currLoading ? (
        <CurrentlyPlayingPlaceholder />
      ) : currData ? (
        <div className="h-auto rounded-xl bg-muted/50 p-4 border max-w-2xl">
          <div className="w-full flex gap-4 mb-4">
            <Avatar className="h-16 w-16 rounded-lg">
              <AvatarImage
                src={currData.media_cover.src}
                alt={currData.title}
              />
              <AvatarFallback className="rounded-lg">
                {currData.title.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col justify-center mr-auto overflow-hidden">
              {currData.title.length > 52 ? (
                <Marquee
                  speed={25}
                  pauseOnHover={true}
                  direction="left"
                  pauseOnClick
                >
                  <p className="text-xl font-semibold whitespace-nowrap pr-80">
                    {currData.title}
                  </p>
                </Marquee>
              ) : (
                <p className="text-xl font-semibold whitespace-nowrap pr-80">
                  {currData.title}
                </p>
              )}

              <p className="text-sm text-muted-foreground">
                {currData.artists.join(", ")}
              </p>
            </div>

            {/* in the future, you will have to dynamically set the icon depending on
          the type of device connected
          <div className="flex gap-2 items-center justify-center text-sm text-main">
            <MonitorSpeaker size={20} />
            <p>DAMILOLA</p>
          </div> */}
          </div>

          <div className="bg-gray-50 bg-opacity-20 rounded-full overflow-hidden mb-2">
            <div
              className="bg-main h-1.5 rounded-full"
              style={{
                width: `${progressBarwWidth}%`,
              }}
            />
          </div>

          <div className="flex items-center justify-between text-muted-foreground text-sm">
            <p className="text-main">{msToHMS(currData.progress)}</p>
            <p>{msToHMS(currData.duration)}</p>
          </div>
        </div>
      ) : (
        <CurrentlyPlayingPlaceholder />
      )}

      <h2 className="text-main text-2xl md:text-3xl font-medium mt-4">
        Recently played
      </h2>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>#</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Artist(s)</TableHead>
            <TableHead>Album</TableHead>
            <TableHead className="flex justify-end items-center">
              <Clock3 size={18} />
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {recData?.map((r, i) => (
            <TableRowComp
              key={i}
              track={r.track}
              played_at={r.played_at}
              n={i}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Page;
