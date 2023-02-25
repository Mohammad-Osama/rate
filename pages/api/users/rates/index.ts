import { NextApiRequest, NextApiResponse } from "next"
import clientPromise from "../../../../lib/db"
import {Rate } from "../../../../models/rateModel"
import { authJwt } from "../../../../middlewareFunctions/authMiddleware"

export default async function controller(req: NextApiRequest, res: NextApiResponse) {
  await clientPromise()

  const authStatus = await authJwt(req, res)
  if (authStatus === "authorized") {

    try {
      const { id } = req.query
      const ratesData = await Rate.find({ user: id })
        .sort({ updatedAt: -1 })

      res.status(200).json(ratesData)
    } catch (error) {

      res.status(400).json(`Error==>${error}`);
    }
  }
    else {
      res.status(400).json("not authorized")
    }
}