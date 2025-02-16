"use client";

import { PlaylistImagePlaceholder } from "@/components/playlist-placeholder";
import { PAGES } from "@/constants/constants";
import { useGetPlaylists } from "@/lib/requests";
import Link from "next/link";

const Page = () => {
  const { data } = useGetPlaylists();

  // console.log(data);
  // maybe tell them that if a playlist doesn't show up in the list, it is because it is not theirs and they cannot modify it

  return (
    <>
      <h1 className="text-main font-medium text-2xl md:text-3xl text-left w-full">
        Your playlists
      </h1>

      <div className="grid gap-6 grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full">
        {data?.map((d, i) => (
          <div
            className="w-full bg-muted p-3 rounded-xl flex flex-col gap-3"
            key={i}
          >
            {d.image_src ? (
              <div className="w-full aspect-square rounded-lg overflow-hidden">
                <img src={d.image_src} alt={d.title} className="w-full" />
              </div>
            ) : (
              <PlaylistImagePlaceholder />
            )}

            <Link
              href={PAGES.playlist(d.playlist_id)}
              className="hover:text-main"
            >
              {d.title}
            </Link>
          </div>
        ))}
      </div>
    </>
  );
};

export default Page;
