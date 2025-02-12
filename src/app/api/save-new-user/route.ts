import { ENDPOINTS } from "@/constants/constants";
import { auth, db } from "@/services/firebase";
import { User } from "@/types/dashboard";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const token = req.nextUrl.searchParams.get("token");
  const email = process.env.ADMIN_EMAIL!;
  const password = process.env.ADMIN_PASSWORD!;

  try {
    await signInWithEmailAndPassword(auth, email, password);

    const res = await fetch(ENDPOINTS.get_user_profile, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    const data = await res.json();

    const user = await getDoc(doc(db, "users", data.email));

    if (user.exists()) {
      return NextResponse.json({ user }, { status: 200 });
    }

    const userData: User = {
      country: data.country,
      credits: 3,
      display_name: data.display_name,
      email: data.email,
      user_id: data.id,
      followers: data.followers.total,
      profile_pic: data.images[0].url,
    };

    await setDoc(doc(db, "users", data.email), userData);

    return NextResponse.json({ userData }, { status: 200 });
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      { error: "A server error occured." },
      { status: 500 }
    );
  }
};
