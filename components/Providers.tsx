import React, { useState, useEffect } from 'react'
import {
    Container,
    SimpleGrid,
    Grid,
    Image,
    Badge,
    Slider,
    Drawer,
    Button,
    Group,
    Progress,
    Text,
    Space,
    Card,
    Stack,
    Flex,
    Divider,
    Accordion
} from '@mantine/core';
import * as tmdb from "../helpers/tmdb"
import { IAllProviders } from '../helpers/types';


interface X {
    id: number
    mediaType: string
}
const Providers = ({ id, mediaType }: X) => {
    const [country, setCountry] = useState('')
    const [state, setstate] = useState<any>()


    async function getCountry() {
        try {
            const resCounrty = await fetch(`https://api.ipdata.co/?api-key=${process.env.NEXT_PUBLIC_IPDATA_KEY}&fields=country_code`)
            const data = await resCounrty.json()
            console.log("data from ip api", data.country_code)
            setCountry(data.country_code)
        } catch (error) {
            setCountry("error")
        }

    }

    async function getProviders() {
        const resCounrty = await fetch(`https://api.ipdata.co/?api-key=${process.env.NEXT_PUBLIC_IPDATA_KEY}&fields=country_code`)
        const dataC = await resCounrty.json()
         if (mediaType === "movie") {
        try {
            const response = await fetch(`${tmdb.urlMovie}${id}/watch/providers?api_key=${tmdb.keyClient}`)
            const data = await response.json() as IAllProviders
            const final = data.results[dataC.country_code]
            console.log(final)
           setstate(final)
        } catch (error) {
            alert(error)
        }
        // fetch movie images 
        // setstate with res 
    }
    else {
    //fetch tv images 
    //setstate with res 
      }
      }

useEffect(() => {
    getProviders()
}, [])

return (
    <div>
        {state===undefined
        ? "not available in your country , please visit Justwatch for more information "
        :state.link
        }
    </div>
)
}

export default Providers
