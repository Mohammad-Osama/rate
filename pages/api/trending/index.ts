import { NextApiRequest, NextApiResponse } from "next"
import * as tmdb from '../../../helpers/tmdb'
import axios from "axios"

export default async function controller(req: NextApiRequest, res: NextApiResponse) {
    try {
        const {mediaType,time_window} = req.query
        console.log(mediaType,time_window)
        const response = await axios.get(`${tmdb.url}trending/${mediaType}/${time_window}?api_key=${tmdb.key}`)
        const data = await response.data
        res.status(200).send(data)
    } catch (error) {
        res.status(400).json(`Error==>${error}`);
    }
}