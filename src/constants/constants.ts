export const REDIRECT_URI =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000/auth"
    : "https://valse.vercel.app/auth";

export const SPOTIFY_BASE_URL = "https://api.spotify.com";

export const PAGES = {
  dashboard: "/dashboard",
  top: "/dashboard/top",
  stats: "/dashboard/stats",

  auth: "/auth",
};
