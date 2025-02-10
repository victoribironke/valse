"use client";

import Spotify from "@/components/spotify";
import { Button } from "@/components/ui/button";
import { PAGES, REDIRECT_URI } from "@/constants/constants";
import { generateRandomString, stringifyQuery } from "@/lib/utils";
import Image from "next/image";
import toast from "react-hot-toast";
import { redirect, useRouter } from "next/navigation";
import PageLoader from "@/components/page-loader";
import { LoaderCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

const Auth = () => {
  const stateKey = "spotify_auth_state";
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET;
  const { push } = useRouter();

  const login = async () => {
    const state = generateRandomString(16);
    const scope = [
      "user-read-playback-state",
      "user-read-currently-playing",
      "user-top-read",
      "user-read-recently-played",
      "user-read-email",
    ].join(" ");

    localStorage.setItem(stateKey, state);

    const queryParams = {
      response_type: "code",
      client_id: clientId,
      scope,
      redirect_uri: REDIRECT_URI,
      state: state,
    };
    const queryString = stringifyQuery(queryParams);
    const url = "https://accounts.spotify.com/authorize?" + queryString;

    redirect(url);
  };

  const getAccessToken = async (code: string) => {
    try {
      const res = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization:
            "Basic " +
            Buffer.from(clientId + ":" + clientSecret).toString("base64"),
        },
        body: new URLSearchParams({
          code: code,
          redirect_uri: REDIRECT_URI,
          grant_type: "authorization_code",
        }),
      });

      const { access_token, expires_in } = await res.json();

      const date_ms = new Date().getTime();
      const spotifyAuthData = {
        access_token,
        expires_at: date_ms + expires_in * 1000,
      };
      localStorage.setItem(
        "spotify_auth_data",
        JSON.stringify(spotifyAuthData)
      );

      push(PAGES.dashboard);
    } catch (e) {
      console.log(e);
      toast.error("A server error occured.");
    }
  };

  useEffect(() => {
    const state = searchParams.get("state");
    const code = searchParams.get("code");
    const error = searchParams.get("error");

    const st = localStorage.getItem(stateKey);

    setLoading(false);

    if (error || !st || st !== state || !code) return;

    // if (!st || st !== state) {
    //   redirect(`${PAGES.auth}?error=state_mismatch`);
    // }

    // if (!code) {
    //   redirect(`${PAGES.auth}?error=no_code_found`);
    // }

    setLoading(true);

    getAccessToken(code);
  }, []);

  return (
    <section className="w-full p-6 flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md">
        <h1 className="text-center mb-6 text-4xl font-semibold">Valse</h1>

        <Button
          className="bg-muted/50 text-main hover:bg-muted/40 hover:text-main w-full"
          onClick={login}
          disabled={loading}
        >
          {loading ? (
            <LoaderCircle className="animate-spin" />
          ) : (
            <>
              <Spotify /> Login with Spotify
            </>
          )}
        </Button>
      </div>
    </section>
  );
};

export default Auth;
