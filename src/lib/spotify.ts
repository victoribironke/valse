import { ENDPOINTS, PAGES, SPOTIFY_BASE_URL } from "@/constants/constants";
import { CurrentlyPlayingTrack, RecentlyPlayedTrack } from "@/types/dashboard";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

const { access_token: token, expires_at } = JSON.parse(
  localStorage.getItem("spotify_auth_data")!
);

const verifyAuthState = () => {
  const date_ms = new Date().getTime();

  if (date_ms >= expires_at) return false;

  return true;
};

export const useGetCurrentlyPlaying = () => {
  const url = ENDPOINTS.get_currently_playing;

  const { error, data, isLoading } = useQuery({
    queryKey: ["getCurrentlyPlaying"],
    queryFn: async () => {
      const isVerified = verifyAuthState();

      if (!isVerified) return null;

      const r = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      let data: CurrentlyPlayingTrack | null;

      if (r.status === 204) {
        return null;
      }

      if (!r.ok) {
        throw new Error(`API error: ${r.status}`);
      }

      const res = await r.json();

      if (res.currently_playing_type === "track") {
        data = {
          title: res.item.name,
          artists: res.item.artists.map((a: any) => a.name),
          is_local: res.item.is_local,
          duration: res.item.duration_ms,
          progress: res.progress_ms,
          media_cover: {
            h: res.item.album.images[0].height,
            w: res.item.album.images[0].width,
            src: res.item.album.images[0].url,
          },
        };
      } else data = null;

      return data;
    },
  });

  return { error, data, isLoading };
};

export const useGetRecentlyPlayed = () => {
  const url = ENDPOINTS.get_recently_played;

  const { error, data, isLoading } = useQuery({
    queryKey: ["getRecentlyPlayed"],
    queryFn: async () => {
      const isVerified = verifyAuthState();

      if (!isVerified) return null;

      const r = await fetch(url + "?limit=50", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (r.status === 204) {
        return [];
      }

      if (!r.ok) {
        throw new Error(`API error: ${r.status}`);
      }

      const res = await r.json();

      return res.items as RecentlyPlayedTrack[];
    },
  });

  return { error, data, isLoading };
};
