import {connect} from '@/dbConfig/dbConfig';
import User from '@/models/userModel';

import { NextRequest , NextResponse } from 'next/server';   
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import bcryptjs from 'bcryptjs';
import jwt  from 'jsonwebtoken';

connect();


export async function POST(req: NextRequest) {
    try {
        
        const reqBody = await req.json();
        const {email , password} = reqBody;
        console.log(reqBody);

        // check if user exists
        const user = await User.findOne({email});
        if(!user){
            return NextResponse.json({ error: "User does not exist" }, { status: 400 });
        }

        // check if password is correct
        const validPassword = await bcryptjs.compare(password , user.password);
        if(!validPassword){
            return NextResponse.json({ error: "Invalid password" }, { status: 400 });
        }

        // create Token Data
        const TokenData = {
            id: user._id,
            username: user.username,
            email: user.email,
        }

        // create token
        const token = await jwt.sign(TokenData , process.env.TOKEN_SECRET! , {expiresIn: "1d"});

        const response = NextResponse.json(
            {
                message:"Login successful",
                success: true
            }
        )
        // set cookie (token) to response
        response.cookies.set("token" , token , {
            httpOnly: true
        });

        return response;
        
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error:any) {
        return NextResponse.json({ error: error.message }, { status: 500 });   
    }
}