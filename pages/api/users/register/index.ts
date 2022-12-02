import { NextApiRequest, NextApiResponse } from "next"
import {User, IUser} from "../../../../models/userModel"
import bcrypt from "bcryptjs"
import * as jose from 'jose';


export default async function controller(req: NextApiRequest, res: NextApiResponse) {
    if  (req.method === 'POST'){
        const { email, password } = req.body
        try {
            const userExists = await User.findOne({ email })
    if (userExists) {
      res.status(400).json("user already exists")
    }
    else {
      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(password, salt)

      const newUser: IUser = await User.create({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: hashedPassword,
        /* birthday: req.body.birthday,
        phone: req.body.phone,
        country: req.body.country,
        address: req.body.address, */
      })
      if (newUser) {
       // const token = generateToken(newUser.id)
       const id = newUser.id
                    const token =   await new  jose.SignJWT({id})
                                    .setProtectedHeader({ alg: 'HS256' })
                                    .setIssuedAt()
                                    .setExpirationTime('30d')
                                    .sign(new TextEncoder().encode(process.env.JWT_SECRET) );
        res.status(201).json({
          id: newUser.id,
          first_name: newUser.first_name,
          last_name: newUser.last_name,
          email: newUser.email,
          token: token
        })
      }
      else {
        res.status(400).json("something wrong happened")
      }
    }
          } catch (error) {
             res.status(400).json(`Error==>${error}`);
          }

    }
    else 
    res.status(400).json(`wrong method  `);
}