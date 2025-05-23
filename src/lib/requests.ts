import { ENDPOINTS } from "@/constants/constants";
import { useQuery } from "@tanstack/react-query";
import { logOut } from "./auth";
import { Playlist, Track } from "@/types/dashboard";

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

export const useGetPlaylistItems = (id: string) => {
  const url = ENDPOINTS.get_playlist_items(id);
  const params = "?limit=50";

  const { error, data, refetch, isFetching } = useQuery({
    queryKey: ["getPlaylistItems", id],
    queryFn: async () => {
      const isVerified = verifyAuthState();

      if (!isVerified) logOut();

      const r = await fetch(url + params, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (r.status === 204) return [];

      if (!r.ok) throw new Error(`API error: ${r.status}`);

      const res = await r.json();

      const data: Track[] = res.items.map((i: any): Track => {
        return {
          album: i.track.album.name,
          artist: i.track.artists
            .map((a: any) => (i.track.type === "track" ? a.name : a.type))
            .join(", "),
          duration: i.track.duration_ms,
          image_src: i.track.album.images[0]
            ? i.track.album.images[0].url
            : null,
          title: i.track.name,
          is_local: i.is_local,
          track_id: i.track.id,
        };
      });

      return data;
    },
    refetchInterval: false,
  });

  return { error, data, refetch, isFetching };
};

export const sortPlaylist = async (id: string, tracks: string[]) => {
  try {
    const res = await fetch("/api/sort-playlist?token=" + token, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        playlist_id: id,
        tracks: tracks,
      }),
    });
    const data = await res.json();

    // localStorage.setItem("valse_user_data", JSON.stringify(data.userData));

    return { data: "", error: null };
  } catch (e) {
    return { data: null, error: e };
  }
};
