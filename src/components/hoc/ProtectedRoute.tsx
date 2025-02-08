import { auth } from "@/services/firebase";
// import { getCurrentUser } from "@/utils/firebase";
import { useRouter } from "next/router";
import { useState, useEffect, JSX } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { PAGES } from "@/constants/constants";
import PageLoader from "../general/PageLoader";
import { getUser } from "@/lib/firebase";
import { useSetRecoilState } from "recoil";
import { user } from "@/atoms/atoms";

// Check if user is logged in
export const checkAuthentication = (ProtectedComponent: any) => {
  return function CheckIfTheUserIsLoggedIn(props: object) {
    const [isLoading, setIsLoading] = useState(true);
    const { push } = useRouter();
    const setUser = useSetRecoilState(user);

    useEffect(() => {
      const unsub = onAuthStateChanged(auth, async (user) => {
        setIsLoading(true);

        if (user === null) {
          push(PAGES.login);

          return;
        } else {
          const { data, error } = await getUser(user.uid);

          if (error) {
            console.log(error);
            return;
          }

          setUser(data);
        }

        setIsLoading(false);
      });

      return unsub;
    }, []);

    if (isLoading) {
      return <PageLoader type="full" />;
    }

    return <ProtectedComponent {...props} />;
  };
};

// Prevents already logged in user access to auth modals
export const alreadyLoggedIn = (ProtectedComponent: () => JSX.Element) => {
  return function StopLoggedInUsersAccessToAuthModals(props: object) {
    const [isLoading, setIsLoading] = useState(true);
    const { push } = useRouter();
    const setUser = useSetRecoilState(user);

    useEffect(() => {
      const unsub = onAuthStateChanged(auth, (user) => {
        setIsLoading(true);

        if (user) {
          setTimeout(async () => {
            const { data, error } = await getUser(user.uid);

            if (error) {
              console.log(error);
              return;
            }

            setUser(data);
            push(PAGES.dashboard);

            return;
          }, 500);
        }

        setIsLoading(false);
      });

      return unsub;
    }, []);

    if (isLoading) {
      return <PageLoader type="full" />;
    }

    return <ProtectedComponent {...props} />;
  };
};
