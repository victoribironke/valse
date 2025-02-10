import { TableCell, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { RecentlyPlayedTrack } from "@/types/dashboard";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const TableRowComp = (props: RecentlyPlayedTrack) => {
  return (
    <TableRow>
      <TableCell>1</TableCell>
      <TableCell className="font-medium">
        <div className="flex items-center gap-2">
          <Avatar className="h-9 w-9 rounded-lg">
            <AvatarImage src={props.album_cover_src} alt={props.album} />
            <AvatarFallback className="rounded-lg">
              {props.album.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>{" "}
          {props.title}
          {props.is_local && (
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
      <TableCell>{props.artists.join(", ")}</TableCell>
      <TableCell>{props.album}</TableCell>
      <TableCell>
        {props.duration} • {props.played_at} ago
      </TableCell>
    </TableRow>
  );
};
export default TableRowComp;
