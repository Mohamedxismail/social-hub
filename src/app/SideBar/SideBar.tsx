"use client";
import { signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { IoNotifications, IoClose, IoSettingsSharp } from "react-icons/io5";
import {
  FaHome,
  FaUserFriends,
  FaBookmark,
  FaUser,
  FaLock,
} from "react-icons/fa";
import { HiOutlineBars3 } from "react-icons/hi2";
import skelton from "../../assets/images/3c67757cef723535a7484a6c7bfbfc43.jpg";
import { useState } from "react";

type SideBarProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

function SideBar({ open, setOpen }: SideBarProps) {
  const pathname = usePathname();
  const { data: session } = useSession();
  const[loading,setLoading]=useState(false)
  async function handleLogOut() {
    setLoading(true)
    await signOut({ callbackUrl: "/login" })
    
  }

  const authPages = ["/login", "/register"];

  if (authPages.includes(pathname)) {
    return null;
  }

  const profilePath = `/profile/${session?.user?._id}`;

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-30 flex items-center justify-between px-6 py-4 bg-gray-900 border-b border-gray-700">

        <Link href="/">
          <h1 className="text-3xl font-bold text-white">
            Social <span className="text-blue-500">Hub</span>
          </h1>
        </Link>
        <div className="flex justify-center items-center gap-4">
          <Link
            href="/notifications"
            className={`lg:hidden text-slate-400 ${pathname === "/notifications" ? "text-white" : "text-slate-400"}`}
          >
            <IoNotifications size={22} />
          </Link>
          <button
            onClick={() => setOpen(true)}
            className="lg:hidden text-white"
          >
            <HiOutlineBars3 size={27} />
          </button>

        </div>
        <div className="hidden lg:flex justify-center items-center gap-3">
          <Link
            href="/"
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 ${pathname === "/"
              ? "bg-slate-700 text-white"
              : "text-slate-400 hover:text-white hover:bg-slate-800"
              }`}
          >
            <FaHome size={18} />
          </Link>

          <Link
            href="/notifications"
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 ${pathname === "/notifications"
              ? "bg-slate-700 text-white"
              : "text-slate-400 hover:text-white hover:bg-slate-800"
              }`}
          >
            <IoNotifications size={18} />
          </Link>

          <Link
            href="/suggestions"
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 ${pathname === "/suggestions"
              ? "bg-slate-700 text-white"
              : "text-slate-400 hover:text-white hover:bg-slate-800"
              }`}
          >
            <FaUserFriends size={18} />
          </Link>
        </div>
      </header>

      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-40 bg-black/50 transition-all duration-300 ${open
          ? "opacity-100 visible"
          : "opacity-0 invisible"
          }`}
      />

      <aside
        className={`fixed top-0 right-0 z-50 h-screen w-full md:w-65 bg-gray-900 text-white
  transition-all duration-350 ease-in-out
  ${open
            ? "translate-x-0 opacity-100"
            : "translate-x-full opacity-0"
          }`}
      >
        <div className="flex items-center justify-between p-5 border-b border-gray-700">
          <h2 className="text-xl font-semibold">Menu</h2>

          <button onClick={() => setOpen(false)}>
            <IoClose size={28} />
          </button>
        </div>

        <div className="flex items-center gap-3 p-4 ">
          <Link href={profilePath} onClick={() => setOpen(false)}><Image
            src={session?.user?.photo || skelton}
            alt="profile"
            width={55}
            height={55}
            className="rounded-full w-12 h-12 object-cover"
          /></Link>

          <div>
            <Link href={profilePath} onClick={() => setOpen(false)}><h3 className="font-semibold">
              {session?.user?.name}
            </h3></Link>

            <p className="text-sm text-gray-400">
              {session?.user?.email}
            </p>
          </div>
        </div>

        <nav className="p-2 "></nav>
        <Link
          href="/"
          onClick={() => setOpen(false)}
          className={`flex items-center gap-3 rounded-lg p-3 transition ${pathname === "/"
            ? "bg-slate-800"
            : "hover:bg-slate-800"
            }`}
        >
          <FaHome />
          <span>Home</span>
        </Link>
        <Link
          href={profilePath}
          onClick={() => setOpen(false)}
          className={`flex items-center gap-3 rounded-lg p-3 transition ${pathname === profilePath
            ? "bg-slate-800"
            : "hover:bg-slate-800"
            }`}
        >
          <FaUser />
          <span>Profile</span>
        </Link>

        <Link
          href="/bookmarks"
          onClick={() => setOpen(false)}
          className={`flex items-center gap-3 rounded-lg p-3 transition ${pathname === "/bookmarks"
            ? "bg-slate-800"
            : "hover:bg-slate-800"
            }`}
        >
          <FaBookmark />
          <span>BookMarks</span>
        </Link>
        <Link
          href="/notifications"
          onClick={() => setOpen(false)}
          className={`flex items-center gap-3 rounded-lg p-3 transition ${pathname === "/notifications"
            ? "bg-slate-800"
            : "hover:bg-slate-800"
            }`}
        >
          <IoNotifications size={18} />
          <span>Notifications</span>
        </Link>
        <Link
          href="/suggestions"
          onClick={() => setOpen(false)}
          className={`flex items-center gap-3 rounded-lg p-3 transition ${pathname === "/suggestions"
            ? "bg-slate-800"
            : "hover:bg-slate-800"
            }`}
        >
          <FaUserFriends size={18} />
          <span>Suggestions</span>
        </Link>

        <Link
          href="/editProfile"
          onClick={() => setOpen(false)}
          className={`flex items-center gap-3 rounded-lg p-3 transition ${pathname === "/editProfile"
            ? "bg-slate-800"
            : "hover:bg-slate-800"
            }`}
        >
          <IoSettingsSharp />
          <span>Settings</span>
        </Link>

        <button
          onClick={handleLogOut}
          disabled={loading}
          className={`mt-6 flex  ms-2 disabled:opacity-50  text-red-600  cursor-pointer  items-center gap-2 rounded-lg  px-1 py-3 transition `}
        >
          <FaLock />
          <span>{loading ? "Logging out" :"Logout" }</span>
        </button>
      </aside>

    </>
  );
}

export default SideBar;