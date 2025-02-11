import { Skeleton } from "./ui/skeleton";
import { TableCell, TableRow } from "./ui/table";

const TopItemsPlaceholder = () => {
  return (
    <TableRow>
      <TableCell>
        <Skeleton className="w-4 h-4" />
      </TableCell>

      <TableCell className="font-medium whitespace-nowrap">
        <div className="flex items-center gap-2">
          <Skeleton className="w-9 h-9" />
          <Skeleton className="w-20 h-4" />
        </div>
      </TableCell>
      <TableCell className="whitespace-nowrap">
        <Skeleton className="w-20 h-4" />
      </TableCell>
      <TableCell className="whitespace-nowrap">
        <Skeleton className="w-20 h-4" />
      </TableCell>
    </TableRow>
  );
};

export default TopItemsPlaceholder;
