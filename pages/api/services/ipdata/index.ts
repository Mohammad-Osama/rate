import { NextApiRequest, NextApiResponse } from "next"
import axios from "axios"

export default async function controller(req: NextApiRequest, res: NextApiResponse) {
    try {
        const response = await axios.get(`https://api.ipdata.co/?api-key=${process.env.IPDATA_KEY}&fields=country_code`)
        const data = await response.data
        res.status(200).send(data)
    } catch (error) {
        res.status(400).json(`Error==>${error}`);
    }
}