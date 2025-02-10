import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { TopArtist, TopTrack } from "@/types/dashboard";

const TopTrackComp = (props: TopTrack) => {
  return (
    <div className="rounded-xl bg-muted/50 relative p-4 flex gap-4 flex-col">
      <div className="absolute text-main font-bold tracking-widest text-4xl right-4 top-4 z-10">
        #{props.pos}
      </div>

      <Avatar className="h-14 w-14 rounded-lg">
        <AvatarImage src={props.image_src} alt={props.title} />
        <AvatarFallback className="rounded-lg">
          {props.title.slice(0, 2).toUpperCase()}
        </AvatarFallback>
      </Avatar>

      <div className="flex flex-col justify-center mr-auto">
        <p className="text-xl font-semibold">{props.title}</p>
        <p className="text-sm text-muted-foreground">{props.artist}</p>
      </div>
    </div>
  );
};

const TopArtistComp = (props: TopArtist) => {
  return (
    <div className="rounded-xl bg-muted/50 relative p-4 flex gap-4 flex-col">
      <div className="absolute text-main font-bold tracking-widest text-4xl right-4 top-4 z-10">
        #{props.pos}
      </div>

      <Avatar className="h-14 w-14 rounded-full">
        <AvatarImage src={props.image_src} alt={props.artist} />
        <AvatarFallback className="rounded-lg">
          {props.artist.slice(0, 2).toUpperCase()}
        </AvatarFallback>
      </Avatar>

      <div className="flex flex-col justify-center mr-auto">
        <p className="text-xl font-semibold">{props.artist}</p>
      </div>
    </div>
  );
};

export { TopTrackComp, TopArtistComp };
