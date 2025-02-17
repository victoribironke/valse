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

type SortPlaylistProps = {
  id: string;
  isNotEligible: boolean;
};

const SortPlaylist = ({ id, isNotEligible }: SortPlaylistProps) => {
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
            onClick={() => alert("sorted")}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default SortPlaylist;
