import { auth, db } from "@/services/firebase";
import {
  browserLocalPersistence,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  setPersistence,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {
  doc,
  setDoc,
  getDoc,
  getDocs,
  collection,
  query,
  where,
  updateDoc,
} from "firebase/firestore";
import toast from "react-hot-toast";
import { isValidEmail } from "./utils";
import { Departments, NewUser, User } from "@/types/auth";

export const createUser = async (d: NewUser) => {
  const values = Object.entries(d)
    .map((e) => e[1])
    .filter((v) => v === "");

  if (values.length !== 0) {
    return { data: null, error: "Please fill in all the required fields." };
  }

  try {
    await fetch("/api/create-user", {
      method: "POST",
      body: JSON.stringify(d),
    });

    return { data: "Succesfully created user.", error: null };
  } catch (e: any) {
    return { data: null, error: "A server error occured." };
  }
};

export const loginUser = async (d: { password: string; email: string }) => {
  const { password, email } = d;

  const values = Object.entries(d)
    .map((e) => e[1])
    .filter((v) => v === "");

  if (values.length !== 0) {
    return { data: null, error: "Please fill in all the required fields." };
  }

  try {
    await setPersistence(auth, browserLocalPersistence).then(() =>
      signInWithEmailAndPassword(auth, email, password)
    );

    return { data: "Succesfully logged in.", error: null };
  } catch (e: any) {
    let error;
    if (e.code && e.code.includes("auth")) error = "Invalid login credentials.";
    else error = "A server error occured.";

    return { data: null, error };
  }
};

export const resetPassword = async (email: string) => {
  if (!email || !isValidEmail(email)) {
    return { data: null, error: "Please input a valid email." };
  }

  try {
    await sendPasswordResetEmail(auth, email);

    return { data: "A password reset link has been sent.", error: null };
  } catch (e: any) {
    return { data: null, error: "A server error occured." };
  }
};

export const getUser = async (uid: string) => {
  try {
    const data = await getDoc(doc(db, "users", uid));

    const user = { ...data.data(), uid: data.id } as User;

    return { data: user, error: null };
  } catch (e) {
    return { data: null, error: "An error occured." };
  }
};

export const setUserAsHOD = async (uid: string, department: Departments) => {
  try {
    // Get all the users from the department
    const q = query(
      collection(db, "users"),
      where("department", "==", department)
    );
    const usersFromDept = (await getDocs(q)).docs.map((doc) => {
      return { ...doc.data(), uid: doc.id } as User;
    });

    // Find the current HOD
    const currentHOD = usersFromDept.find((u) => u.is_hod);

    if (currentHOD) {
      // Set the current HOD to a regular department worker
      await updateDoc(doc(db, "users", currentHOD.uid), {
        is_hod: false,
      });
    }

    // Set the new HOD
    await updateDoc(doc(db, "users", uid), {
      is_hod: true,
    });

    return { data: "Successfully set as HOD.", error: null };
  } catch (e) {
    return { data: null, error: "A server error occured." };
  }
};
