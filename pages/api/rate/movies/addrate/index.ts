import { NextApiRequest, NextApiResponse } from "next"
import { Movie ,IMovie} from "../../../../../models/movieModel"
import clientPromise from "../../../../../lib/db"
export default async function controller(req: NextApiRequest, res: NextApiResponse) {
    await clientPromise()


    const exisitingMovie = await Movie.findOne({ tmdb_id: req.body.tmdb_id })
    if (exisitingMovie) {
        // update current 
        try {
            
        } catch (error) {
            res.status(400).json(`Error==>${error}`);
        }
    }
    else {

        const newMovie: IMovie = await Movie.create({
            title: req.body.title,
            tmdb_id: req.body.tmdb_id,
            rating_count: 1,
            acting: req.body.acting,
            story: req.body.description,
            dialogue: req.body.price,
            cinematography: req.body.currency,
            visual_effects: req.body.stock,
            sound_effects: req.body.category,
            directing: req.body.brand,
        })


        res.status(201).json(newMovie)
    }


}