import type { NextRequest } from 'next/server'
//import jwt, { Secret } from "jsonwebtoken";
import { IUser, User } from "../models/userModel";
import type { NextApiRequest, NextApiResponse } from 'next'
import * as jose from 'jose';
import clientPromise from '../lib/db';
import { NextResponse } from 'next/server'


interface TokenInterface {
    id: string;
    expiresIn: string;
}
interface JoseTokenInterface extends jose.JWTVerifyResult {
    id: string;
}
export interface CustomRequest extends NextApiRequest {
    user: IUser 
}
export async function authJwt(req: NextApiRequest , res :NextApiResponse) {
   await clientPromise()
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            const token=req.headers.authorization.split(' ')[1]
            const {payload : decoded} = await jose.jwtVerify(
                token, new TextEncoder().encode(process.env.JWT_SECRET)
            )  ; /* as JoseTokenInterface  */// any ?!, semicolon important here 
            (req as unknown as CustomRequest).user = await User.findById(decoded.id)
                .select(['-password',/* '-role', '-status', */
                          '-createdAt', '-updatedAt', '-__v'])
           //  console.log("user in authmiddleware before next" , (req as CustomRequest).user)                                       
             //  NextResponse.next()  
             return "authorized"   
        } catch (error) {
          //  console.log("eeeeeeeeeee" , error)
            return "not authorized"
          //  res.status(401).json("Not authorized")
         
        }
    }
    else {
        throw new Error("no token")
    }

}