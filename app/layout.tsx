import type { Metadata } from "next";
import "./globals.css";
import "quill/dist/quill.snow.css"; // Ensure this is globally imported

import { ClerkProvider } from "@clerk/nextjs";
import { ToastProvider } from "@/components/providers/toaster-provider";
import { ConfettiProvider } from "@/components/providers/confetti-provider";
import ShadowCursor from "@/components/ShadowCursor";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
        >
          <ConfettiProvider/>
          <ToastProvider/>
            {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
