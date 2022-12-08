import { NextApiRequest, NextApiResponse } from "next"
import mongoose from "mongoose"
import clientPromise from "../../../../lib/db"
import { IRate, Rate } from "../../../../models/rateModel"

// not needed 
export async function controller(req: NextApiRequest, res: NextApiResponse) {
    try {
      const userIdBody = req.body.user as string
      const ObjectId = mongoose.Types.ObjectId
      const finalUserId = new ObjectId(userIdBody);
    // check if the user already voted for that movie 
      const existingRate = await Rate.findOne({user: finalUserId})
     } catch (error) {
        res.status(400).json(`Error==>${error}`);
     }
}