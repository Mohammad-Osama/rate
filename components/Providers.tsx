import React, { useState, useEffect } from 'react'
import {
    Container,
    Image,
    Group,
    Text,
    Stack,
    Divider,
} from '@mantine/core';
import * as tmdb from "../helpers/tmdb"
import { IAllProviders, IProvidersList } from '../helpers/types';
import Link from 'next/link';


interface X {
    id: number
    mediaType: string
}
const Providers = ({ id, mediaType }: X) => {
    const [country, setCountry] = useState('')
    const [state, setstate] = useState<IProvidersList>()

    async function getProviders() {
        const resCounrty = await fetch(`https://api.ipdata.co/?api-key=${process.env.NEXT_PUBLIC_IPDATA_KEY}&fields=country_code`)
        const dataC = await resCounrty.json()
        const resFlag = await fetch(`https://restcountries.com/v3.1/alpha/${dataC.country_code}?fields=flags`)
        const dataFlag = await resFlag.json()
        setCountry(dataFlag.flags.png)
        if (mediaType === "movie") {
            try {
                const response = await fetch(`/api/movies/providers?id=${id}`)
                const data = await response.json() as IAllProviders
                const final = data.results[dataC.country_code]
                setstate(final)
            } catch (error) {
                alert(error)
            }
        }
        else {
            //fetch tv providers 
            try {
                const response = await fetch(`/api/tv/providers?id=${id}`)
                const data = await response.json() as IAllProviders
                const final = data.results[dataC.country_code]
                setstate(final)
            } catch (error) {
                alert(error)
            }
        }
    }

    useEffect(() => {
        getProviders()
    }, [])

    if (state === undefined)
        return (
            <Container>
                <Group
                    //   position="center"
                    mb="xl"
                //mr="xl" 
                //  ml="xl" 
                >
                    <Text
                        align="justify"
                        weight={300}
                        color="white"
                        style={{ fontFamily: 'Greycliff CF, sans-serif', fontSize: "20px" }}
                    // mb="lg"
                    >
                        Powered By <a href={"https://www.justwatch.com/"} style={{ color: "yellow" }}>JustWatch</a>
                    </Text>
                    <img src={country} style={{ width: "30px", height: "20px", marginLeft: "30px" }} />
                </Group>

                <Text
                    align="justify"
                    weight={300}
                    color="white"
                    style={{ fontFamily: 'Greycliff CF, sans-serif', fontSize: "23px" }}
                    ml="xl"
                >
                    Not available in your country
                </Text>
            </Container>

        )
    else
        return (
            <Container>
                <Group
                    //   position="center"
                    mb="xl"
                //mr="xl" 
                //  ml="xl" 
                >
                    <Text
                        align="justify"
                        weight={300}
                        color="white"
                        style={{ fontFamily: 'Greycliff CF, sans-serif', fontSize: "20px" }}
                    // mb="lg"
                    >
                        Powered By <a href={"https://www.justwatch.com/"} style={{ color: "yellow" }}>JustWatch</a>
                    </Text>
                    <img src={country} style={{ width: "30px", height: "20px", marginLeft: "30px" }} />
                </Group>
                <Text
                    align="justify"
                    weight={300}
                    color="white"
                    style={{ fontFamily: 'Greycliff CF, sans-serif', fontSize: "20px" }}
                    mb="lg"
                >
                    Stream
                </Text>
                <Group
                    spacing="xl"
                    mb="xl"
                    ml="xl"
                >
                    {state.flatrate
                        ? state?.flatrate?.map((s) => {
                            return <Stack
                                align="center"
                                key={s.provider_id}
                            >

                                <Image
                                    src={`${tmdb.imgUrl}${tmdb.imgOriginal}${s.logo_path}`}
                                    //   style={{marginLeft:"20px"}}
                                    width={100}
                                    height={100}
                                    fit="contain"
                                />

                                <Text
                                    align="justify"
                                    weight={300}
                                    color="white"
                                    style={{ fontFamily: 'Greycliff CF, sans-serif', fontSize: "14px" }}>
                                    {s.provider_name}
                                </Text>
                            </Stack>
                        })
                        : <Text
                            align="justify"
                            weight={300}
                            color="white"
                            style={{ fontFamily: 'Greycliff CF, sans-serif', fontSize: "18px" }}
                            mb="lg"
                        >
                            Not available
                        </Text>
                    }

                </Group>
                <Divider variant="solid" mt="lg" mb="lg" />
                <Text
                    align="justify"
                    weight={300}
                    color="white"
                    style={{ fontFamily: 'Greycliff CF, sans-serif', fontSize: "20px" }}
                    mb="lg"
                >
                    Rent
                </Text>
                <Group
                    spacing="xl"
                    mb="xl"
                    ml="xl"
                >
                    {state.rent
                        ? state?.rent?.map((s) => {
                            return <Stack
                                align="center"
                                key={s.provider_id}
                            >

                                <Image
                                    src={`${tmdb.imgUrl}w92${s.logo_path}`}
                                    //   style={{marginLeft:"20px"}}
                                    width={100}
                                    height={100}
                                    fit="contain"
                                />

                                <Text
                                    align="justify"
                                    weight={300}
                                    color="white"
                                    style={{ fontFamily: 'Greycliff CF, sans-serif', fontSize: "14px" }}>
                                    {s.provider_name}
                                </Text>
                            </Stack>
                        })
                        : <Text
                            align="justify"
                            weight={300}
                            color="white"
                            style={{ fontFamily: 'Greycliff CF, sans-serif', fontSize: "18px" }}
                            mb="lg"
                        >
                            Not available
                        </Text>
                    }

                </Group>
                <Divider variant="solid" mt="lg" mb="lg" />
                <Text
                    align="justify"
                    weight={300}
                    color="white"
                    style={{ fontFamily: 'Greycliff CF, sans-serif', fontSize: "20px" }}
                    mb="lg"
                >
                    Buy
                </Text>
                <Group
                    spacing="xl"
                    mb="xl"
                    ml="xl"
                >
                    {state.buy
                        ? state?.buy?.map((s) => {
                            return <Stack
                                align="center"
                                key={s.provider_id}
                            >

                                <Image
                                    src={`${tmdb.imgUrl}w92${s.logo_path}`}
                                    //   style={{marginLeft:"20px"}}
                                    width={100}
                                    height={100}
                                    fit="contain"
                                />

                                <Text
                                    align="justify"
                                    weight={300}
                                    color="white"
                                    style={{ fontFamily: 'Greycliff CF, sans-serif', fontSize: "14px" }}>
                                    {s.provider_name}
                                </Text>
                            </Stack>
                        })
                        : <Text
                            align="justify"
                            weight={300}
                            color="white"
                            style={{ fontFamily: 'Greycliff CF, sans-serif', fontSize: "18px" }}
                            mb="lg"
                        >
                            Not available
                        </Text>
                    }

                </Group>
                <Divider variant="solid" mt="lg" mb="lg" />
                <Text
                    align="justify"
                    weight={300}
                    color="white"
                    style={{ fontFamily: 'Greycliff CF, sans-serif', fontSize: "23px" }}
                // mb="lg"
                >
                    Visit <a href={state.link} style={{ color: "#4DABF7" }} >TMDB</a> for more details
                </Text>
            </Container>
        )
}

export default Providers
