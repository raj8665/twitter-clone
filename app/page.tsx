'use client';
import React, { useCallback, useState } from "react";
import Image from "next/image"; 
import { BsTwitterX } from "react-icons/bs";
import { GoHome } from "react-icons/go";
import { IoSearch } from "react-icons/io5";
import { BsBell } from "react-icons/bs";
import { CiMail } from "react-icons/ci";
import { PiBookmarkSimpleBold } from "react-icons/pi";
import { IoPersonOutline } from "react-icons/io5";
import { CiCircleMore } from "react-icons/ci";
import {CredentialResponse, GoogleLogin} from "@react-oauth/google";
import { BsImage } from "react-icons/bs";
import FeedCard from "@/components/FeedCard";
import toast from "react-hot-toast";
import { graphqlClient } from "@/clients/api";
import { verifyUserGoogleTokenQuery } from "@/graphql/query/user";
import { useCurrentUser } from "@/hooks/user";
import { Inter, Quicksand} from "next/font/google";
import {  useQueryClient } from "@tanstack/react-query";
import { useCreateTweet, useGetAllTweets } from "@/hooks/tweet";
import { Tweet } from "@/gql/graphql";

const inter = Inter({ subsets: ["latin"] });
const quicksand = Quicksand({subsets: ["latin"]});


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

  const {user} = useCurrentUser();
  const {tweets = []} = useGetAllTweets();
  const {mutate} = useCreateTweet()

  const queryClient = useQueryClient();

  const [content,setContent] = useState('');

  const handleSelectImage = useCallback(() => {
    const input = document.createElement('input');
    input.setAttribute("type","file");
    input.setAttribute('accept','image/*')
    input.click();
  }, []);

  const handleCreateTweet = useCallback(() => {
    mutate({
      content,
    });
  }, [content, mutate]);
  
 
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
           await queryClient.invalidateQueries(["curent-user"]);
  }, 
  [queryClient])

 return (
   <div>
   <div className="grid grid-cols-12 h-screen w-screen px-56">
     <div className="col-span-3 pt-1 ml-18 relative">
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
     {user && 
      <div className="absolute bottom-5 flex gap-2 items-center bg-slate-800 px-3 py-2 rounded-full ">
      {user && user.profileImageURL && 
      <Image className="rounded-full"
      src={user?.profileImageURL} 
      alt="user-image" 
      height={50} 
      width={50}
      />
      }
      <div>
      <h3 className="text-xl">{user.firstName}</h3>
      <h3 className="text-xl">{user.lastName}</h3>
      </div>
     </div>
     }
     </div>
     <div className="col-span-5 border-r-[1px] border-l-[1px] h-screen overflow-scroll scrollbar-hide border-gray-600">
      <div>
      <div className="border border-r-0 border-l-0 border-b-0 border-gray-600 p-5 hover:bg-slate-900 cursor-pointer transition-all">
      <div className="grid grid-cols-12 gap-3">
      <div className="col-span-1">
                {user?.profileImageURL && 
                <Image className="rounded-full"
                src={user?.profileImageURL}
                alt="user-image" 
                height={50} 
                width={50} 
                />}
            </div>
            <div className="col-span-11">
              <textarea 
              value={content}
              onChange={e => setContent(e.target.value)}
              className=" w-full bg-transparent text-xl px-3 border-b border-slate-700" 
              placeholder="What's happening?"
              rows={3}>
              </textarea>
              <div className="mt-2 flex justify-between items-center">
              <BsImage 
              onClick={handleSelectImage} 
              className="text-xl" />
               <button onClick={handleCreateTweet} className="bg-[#1d9bf0] font-semibold text-sm py-2 px-4 rounded-full  ">
         Post
         </button>

              </div>
            </div>
            </div>   
      </div>
      </div>
      {tweets?.map((tweet: Tweet) =>
          tweet ? <FeedCard key={tweet?.id} data={tweet as Tweet} /> : null
        )}
    
     </div>
     <div className="col-span-3">
      {!user && <div className=" p-5 bg-slate-700 rounded-lg ">
           <h1 className="my-2 text-2xl">New to Twitter?</h1>
           <GoogleLogin onSuccess={handleLoginWithGoogle} />
      </div>}
     </div> 
   </div>
   </div>
  
 );
}
