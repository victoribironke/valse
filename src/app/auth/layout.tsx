import type { Metadata } from "next";
import "../globals.css";
import { Toaster } from "react-hot-toast";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <Suspense>
      <Toaster
        toastOptions={{
          style: {
            backgroundColor: "hsl(var(--muted) / 0.5)",
            color: "#fff",
          },
        }}
      />
      {children}
    </Suspense>
  );
};

export default RootLayout;
