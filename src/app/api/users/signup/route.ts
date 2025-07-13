import {connect} from '@/dbConfig/dbConfig';
import User from '@/models/userModel';

import { NextRequest , NextResponse } from 'next/server';   
import bcryptjs from 'bcryptjs';



connect();

export async function POST(req:NextRequest) {
    try {
        const reqBody = await req.json();
        if (!req.body) {
            return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
        }
        const { username, password, email } = reqBody;

        // Validate input fields
        if (!username ||!password ||!email) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }
        console.log(reqBody);

        // Check if user already exists
        const user = await User.findOne({ email });
        if (user) {
            return NextResponse.json({ error: 'User already exists' }, { status: 400 });
        }

        // Hash the password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        // Create new user
        const newUser = new User({
            username, 
            password: hashedPassword, 
            email 
        });
    
        // Save the user to the database
        const savedUser = await newUser.save();
        console.log(savedUser);

        return NextResponse.json({
            message: 'User created successfully',
            success: true,
            savedUser,
        });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error:any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}