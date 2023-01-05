import React, { useState, useEffect } from 'react'
import { Carousel } from '@mantine/carousel';
import {
    Container,
    SimpleGrid,
    Grid,
    Image,
    Badge,
    Button,
    Group,
    Text,
    Space,
    Card,
    Stack,
    Flex,
    Divider,
    Accordion
} from '@mantine/core';
import * as tmdb from "../helpers/tmdb"
import { IVideos } from '../helpers/types';


interface X {
    id: number
    type: string
}
const CarouselVideos = ({ id, type }: X) => {

    const [videos, setVideos] = useState({} as IVideos)

    async function getVideos(id: number, type: string) {
        if (type === "movie") {
            try {
                const response = await fetch(`${tmdb.urlMovie}${id}/videos?api_key=${tmdb.keyClient}&language=en-US`)
                const data = await response.json() //as IImages
                setVideos(data)
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
        getVideos(id, type)
    }, [])

    return (
        <Container >

            <Carousel //slideSize="170%"
                height={500}
                slideGap="sm"
                controlsOffset="xs"
                controlSize={40}
                // dragFree
                withIndicators
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
                {videos?.results?.length > 0
                    ? videos?.results?.map((v) => {
                        return <Carousel.Slide key={v.key}>
                            <iframe
                                width="100%"
                                height="100%"
                                src={`https://www.youtube.com/embed/${v.key}`}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                title={`${v.name}`}
                            // style={{ overflow: "hidden" }}
                            />
                        </Carousel.Slide>
                    })
                    : <Carousel.Slide >
                        <Image 
                        src={`/images/no_video.jpg`}
                            fit="contain"
                            height={400}
                        />
                    </Carousel.Slide>


                }
            </Carousel>
        </Container >
    )
}

export default CarouselVideos
