import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavBar from "./NavBar/NavBar";
import { Toaster } from "sonner";
import Providers from "@/providers";
import FollowSuggestions from "./_components/FollowSuggestions/FollowSuggestions";
import LayoutClient from "./_components/LayoutClient/LayoutClient";
import MainLayout from "./_components/MainLayout/MainLayout";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Social App",
  description: "A simple social app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <Toaster position="top-center" duration={1000} toastOptions={{
            className: "text-base py-4 px-5 min-w-[100px]",
          }} />
          <LayoutClient authenticated={!!session} />
          <div className="flex">
            <NavBar />

            <MainLayout>
              {children}
            </MainLayout>

            <FollowSuggestions />
          </div>

        </Providers>
      </body>
    </html>
  );
}