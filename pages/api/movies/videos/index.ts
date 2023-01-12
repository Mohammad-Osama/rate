import { NextApiRequest, NextApiResponse } from "next"
import * as tmdb from '../../../../helpers/tmdb'
import axios from "axios"

export default async function controller(req: NextApiRequest, res: NextApiResponse) {
    try {
        const {id} = req.query
        const response = await axios.get(`${tmdb.urlMovie}${id}/videos?api_key=${tmdb.key}&language=en-US`)
        const data = await response.data
        res.status(200).send(data)
    } catch (error) {
        res.status(400).json(`Error==>${error}`);
    }
}