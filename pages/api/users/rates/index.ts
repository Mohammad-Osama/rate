import { NextApiRequest, NextApiResponse } from "next"
import { Movie, IMovie } from "../../../../models/movieModel"
import clientPromise from "../../../../lib/db"
import { IRate, Rate } from "../../../../models/rateModel"
import mongoose from "mongoose"
import { authJwt } from "../../../../middlewareFunctions/authMiddleware"
import { User } from "../../../../models/userModel"

export default async function controller(req: NextApiRequest, res: NextApiResponse) {
  await clientPromise()

  const authStatus = await authJwt(req, res)
  if (authStatus === "authorized") {

    try {
      const { id } = req.query
      const ratesData = await Rate.find({ user: id })
        .sort({ updatedAt: -1 })

      // const rates = JSON.parse(JSON.stringify(ratesData))
      res.status(200).json(ratesData)
    } catch (error) {

      res.status(400).json(`Error==>${error}`);
    }
  }
    else {
      res.status(400).json("not authorized")
    }
    
  
}