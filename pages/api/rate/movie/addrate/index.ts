import { NextApiRequest, NextApiResponse } from "next"
import { Movie ,IMovie} from "../../../../../models/movieModel"
import clientPromise from "../../../../../lib/db"
import { IRate, Rate } from "../../../../../models/rateModel"
import mongoose from "mongoose"
import { authJwt } from "../../../../../middlewareFunctions/authMiddleware"

export default async function controller(req: NextApiRequest, res: NextApiResponse) {
    await clientPromise()
    console.log(req.body)
    const authStatus = await authJwt(req,res)
    if (authStatus==="authorized"){
    const exisitingMovie = await Movie.findOne({ tmdb_id: req.body.tmdb_id }) 
    // if the movie exists in the database 
     if (exisitingMovie) {  
         const userIdBody = req.body.user as string
         const ObjectId = mongoose.Types.ObjectId
         const finalUserId = new ObjectId(userIdBody);
       // check if the user already voted for that movie 
       //need to add more filters ----------------->>> 
         const existingRate = await Rate.findOne({user: finalUserId ,tmdb_id: req.body.tmdb_id , media_type:req.body.media_type})
       
        if (existingRate)
        {
         res.status(400).json("you already voted")
        }
        else {
         try { // update the existing movie 
           const updatedMovie=  await Movie.findOneAndUpdate(
                 {tmdb_id : req.body.tmdb_id , media_type:req.body.media_type} ,
                   { 
                     $inc: { "rating_count" : 1 , 
                             "acting" : req.body.acting ,
                             "story" : req.body.story ,
                             "dialogue" : req.body.dialogue ,
                             "cinematography" : req.body.cinematography ,
                             "visual_effects" : req.body.visual_effects ,
                             "sound_effects" : req.body.sound_effects ,
                             "directing" : req.body.directing ,
                            
                           } 
                   } ,
                    { returnDocument: "after" }
                  )
                  // then add a rate document 
                  const newRate: IRate = await Rate.create({
                     title: req.body.title,
                     tmdb_id: req.body.tmdb_id,
                     poster_path : req.body.poster_path ,
                     tmdb_rating : req.body.tmdb_rating ,
                     user:req.body.user ,
                     media_type: req.body.media_type,
                     acting: req.body.acting,
                     story: req.body.story,
                     dialogue: req.body.dialogue,
                     cinematography: req.body.cinematography,
                     visual_effects: req.body.visual_effects,
                     sound_effects: req.body.sound_effects,
                     directing: req.body.directing,
                 })
                 res.status(201).json({updatedMovie , newRate})
 
         } catch (error) {
             res.status(400).json(`Error==>${error}`);
         }
     }
     }
     else  
      { // if the movie doesnt exist , add a movie document and a rate document
         const newMovie: IMovie = await Movie.create({
             title: req.body.title,
             tmdb_id: req.body.tmdb_id,
             poster_path : req.body.poster_path ,
             tmdb_rating : req.body.tmdb_rating ,
             rating_count: 1,
             acting: req.body.acting,
             story: req.body.story,
             dialogue: req.body.dialogue,
             cinematography: req.body.cinematography,
             visual_effects: req.body.visual_effects,
             sound_effects: req.body.sound_effects,
             directing: req.body.directing,
         })
       //  res.status(201).json(newMovie)
         const newRate: IRate = await Rate.create({
             title: req.body.title,
             tmdb_id: req.body.tmdb_id,
             poster_path : req.body.poster_path ,
             tmdb_rating : req.body.tmdb_rating ,
             user:req.body.user ,
             media_type: req.body.media_type,
             acting: req.body.acting,
             story: req.body.story,
             dialogue: req.body.dialogue,
             cinematography: req.body.cinematography,
             visual_effects: req.body.visual_effects,
             sound_effects: req.body.sound_effects,
             directing: req.body.directing,
         })
         res.status(201).json({newMovie , newRate})
    }
  }
  else {
    res.status(400).json("not authorized")
  }
}