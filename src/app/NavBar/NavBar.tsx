"use client";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import skelton from "../../assets/images/3c67757cef723535a7484a6c7bfbfc43.jpg"

const NavBar = () => {
  const pathname = usePathname();
  const { data: session } = useSession();
  const profilePath = `/profile/${session?.user._id}`;
  const authPages = ["/login", "/register"];
  const[loading,setLoading]=useState(false)

  if (authPages.includes(pathname)) {
    return null;
  }
  async function handleLogout() {
    setLoading(true);
    await signOut({ callbackUrl: "/login" });
  }

  return (
    <aside className="hidden lg:block w-64 sticky top-0 left-0 h-screen bg-gray-900 text-white p-6 border border-r-gray-700 border-l-0 border-t-0 border-b-0 ">
      <div className="flex items-center justify-between mt-17 relative">
        <div className="flex items-center gap-3">
          <Link href={`/profile/${session?.user._id}`}>
            <Image
              priority
              src={session?.user?.photo || skelton}
              width={48}
              height={48}
              className="rounded-full w-12 h-12 object-cover"
              alt="profile User"
            />
          </Link>

          <div>
            {session?.user ? (
              <>
                <h1>{session.user.name}</h1>
                <span className="text-sm text-gray-400">
                  {session.user.email}
                </span>
              </>
            ) : (
              <div className="animate-pulse">
                <div className="h-4 w-25 bg-gray-700 rounded mb-2"></div>
                <div className="h-3 w-25 bg-gray-700 rounded"></div>
              </div>
            )}
          </div>
        </div>
        </div>
      <nav className="mt-10">
        <ul className="flex flex-col gap-4">
          <li>
            <Link
              href="/"
              className={`block rounded-lg text-md p-3 ${pathname === "/" ? "bg-slate-800 " : "hover:bg-gray-800"
                }`}
            >
              Home
            </Link>
          </li>

          <li>
            <Link
              href={`/profile/${session?.user._id}`}
              className={`block rounded-lg text-md p-3 ${pathname === profilePath
                ? "bg-slate-800 "
                : "hover:bg-gray-800"
                }`}
            >
              Profile
            </Link>
          </li>

          <li>
            <Link
              href="/bookmarks"
              className={`block rounded-lg text-md p-3 ${pathname === "/bookmarks"
                ? "bg-slate-800 "
                : "hover:bg-gray-800"
                }`}
            >
              Bookmarks
            </Link>
            
          </li>

          <li>
            <Link
              href="/notifications"
              className={`block rounded-lg text-md p-3 ${pathname === "/notifications"
                ? "bg-slate-800 "
                : "hover:bg-gray-800"
                }`}
            >
              Notifications
            </Link>
          </li>
          <li>
          <Link
              href="/editProfile"
              className={`block text-md rounded-lg p-3 ${pathname === "/editProfile"
                ? "bg-slate-800 "
                : "hover:bg-gray-800"
                }`}
            >
              Setting
            </Link>
            </li>
        </ul>
      </nav>

      <button
        onClick={handleLogout}
        disabled={loading}
        
        className="absolute disabled:opacity-50 bottom-25 left-6 bg-red-500 cursor-pointer hover:bg-red-600 px-4 py-2 rounded-lg"
      >
       {loading?"Logging out": "Logout"} 
      </button>
    </aside>
  );
};

export default NavBar;