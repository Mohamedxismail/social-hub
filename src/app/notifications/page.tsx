import Image from "next/image";
import Link from "next/link";
import { getMyToken } from "@/utilities/token";
import { Notifications } from "@/types/notification";
import { IoMdNotificationsOff } from "react-icons/io";

import {
  getNotificationText,
  NotificationIcon,
} from "@/utilities/notificationHelpers";

export default async function Page() {
  const tokenv = await getMyToken();
  const token = tokenv?.token;

  const res = await fetch(
    "https://route-posts.routemisr.com/notifications?unread=false&page=1&limit=10",
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    }
  );

  const data = await res.json();

  if (!res.ok) {
    return (
      <div className="mt-20 text-center text-red-500">
        Failed to load notifications.
      </div>
    );
  }

  const notifications: Notifications[] =
    (data?.data?.notifications ?? []).filter(
      (notification: Notifications) => !notification.entity?.unavailable
    );
  console.log(notifications);


  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <div className="w-full max-w-xl mx-auto p-3  mb-5 space-y-4 font-sans text-slate-100">
      <div className="bg-[#111827]/80 border border-gray-800 rounded-3xl p-6 flex items-center gap-5 shadow-xl backdrop-blur-sm">
        <div className="bg-slate-800 border border-blue-500/20 p-4 rounded-2xl">
          <svg
            className="w-8 h-8 text-slate-200"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 2a7 7 0 00-7 7v3.586l-.707.707A1 1 0 004 15h16a1 1 0 00.707-1.707L20 12.586V9a7 7 0 00-7-7zM10 19a2 2 0 004 0h-4z" />
          </svg>
        </div>

        <div>
          <h1 className="text-2xl font-bold">Notifications</h1>
          <p className="text-sm text-slate-400 mt-1">
            Stay updated with your latest activity.
          </p>

          <p className="text-slate-200 text-sm font-semibold mt-2">
            {unreadCount > 0
              ? `${unreadCount} unread notifications`
              : `${notifications.length} notifications`}
          </p>
        </div>
      </div>
      <div className="space-y-2">
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <Link
              key={notification._id}
              href={
                notification.entityType === "post"
                  ? `/singlePost/${notification.entityId}`
                  : `/profile/${notification.actor._id}`
              }
              className="block"
            >
              <div
                className={`relative flex items-start gap-4 rounded-2xl border p-4 transition-all duration-200  hover:bg-[#262b33]
                ${notification.isRead
                    ? "border-[#2e3238] bg-[#1f2329]"
                    : "border-[#2e3238] bg-[#1b2434]"
                  }`}
              >
                <div className="relative">
                  <Image
                    src={notification.actor.photo}
                    alt={notification.actor.name}
                    width={50}
                    height={50}
                    className="rounded-full object-cover"
                  />


                  <div className="absolute -bottom-1 -right-1 bg-[#111827] rounded-full p-1 border border-[#2e3238]">
                    {NotificationIcon(notification.type)}
                  </div>
                </div>

                <div className="flex-1">
                  <p className="text-md leading-6">
                    <span className="font-semibold text-white">
                      {notification.actor.name}
                    </span>{" "}
                    <span className="text-slate-300">
                      {getNotificationText(notification.type)}
                    </span>
                  </p>

                  <p className="text-sm text-slate-400 mt-1">
                    Tap to view details.
                  </p>

                  <p className="text-xs text-slate-500 mt-2">
                    {new Date(notification.createdAt).toLocaleString(
                      "en-GB",
                      {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      }
                    )}
                  </p>
                </div>

                {!notification.isRead && (
                  <span className="w-3 h-3 rounded-full bg-blue-500 mt-2 shrink-0" />
                )}
              </div>
            </Link>
          ))
        ) : (
          <div className="bg-[#111827]/80  mb-10  rounded-3xl p-12 flex flex-col justify-center items-center text-center shadow-lg backdrop-blur-sm">
            <div className="bg-slate-800 text-blue-500 border border-blue-500/20 p-4 rounded-2xl flex items-center justify-center mb-5">

              <IoMdNotificationsOff className="md:text-3xl text-2xl text-slate-200" />

            </div>
            <p className="md:text-2xl text-xl font-semibold text-white">
              No Notifications Yet
            </p>

            <p className="text-md text-slate-400 mt-2">
              When someone interacts with your posts or profile, you will see it
              here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}