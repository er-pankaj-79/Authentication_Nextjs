'use client' ;
import React,{ useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import  axios  from "axios";
import toast from "react-hot-toast";
import { log } from "console";



export default function SignupPage(){
    const router = useRouter();

    const [user, setUser] = React.useState(
        {
            username: "",
            password: "",
            email: ""
        }
    );

    const [loading, setLoading] = React.useState(false);

    //for signup button click event
    const onSignup = async () => {
      try {
        setLoading(true);


        const response = await axios.post("/api/users/signup", user);
        console.log("Signup successful:", response.data);
        router.push("/login");

      } catch (error:any) {
        console.log("Signup failed:", error.massage);
        toast.error(error.message);
      }finally{
        setLoading(false);
      }
    }

    const [buttonDisabled, setButtonDisabled] = React.useState(true);

    useEffect(() => {
      if(user.email.length >0 && user.password.length >0 && user.username.length >0){
        setButtonDisabled(false);
      }else{
        setButtonDisabled(true);
      }
    }, [user]);
    return(
        <div className="bg-black flex flex-col items-center justify-center min-h-screen py-2 text-white">
            <h1 >SignUp</h1>
            <br />

            {/*for username input field */}
            <label htmlFor="username">username</label>
            <input 
            className="p-2 border border-2 border-gray-400 rounded-md focus:outline-none focus:border-blue-500 text-color-black"
              id="username" 
              type="text" 
              value={user.username} 
              onChange={
                (e) => setUser({...user,username:e.target.value})
                }
              placeholder="username"
            >
            </input>

            {/*for email input field */}
            <label htmlFor="email">email</label>
            <input 
            className="p-2 border border-2 border-gray-400 rounded-md focus:outline-none focus:border-blue-500 text-color-black"
              id="email" 
              type="text" 
              value={user.email} 
              onChange={
                (e) => setUser({...user,email:e.target.value})
                }
              placeholder="email"
            >
            </input>
            {/* <br /> */}
            {/*for password input field */}
            <label htmlFor="password">password</label>
            <input 
            className="p-2 border border-2 border-gray-400 rounded-md focus:outline-none focus:border-blue-500 text-color-black"
              id="password" 
              type="text" 
              value={user.password} 
              onChange={
                (e) => setUser({...user,password:e.target.value})
                }
              placeholder="password"
            >
            </input>
            <br />

            {/*for signup button*/}
            <button className="p-2 border-5 border-gray-400 rounded-md cursor-pointer"
                onClick={onSignup}>Signup Here</button>

            <br />
            {/*for login link */}
            <Link href="/login">
            Already have an account? Login
            </Link>

        </div>
    )
}