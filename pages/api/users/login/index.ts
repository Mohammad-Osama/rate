import { NextApiRequest, NextApiResponse } from "next"
import { User, IUser } from "../../../../models/userModel"
import bcrypt from "bcryptjs"
import clientPromise from "../../../../lib/db"
import * as jose from 'jose';


export default async function controller(req: NextApiRequest, res: NextApiResponse) {
    await clientPromise()
    if (req.method === 'POST') {
        try {
            const { email, password } = req.body
            const userExists :IUser |null = await User.findOne({ email })
            if (userExists) {
                const matched = await bcrypt.compare(password, userExists.password)
                if (matched === true) {
                    const id = userExists.id
                    const token =   await new  jose.SignJWT({id})
                                    .setProtectedHeader({ alg: 'HS256' })
                                    .setIssuedAt()
                                    .setExpirationTime('30d')
                                    .sign(new TextEncoder().encode(process.env.JWT_SECRET ) );
                       /*  const {payload : decoded} = await jose.jwtVerify(
                            token, new TextEncoder().encode(process.env.JWT_SECRET)
                        ); */
                      //  console.log("ddddddd" , decoded.id )
                    res.status(201).json({
                        id: userExists.id,
                        first_name: userExists.first_name,
                        last_name: userExists.last_name,
                        email: userExists.email,
                        token: token
                    })

                }
                else {
                    res.status(400).json("wrong password")

                }
            }
            else {
                res.status(400).json("user does not exist")
            }
        } catch (error) {
            res.status(400).json(`Error==>${error}`);
        }

    }
    else
        res.status(400).json(`wrong method  `);
}