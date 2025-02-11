import { Skeleton } from "./ui/skeleton";

const CurrentlyPlayingPlaceholder = () => {
  return (
    <div className="h-auto rounded-xl bg-muted/50 p-4 border">
      <div className="w-full flex gap-4 mb-4">
        <Skeleton className="h-16 w-16 rounded-lg" />

        <div className="flex flex-col justify-center mr-auto w-full gap-2">
          <Skeleton className="w-full max-w-[200px] h-6" />
          <Skeleton className="w-full max-w-[300px] h-6" />
        </div>
      </div>

      <Skeleton className="h-1.5 w-full rounded-full" />
    </div>
  );
};

export default CurrentlyPlayingPlaceholder;
