import { auth, db } from "@/services/firebase";
import { NewUser } from "@/types/auth";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import type { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const data: NewUser = JSON.parse(req.body);

  try {
    const user = await createUserWithEmailAndPassword(
      auth,
      data.email,
      data.password
    );

    await setDoc(doc(db, "users", user.user.uid), {
      email: data.email,
      first_name: data.first_name,
      last_name: data.last_name,
      role: data.role,
      department: data.role,
    });

    res.status(200).json({
      data: "Succesfully created user.",
      error: null,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      data: null,
      error: "A server error occured.",
    });
  }
};
