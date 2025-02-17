import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { sortPlaylist } from "@/lib/requests";
import { LoaderCircle } from "lucide-react";
import { useState } from "react";

type SortPlaylistProps = {
  id: string;
  isNotEligible: boolean;
  tracks: string[];
};

const SortPlaylist = ({ id, isNotEligible, tracks }: SortPlaylistProps) => {
  const [loading, setLoading] = useState(false);

  const sort = async () => {
    setLoading(true);

    const { data, error } = await sortPlaylist(id, tracks);

    console.log(data, error);

    setLoading(false);
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline" disabled={isNotEligible}>
          Sort playlist
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-main">
            Sort this playlist?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to sort this playlist? This will use one (1)
            of your credits.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="w-full">Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="w-full bg-main text-white hover:bg-main/90 hover:text-white"
            onClick={sort}
            disabled={loading}
          >
            {loading && <LoaderCircle className="animate-spin" />} Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default SortPlaylist;
