"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaEye } from "react-icons/fa";
import FollowUser from "../FollowUser/FollowUser";

export interface FollowerUser {
  _id: string;
  name: string;
  photo: string;
  
}
type Props = {
  followers: FollowerUser[];
};

export default function FollowersList({ followers }: Props) {
  const [search, setSearch] = useState("");

  const filteredFollowers = followers.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <input
        type="text"
        placeholder="Search for people"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full mb-5 p-3 rounded-xl bg-gray-950/50 border border-gray-800 text-white outline-none"
      />

      <div className="border border-gray-800 rounded-3xl overflow-hidden divide-y divide-gray-800">
        {filteredFollowers.length === 0 ? (
          <p className="text-gray-400 text-center py-8">
            No users found
          </p>
        ) : (
          filteredFollowers.map((user) => (
            <Link
              key={user._id}
              href={`/profile/${user._id}`}
              className="flex items-center justify-between p-4 hover:bg-gray-900 transition group"
            >
              <div className="flex items-center gap-4">
                <Image
                  src={user.photo}
                  alt={user.name}
                  width={50}
                  height={50}
                  className="w-12 h-12 rounded-full object-cover"
                />

                <div>
                  <h2 className="font-semibold text-white">
                    {user.name}
                  </h2>
                </div>
              </div>
              

              <span className="text-lg text-gray-500 group-hover:text-white transition">
                
                <FaEye />
              </span>
            </Link>
          ))
        )}
      </div>
    </>
  );
}