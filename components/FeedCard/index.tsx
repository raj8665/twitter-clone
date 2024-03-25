import React from "react";
import Image from 'next/image'
import { BiMessageRounded } from "react-icons/bi";
import { AiOutlineRetweet, AiOutlineHeart, AiOutlineUpload} from "react-icons/ai";

const FeedCard :  React.FC = () => {
    return (
    <div className="border border-r-0 border-l-0 border-b-0 border-gray-600 p-5 hover:bg-slate-900 cursor-pointer transition-all">
        <div className="grid grid-cols-12 gap-3">
            <div className="col-span-1">
                <Image 
                src="https://instagram.fjai1-3.fna.fbcdn.net/v/t51.2885-19/434005453_1770507423455458_9145209880229295973_n.jpg?stp=dst-jpg_s320x320&_nc_ht=instagram.fjai1-3.fna.fbcdn.net&_nc_cat=110&_nc_ohc=EGokKgHCVlgAX9mCEmX&edm=AOQ1c0wBAAAA&ccb=7-5&oh=00_AfCBpxkdgu9E4jaZlzbchz9OZO6AgPhcNuFsVWg168lv8g&oe=66058E3D&_nc_sid=8b3546" 
                alt="user-profile" 
                height={50} 
                width={50} 
                />
            </div>
            <div className="col-span-11">
                <h5>Raj Chaturvedi</h5>
                <p>
                If Gautam Gambhir reacts to your shot, it means you are more than a player 🔥❤️
                Klaasen You Beauty 🙌
                #klaasen #SRHvsKKR #ipl #russel #IPL24
                </p>
                <div className="flex justify-between mt-5 text-xl items-center p-2 w-[90%]">
                    <div>
                        <BiMessageRounded />
                    </div>
                    <div> 
                    <AiOutlineRetweet />
                    </div>
                    <div>
                    <AiOutlineHeart />
                    </div>
                    <div>
                    <AiOutlineUpload />
                    </div>
                </div>
            </div>
        </div> 
    </div>
    );
};

export default FeedCard ; 