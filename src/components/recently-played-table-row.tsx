import { TableCell, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { RecentlyPlayedTrack } from "@/types/dashboard";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { getTimeSince } from "@/lib/utils";

const TableRowComp = (props: RecentlyPlayedTrack) => {
  return (
    <TableRow>
      <TableCell>{props.n + 1}</TableCell>
      <TableCell className="font-medium whitespace-nowrap">
        <div className="flex items-center gap-2">
          <Avatar className="h-9 w-9 rounded-lg">
            <AvatarImage
              src={props.track.album.images[0].url}
              alt={props.track.name}
            />
            <AvatarFallback className="rounded-lg">
              {props.track.name.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>{" "}
          {props.track.name}
          {props.track.is_local && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="bg-gray-50 text-white bg-opacity-20 px-1.5 py-0.5 rounded-md text-xs w-fit">
                    Local
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>This is a local file</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
      </TableCell>
      <TableCell className="whitespace-nowrap">
        {props.track.artists.map((a) => a.name).join(", ")}
      </TableCell>
      <TableCell className="whitespace-nowrap">
        {props.track.album.name}
      </TableCell>
      <TableCell className="text-right whitespace-nowrap text-muted-foreground">
        {getTimeSince(props.played_at)} ago
      </TableCell>
    </TableRow>
  );
};

export default TableRowComp;
