import { NextApiRequest, NextApiResponse } from "next"
import * as tmdb from '../../../../helpers/tmdb'
import axios from "axios"

export default async function controller(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { tvid, season_number, episode_number } = req.query
        const response = await axios.get(`${tmdb.urlTv}${tvid}/season/${season_number}/episode/${episode_number}/images?api_key=${tmdb.key}`)
        const data = await response.data
        res.status(200).send(data)
    } catch (error) {
        res.status(400).json(`Error==>${error}`);
    }
}