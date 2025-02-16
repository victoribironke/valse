import { ENDPOINTS } from "@/constants/constants";
import { useQuery } from "@tanstack/react-query";
import { logOut } from "./auth";
import { Playlist } from "@/types/dashboard";

const { access_token: token, expires_at } = JSON.parse(
  localStorage.getItem("spotify_auth_data")!
);

const verifyAuthState = () => {
  const date_ms = new Date().getTime();

  if (date_ms >= expires_at) return false;

  return true;
};

export const useGetPlaylists = () => {
  const url = ENDPOINTS.get_playlists;
  const params = "?limit=50";

  const { error, data, refetch, isFetching } = useQuery({
    queryKey: ["getPlaylists"],
    queryFn: async () => {
      const isVerified = verifyAuthState();

      if (!isVerified) logOut();

      const r = await fetch(url + params, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (r.status === 204) return [];

      if (!r.ok) throw new Error(`API error: ${r.status}`);

      const res = await r.json();

      const { user_id } = JSON.parse(localStorage.getItem("valse_user_data")!);

      const data: Playlist[] = res.items
        .filter((i: any) => i.owner.id === user_id)
        .map((i: any) => {
          return {
            image_src: i.images ? i.images[0].url : null,
            playlist_id: i.id,
            snapshot_id: i.snapshot_id,
            title: i.name,
          } as Playlist;
        });

      return data;
    },
    refetchInterval: false,
  });

  return { error, data, refetch, isFetching };
};
