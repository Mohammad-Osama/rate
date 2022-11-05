import { NextApiRequest, NextApiResponse } from "next"
import * as tmdb from '../../../../helpers/tmdb'
import axios from "axios"

export default async function controller(req: NextApiRequest, res: NextApiResponse) {
    try {
        const response = await axios.get(`https://api.themoviedb.org/3/genre/tv/list?api_key=${tmdb.key}&language=en-US`)
        const data = await response.data
        res.status(200).send(data)
    } catch (error) {
        res.status(400).json(`Error==>${error}`);
    }
}