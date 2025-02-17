import { ENDPOINTS } from "@/constants/constants";
import { auth, db } from "@/services/firebase";
import { User } from "@/types/dashboard";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const token = req.nextUrl.searchParams.get("token");
  const body = await req.json();

  try {
    // console.log(body);

    const res = await fetch(
      ENDPOINTS.get_tracks_audio_features(body.tracks.join(",")),
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    console.log(res);
    const data = await res.json();

    console.log(data);

    return NextResponse.json({}, { status: 200 });
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      { error: "A server error occured." },
      { status: 500 }
    );
  }
};
