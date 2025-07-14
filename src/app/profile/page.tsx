"use client" ;
import axios from "axios";
import Link from "next/link";
import {toast} from "react-hot-toast";
import {useRouter } from "next/navigation";
import  getDataFromToken  from "@/helpers/getDataFromToken";  
import React ,{ useState } from "react";

export default function ProfilePage(){
    const router = useRouter();
    // data and setData is used
    const [data ,setData] = useState("nothing");
    const logout = async () => {
        try {
            await axios.get('/api/users/logout');
            toast.success('Logged out successfully');
            router.replace('/login'); 
        } catch (error) {
            console.log(error instanceof Error ? error.message : String(error));
            toast.error(error instanceof Error ? error.message : 'An error occurred');
        }
    }

    const getUserDetails = async () => {
        try {
            console.log("IN Profile Page");
            const res = await axios.get('/api/users/me');

            console.log("Api Response : ",res.data);

            // const res = await getDataFromToken('/api/users/me'); // using custom hook to fetch data with token.
            setData(res.data.data?._id);
            // setData(res.data.user?._id);
            console.log("IN Profile Page");
        } catch (error) {
            console.log(error instanceof Error? error.message : String(error));
            toast.error(error instanceof Error? error.message : 'An error occurred');
        }
    }
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Profile Page</h1>
            <p>Welcome to the Profile Page!</p>
            <br />
            <h2 className="text-2xl rounded p-2 bg-green-300">{data==="nothing" ? "Nothing" : 
                <Link href={`/profile/${data}`}> {data}</Link>
                }
            </h2>

            <br />
            <button onClick={logout} className="p-2 ml-2 rounded bg-orange-500 cursor-pointer hover:text-green-900">Logout</button>
            <br />
            <button onClick={getUserDetails} className="p-2 ml-2 rounded bg-blue-500 cursor-pointer hover:text-green-900">Get User Details</button>

        </div>
    )
}