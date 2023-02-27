import { NextApiRequest, NextApiResponse } from "next"
import { Movie } from "../../../../../models/movieModel"
import clientPromise from "../../../../../lib/db"
import { Rate } from "../../../../../models/rateModel"
import mongoose from "mongoose"

export default async function controller(req: NextApiRequest, res: NextApiResponse) {
  await clientPromise()
  try {
    const userIdBody = req.body.user as string
    const ObjectId = mongoose.Types.ObjectId
    const finalUserId = new ObjectId(userIdBody);
    // exisitg movie maybe not needed 
    const exisitingMovie = await Movie.findOne({ tmdb_id: req.body.tmdb_id })
    const existingRate = await Rate.findOne({ user: finalUserId, tmdb_id: req.body.tmdb_id, media_type: req.body.media_type })

    // remove exising user`s rate from the movie 
    const removedUserRateFromMovie = await Movie.findOneAndUpdate(
      { tmdb_id: req.body.tmdb_id },
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

    //update that movie with the new user`s rating 

    const updatedMovie = await Movie.findOneAndUpdate(
      { tmdb_id: req.body.tmdb_id },
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
      { user: finalUserId, tmdb_id: req.body.tmdb_id, media_type: req.body.media_type },
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
    res.status(200).json({ updatedMovie, updatedRate })
  } catch (error) {
    res.status(400).json(`Error==>${error}`);
  }
}