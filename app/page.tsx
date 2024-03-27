'use client';
import React, { useCallback } from "react";
import Image from "next/image"; 
import { BsTwitterX } from "react-icons/bs";
import { GoHome } from "react-icons/go";
import { IoSearch } from "react-icons/io5";
import { BsBell } from "react-icons/bs";
import { CiMail } from "react-icons/ci";
import { PiBookmarkSimpleBold } from "react-icons/pi";
import { IoPersonOutline } from "react-icons/io5";
import { CiCircleMore } from "react-icons/ci";

import {GoogleLogin} from "@react-oauth/google"

import FeedCard from "@/components/FeedCard";
import toast from "react-hot-toast";
import { graphqlClient } from "@/clients/api";
import { verifyUserGoogleTokenQuery } from "@/graphql/query/user";



interface TwitterSidebarButton {
 title: string
 icon: React.ReactNode;
}

const sidebarMenuItems: TwitterSidebarButton[] = [
 {
   title:'Home',
   icon: <GoHome />
 },
 {
   title:'Explore',
   icon: <IoSearch />
 },
 {
   title:'Notifications',
   icon: <BsBell />
 },
 {
   title:'Messages',
   icon: <CiMail />
 },
 {
   title:'Bookmarks',
   icon: <PiBookmarkSimpleBold />
 },
 {
   title:'Profile',
   icon : <IoPersonOutline />
 },
 {
   title:'More',
   icon : <CiCircleMore />
 },
]

export default function Home() {
 
  const handleLoginWithGoogle = useCallback( async (cred: CredentialResponse) => {
      const googleToken = cred.credential
      if(!googleToken) return toast.error(`Google Token Not Found`);

      const { verifyGoogleToken } = await graphqlClient.request(
        verifyUserGoogleTokenQuery, 
        {token: googleToken}
        );

        toast.success("Verified Success");
        console.log(verifyGoogleToken); 

        if(verifyGoogleToken)
            window.localStorage.setItem("__twitter_token", verifyGoogleToken);
  }, 
  [])

 return (
   <div>
   <div className="grid grid-cols-12 h-screen w-screen px-56">
     <div className="col-span-3 pt-1 ml-18">
       <div className="text-2xl h-fit w-fit hover:bg-gray-800 rounded-full p-4 cursor-pointer transition-all">
     <BsTwitterX  /> 
     </div> 
     <div className="mt-1 text-lg font-semibold pr-4">
       <ul>  
         {sidebarMenuItems.map(item => (
         <li className="flex justify-start items-center gap-4 hover:bg-gray-800 rounded-full px-3 py-3 w-fit cursor-pointer mt-2" 
         key={item.title}>
           <span className="text-3xl">{item.icon}</span>
             <span>{item.title}</span>
         </li>
           ))}
       </ul>
       <div className="mt-5 px-2"> 
       <button className="bg-[#1d9bf0] font-semibold text-lg py-2 px-4 rounded-full w-full">
         Post
         </button>
         </div>
     </div>
     </div>
     <div className="col-span-5 border-r-[1px] border-l-[1px] h-screen overflow-scroll scrollbar-hide border-gray-600">
       <FeedCard />
       <FeedCard />
       <FeedCard />
       <FeedCard />
       <FeedCard />
       <FeedCard />
       <FeedCard />
       <FeedCard />
       <FeedCard />
     </div>
     <div className="col-span-3">
      <div className=" p-5 bg-slate-700 rounded-lg ">
           <h1 className="my-2 text-2xl">New to Twitter?</h1>
           <GoogleLogin onSuccess={handleLoginWithGoogle} />
      </div>
     </div> 
   </div>
   </div>
  
 );
}
