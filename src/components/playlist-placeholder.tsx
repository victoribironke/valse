import { Music } from "lucide-react";
import { Skeleton } from "./ui/skeleton";

const PlaylistPlaceholder = () => {
  return (
    <div className="w-full bg-muted p-4 rounded-lg flex flex-col gap-4">
      <Skeleton className="w-full aspect-square" />

      <Skeleton className="w-full h-8" />
    </div>
  );
};

const PlaylistImagePlaceholder = () => {
  return (
    <div className="bg-primary/10 w-full aspect-square rounded-lg grid place-items-center">
      <Music size={30} color="#22c55e" />
    </div>
  );
};

export { PlaylistImagePlaceholder };
export default PlaylistPlaceholder;
