"use client";

import PageLoader from "@/components/page-loader";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Clock3, MonitorSpeaker } from "lucide-react";
import { useState } from "react";

const Page = () => {
  const [loading, setLoading] = useState(false);

  if (loading) return <PageLoader fullScreen />;

  return (
    <div className="flex flex-col gap-4 p-4">
      <h2 className="text-main text-2xl md:text-3xl font-medium">
        Currently playing
      </h2>

      <div className="h-auto rounded-xl bg-muted/50 p-4 border">
        <div className="w-full flex gap-4 mb-4">
          <Avatar className="h-16 w-16 rounded-lg">
            <AvatarImage src={"/"} alt={"props.album"} />
            <AvatarFallback className="rounded-lg">AN</AvatarFallback>
          </Avatar>

          <div className="flex flex-col justify-center mr-auto">
            <p className="text-xl font-semibold">JUBA</p>
            <p className="text-sm text-muted-foreground">Anendlessocean</p>
          </div>

          {/* in the future, you will have to dynamically set the icon depending on the type of device connected */}
          <div className="flex gap-2 items-center justify-center text-sm text-main">
            <MonitorSpeaker size={20} />
            <p>DAMILOLA</p>
          </div>
        </div>

        <div className="bg-gray-50 bg-opacity-20 rounded-full overflow-hidden mb-2">
          <div className="bg-main h-1.5 w-1/2 rounded-full" />
        </div>

        <div className="flex items-center justify-between text-muted-foreground text-sm">
          <p className="text-main">3:32</p>
          <p>1:27</p>
        </div>
      </div>

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
        <TableBody></TableBody>
      </Table>
    </div>
  );
};

export default Page;
