import { NextApiRequest, NextApiResponse } from "next"
import { Tv ,ITv} from "../../../../../models/tvModel"
import clientPromise from "../../../../../lib/db"
import { IRate, Rate } from "../../../../../models/rateModel"
import mongoose from "mongoose"

export default async function controller(req: NextApiRequest, res: NextApiResponse) {
  await clientPromise()
  try {
    const userIdBody = req.body.user as string
    const ObjectId = mongoose.Types.ObjectId
    const finalUserId = new ObjectId(userIdBody);
    // exisitg tv maybe not needed 
    const exisitingTv = await Tv.findOne({ tmdb_id: req.body.tmdb_id })
    const existingRate = await Rate.findOne({ user: finalUserId, tmdb_id: req.body.tmdb_id  , media_type:req.body.media_type })

    // remove exising user`s rate from the tv 
    const removedUserRateFromTv = await Tv.findOneAndUpdate(
      { tmdb_id: req.body.tmdb_id  , media_type:req.body.media_type},
      {
        $inc: {
          "acting": -existingRate?.acting,
          "story": -existingRate?.story,
          "dialogue": -existingRate?.dialogue,
          "cinematography": -existingRate?.cinematography,
          "visual_effects": -existingRate?.visual_effects,
          "sound_effects": -existingRate?.sound_effects,
          "directing": -existingRate?.directing,
        }
      },
      { returnDocument: "after" }
    )

    //update that tv with the new user`s rating 

    const updatedTv = await Tv.findOneAndUpdate(
      { tmdb_id: req.body.tmdb_id , media_type:req.body.media_type },
      {
        $inc: {
          "acting": req.body.acting,
          "story": req.body.story,
          "dialogue": req.body.dialogue,
          "cinematography": req.body.cinematography,
          "visual_effects": req.body.visual_effects,
          "sound_effects": req.body.sound_effects,
          "directing": req.body.directing,
        }
      },
      { returnDocument: "after" }
    )

    //update user`s rating 

    const updatedRate = await Rate.findOneAndUpdate(
      { user: finalUserId, tmdb_id: req.body.tmdb_id, media_type:req.body.media_type },
      {
        "acting": req.body.acting,
        "story": req.body.story,
        "dialogue": req.body.dialogue,
        "cinematography": req.body.cinematography,
        "visual_effects": req.body.visual_effects,
        "sound_effects": req.body.sound_effects,
        "directing": req.body.directing,
      },
      { returnDocument: "after" }
    )
    res.status(200).json({updatedTv , updatedRate})
  } catch (error) {
    res.status(400).json(`Error==>${error}`);
  }



}