import React, { useState, useEffect } from 'react'
import { Carousel } from '@mantine/carousel';
import {
    Container,
    Image,
    SimpleGrid,
    Text,
    Stack,
    Badge,
} from '@mantine/core';
import * as tmdb from "../helpers/tmdb"
import { IGenre, IMovieOrTv } from '../helpers/types';
import axios from 'axios';
import Link from 'next/link'
import { authState } from '../redux/slices/authSlice';
import { useSelector } from 'react-redux';

interface X {
    id: number
    callType: string
    mediaType: string
}
const CarouselMedia = ({ id, callType, mediaType }: X) => {
    const emptyList: IMovieOrTv[] = []
    const emptyGenres: IGenre[] = []

    const [list, setList]: [IMovieOrTv[], (x: IMovieOrTv[]) => void] = useState(emptyList)
    const [genres, setGenres]: [IGenre[], (x: IGenre[]) => void] = useState(emptyGenres)


    async function getList(id: number, callType: string) {
        if (callType === "movie similar") {
            try {
                const response = await fetch(`${tmdb.urlMovie}${id}/similar?api_key=${tmdb.keyClient}&language=en-US&page=1`)
                const data = await response.json()
                setList(data.results)
            } catch (error) {
                alert(error)
            }
        }
        else {
            //fetch other movies
            //setstate with res 
        }

    }

    const userData = useSelector(authState)
    const userId = userData.id


    async function getGenres() {
        const genresMovies: any = await axios.get("/api/movies/genres")
        const genresTv: any = await axios.get("/api/tv/genres")
        const result = genresMovies.data.genres.concat(
            genresTv.data.genres.filter((bo: any) => {
                genresMovies.data.genres.every((ao: any) => {
                    ao.id != bo.id
                })
            })

        )
        setGenres(result as IGenre[])
    }
    const findGenre = (x: IMovieOrTv) => {
        let names: IGenre[] = []
        x.genre_ids?.forEach((movieGenre: number) => {
            genres.forEach((ids: IGenre) => {
                if (movieGenre === ids.id) {
                    names.push({ id: movieGenre, name: ids.name })
                }
            })
        })
        return names
    }

    useEffect(() => {
        //   getGenres()
        getList(id, callType)
    }, [])

    return (
        <Container >

            <Carousel
                //slideSize="170%"
                //  height={900}
                slideGap="sm"
                controlsOffset="xs"
                controlSize={40}
                // dragFree
                withIndicators
                slideSize="33.333333%"
                slidesToScroll={3}
                styles={{
                    indicator: {
                        width: 12,
                        height: 4,
                        transition: 'width 250ms ease',

                        '&[data-active]': {
                            width: 40,
                        },
                    },
                }}
            >
                {list.map((l) => {
                    return <Carousel.Slide key={l.id}
                    >
                        <Stack
                            align="center"
                            justify="space-between"
                            spacing="sm" sx={() => ({
                                backgroundColor: '#212529',
                            })}>
                            <Link
                                href={{
                                    pathname: "/media/${mediaType}/[id]",
                                    query: {
                                        id: l.id
                                    },
                                }}
                                as={`/media/${mediaType}/${l.id}?type=${mediaType}&user=${userId}`}
                            >
                                <Image
                                    src={`${tmdb.imgUrl}${tmdb.imgSizeW1280}${l.poster_path}`}
                                    fit="contain"
                                //  height="100%"
                                />
                            </Link>
                            {/*  <Text color="white"
                                    align="center"
                                    size="xl"
                                    weight={700}
                                    m="md"
                                 //  w={calc("80%")}
                                    h={155}
                               //   style={{ textOverflow:"ellipsis", overflow:"hidden" , whiteSpace:"nowrap" }} 
                                >                              
                                        {l.title
                                            ? l.title
                                            : l.name
                                        }                                  
                                </Text> */}
                        </Stack>
                    </Carousel.Slide>
                })
                }
            </Carousel>
        </Container>
    )
}

export default CarouselMedia
