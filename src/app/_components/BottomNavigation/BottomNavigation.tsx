"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FaHome,
  FaUserFriends,
  FaBookmark,
  FaPlus,
} from "react-icons/fa";
import skelton from "@/assets/images/3c67757cef723535a7484a6c7bfbfc43.jpg";

type BottomNavigationProps = {
  open: boolean;
};

export default function BottomNavigation({
  open,
}: BottomNavigationProps) {
  const pathname = usePathname();
  const { data: session } = useSession();

  return (
    <nav
      className={`fixed bottom-0 left-0 right-0 lg:hidden bg-slate-900 border-t border-slate-800 z-50 transition-all duration-300 ease-in-out ${
        open
          ? "translate-y-full opacity-0 pointer-events-none"
          : "translate-y-0 opacity-100"
      }`}
    >
      <div className="relative flex justify-around items-center h-16">
        <Link href="/">
          <FaHome
            size={20}
            className={pathname === "/" ? "text-white" : "text-slate-400"}
          />
        </Link>

        <Link href="/bookmarks">
          <FaBookmark
            size={20}
            className={
              pathname === "/bookmarks" ? "text-white" : "text-slate-400"
            }
          />
        </Link>
        <Link
          href="/createPost"
          className="absolute left-1/2 -translate-x-1/2 -top-6 flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 shadow-xl border-4 border-slate-900 transition hover:bg-blue-500 active:scale-95"
        >
          <FaPlus className="text-white text-xl" />
        </Link>

        <Link href="/suggestions">
          <FaUserFriends
            size={20}
            className={
              pathname === "/suggestions"
                ? "text-white"
                : "text-slate-400"
            }
          />
        </Link>

        <Link href={`/profile/${session?.user._id}`}>
          <Image
            src={session?.user?.photo || skelton}
            alt="user photo"
            width={32}
            height={32}
            className={
              pathname === `/profile/${session?.user._id}`
                ? "rounded-full border-2 w-8 h-8 border-blue-500"
                : "rounded-full h-8 w-8"
            }
          />
        </Link>
      </div>
    </nav>
  );
}