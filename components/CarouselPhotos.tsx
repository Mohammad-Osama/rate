import React, { useState, useEffect } from 'react'
import { Carousel } from '@mantine/carousel';
import {
    Container,
    Image,
} from '@mantine/core';
import * as tmdb from "../helpers/tmdb"
import { IImages } from '../helpers/types';


interface X {
    id: number
    type: string
    season_number: string
    episode_number: string
}
const CarouselPhotos = ({ id, type, episode_number, season_number }: X) => {

    const [images, setImages] = useState({} as IImages)
    async function getImages(id: number, type: string) {
        if (type === "movie") {
            try {
                const response = await fetch(`/api/movies/images?id=${id}`)
                const data = await response.json() //as IImages
                setImages(data)
            } catch (error) {
                alert(error)
            }
        }
        else if (type === "tv") {
            //fetch tv images 
            const response = await fetch(`/api/tv/images?id=${id}`)
            const data = await response.json() //as IImages
            setImages(data)
        }
        else {
            const response = await fetch(`/api/episode/images?tvid=${id}&season_number=${season_number}&episode_number=${episode_number}`)
            const data = await response.json() //as IImages
            setImages(data)
        }

    }
    useEffect(() => {
        getImages(id, type)
    }, [])
    return (
        <Container >

            <Carousel //slideSize="170%"
                //   height={500}
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
            >{type === "movie" || type === "tv"
                ? images?.backdrops?.length > 0
                    ? images?.backdrops?.map((i) => {
                        return <Carousel.Slide key={i.file_path}>
                            <Image src={`${tmdb.imgUrl}${tmdb.imgSizeW1280}${i.file_path}`}
                                fit="contain"
                                height="100%"
                            />
                        </Carousel.Slide>
                    })
                    : <Carousel.Slide >
                        <Image src={`/images/no_media.jpg`}
                            fit="contain"
                            height={400}
                        />
                    </Carousel.Slide>

                : images?.stills?.length > 0
                    ? images?.stills?.map((i) => {
                        return <Carousel.Slide key={i.file_path}>
                            <Image src={`${tmdb.imgUrl}${tmdb.imgSizeW1280}${i.file_path}`}
                                fit="contain"
                                height="100%"
                            />
                        </Carousel.Slide>
                    })
                    : <Carousel.Slide >
                        <Image src={`/images/no_media.jpg`}
                            fit="contain"
                            height={400}
                        />
                    </Carousel.Slide>
                }
            </Carousel>
        </Container>
    )
}

export default CarouselPhotos
