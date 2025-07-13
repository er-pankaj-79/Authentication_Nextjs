"use client" ;
import axios from "axios";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Link from "next/link";
import {toast} from "react-hot-toast";
import {useRouter } from "next/navigation";

export default function ProfilePage(){
    const router = useRouter();
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

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Profile Page</h1>
            <p>Welcome to the Profile Page!</p>

            <br />
            <button onClick={logout} className="p-2 ml-2 rounded bg-orange-500 cursor-pointer hover:text-green-900">Logout</button>
        </div>
    )
}