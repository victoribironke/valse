"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetPlaylistItems } from "@/lib/requests";
import { msToHMS } from "@/lib/utils";
import { Clock3 } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";

const Page = ({ params }: { params: { id: string } }) => {
  const { data } = useGetPlaylistItems(params.id);

  return (
    <>
      <div className="w-full flex items-center justify-between">
        <h1 className="text-main font-medium text-2xl md:text-3xl">Tracks</h1>

        <Button variant="outline">Sort playlist</Button>
      </div>

      <div className="bg-muted/50 p-4 rounded-xl w-full">
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
            {data?.map((d, i) => (
              <TableRow key={i}>
                <TableCell>{i + 1}</TableCell>

                <TableCell className="font-medium whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8 rounded-lg">
                      <AvatarImage src={d.image_src} alt="Track cover" />
                      <AvatarFallback className="rounded-lg">
                        {d.title.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>

                    {d.title}
                  </div>
                </TableCell>
                <TableCell className="whitespace-nowrap">{d.artist}</TableCell>
                <TableCell className="whitespace-nowrap">{d.album}</TableCell>
                <TableCell className="whitespace-nowrap">
                  {msToHMS(d.duration)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default Page;
