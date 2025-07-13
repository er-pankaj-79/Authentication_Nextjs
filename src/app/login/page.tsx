'use client' ;
import React, {useEffect} from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import  axios  from "axios";
import toast from "react-hot-toast";


export default function SignupPage(){
  // router instance to navigate to other pages
  const router = useRouter();

    const [user, setUser] = React.useState(
        {
            username: "",
            password: "",
            email: ""
        }
    );
    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    const onLogin = async () => {
      try {
        setLoading(true);
        const response = await axios.post("/api/users/login", user);
        console.log("Login successful:", response.data);
        toast.success("Login successful");
        router.push("/profile");

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error:any) {
        console.log("Login failed:", error.message);
        toast.error(error.message);
      }finally{
        setLoading(false);
      }
    }

    useEffect(() => {
      if(user.email.length >0 && user.password.length >0){
        setButtonDisabled(false);
      } else{
        setButtonDisabled(true);
      }
    }, [user]);


    return(
        <div className="bg-black flex flex-col items-center justify-center min-h-screen py-2 text-white">
            <h1>{loading ? "Processing" : "Login"}</h1>
            <br />
            {/*for email input field */}
            <label htmlFor="email">email</label>
            <input 
            className="p-2 border border-2 border-gray-400 rounded-md focus:outline-none focus:border-blue-500 "
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
            className="p-2 border border-2 border-gray-400 rounded-md focus:outline-none focus:border-blue-500"
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
                onClick={onLogin}>Login Here</button>

            <br />
            {/*for Signup link */}
            <Link href="/signup">
                Not a member? Sign Up
            </Link>

        </div>
    )
}