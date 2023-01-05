import { NextApiRequest, NextApiResponse } from "next"
import * as tmdb from '../../../../helpers/tmdb'
import axios from "axios"
// to be done later , fetched from the movie page 

export default async function controller(req: NextApiRequest, res: NextApiResponse) {
    try {
       // const type=req.query.type
        const response = await axios.get(`${tmdb.urlMovie}?api_key=${tmdb.key}&language=en-US&page=1`)
        const data = await response.data
        res.status(200).send(data)
    } catch (error) {
        res.status(400).json(`Error==>${error}`);
    }
}