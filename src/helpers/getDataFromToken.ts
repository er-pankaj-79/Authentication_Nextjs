import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export  const  getDataFromToken = (req: NextRequest) => {

    try {
        console.log("IN getDataFromToken");
        const token =  req.cookies.get("token")?.value || '';
        const decodedToken :any = jwt.verify(token , process.env.TOKEN_SECRET!) as { id: string };
        return decodedToken.id;
        
    } catch (error:any) { 
        throw new Error(error.message);
        // return NextResponse.json({ error: error.message });
        // return error instanceof Error ? error.message : 'An error occurred';
    }
}
