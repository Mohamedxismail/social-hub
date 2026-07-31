import Image from 'next/image';
import React from 'react'
import cover from '@/assets/images/photo_2026-07-23_14-41-43.jpg'
import { FaBirthdayCake, FaBookmark, FaRegCalendarAlt } from 'react-icons/fa';
import { getUserProfile } from '@/services/profile';
import Link from 'next/link';
import UserPosts from '@/app/_components/UserPosts/UserPosts';
import FollowUser from '@/app/_components/FollowUser/FollowUser';
type Props = {
  params: Promise<{
    id: string;
  }>;
};
const Profile = async ({ params }: Props) => {
  const { id } = await params;
  const { data, isMyProfile } = await getUserProfile(id)
  const isFollowing = data.isFollowing
  const profileData = data.user
  
  return (
    <div className=" text-white w-full max-w-160 mb-20 ms-0 md:ms-5 md:px-4 px-3 ">
      <div className="relative">
        <Image className='rounded-2xl h-52 w-full object-cover' src={profileData.cover || cover} alt='cover user' width={560} height={100} />
        <div className="absolute -bottom-4 left-10 ">
          <Image src={profileData.photo} alt='profile user' width={100} height={50} className='rounded-full h-25 w-25 border-4 border-amber-50 p-1' />
        </div>
      </div>
      <div className="mt-7 user flex justify-between items-center">
        <div>
          <h1 className="md:text-3xl text-xl font-semibold">{profileData.name}</h1>
          <h3 className='text-gray-300'>@ {profileData.username}</h3>
        </div>
        <div>
          {isMyProfile ? (
            <Link href={"/editProfile"} className="bg-slate-800 md:me-0 me-2 text-slate-200 border border-slate-700 hover:bg-slate-700  transition-colors duration-200 px-5 py-3 rounded-xl cursor-pointer">
              Edit Profile
            </Link>
          ) : (
            <FollowUser isFollowing={isFollowing} userId={profileData.id} />
          )}        </div>
      </div>

      <div className="flex items-center justify-center gap-5 mt-6 text-xl">
        <Link className='w-full' href={`/profile/${profileData._id}/followers`}>
          <div className="bg-gray-950/50 w-full cursor-pointer p-3 rounded-3xl flex flex-col items-center justify-center">

            {profileData.followersCount}
            <span>Followers</span>
          </div>
        </Link>
        <Link className='w-full' href={`/profile/${profileData._id}/following`}>
          <div className="bg-gray-950/50 w-full cursor-pointer p-3 rounded-3xl flex flex-col items-center justify-center">
            {profileData.followingCount}
            <span>Following</span>

          </div>
        </Link>
        {/* {isMyProfile && <Link href={'/bookmarks'} className='w-full '> <div className="bg-gray-950/50 w-full hidden md:flex me-2  cursor-pointer p-3 gap-3 rounded-3xl  flex-col items-center justify-center">
          <FaBookmark className='text-xl pt-2 ' />
          <span>Bookmarks</span>
        </div></Link>} */}
      </div>
      <div className="mt-8 flex flex-col justify-center">
        <h1 className='text-xl'>Details</h1>
        <div className="text-gray-400 text-lg flex items-center gap-2 mt-4">
          <FaRegCalendarAlt />
          <span className='text-white'> Joined{" "}
            {new Date(profileData.createdAt).toLocaleDateString("en-US", {
              month: "long",
              year: "numeric",
            })}</span>
        </div>
        <div className="text-gray-400 text-lg flex items-center gap-2 mt-3">
          <FaBirthdayCake />
          <span className="text-white ">
            {new Date(profileData.dateOfBirth).toLocaleString(
              "en-GB",
              {
                day: "2-digit",
                month:"short",
                
                year: "numeric",
              }
            )}
          </span>
        </div>
        {isMyProfile && <Link href={'/bookmarks'} className='w-full '><div className="text-lg flex gap-2  items-center  mt-3">
          <FaBookmark className='text-gray-500' />
          <span>Bookmark</span> 
          </div>
          </Link>
        }
      </div>
      <UserPosts userId={profileData.id} />
    </div>
  )
}

export default Profile
