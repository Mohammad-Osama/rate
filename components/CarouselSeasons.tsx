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
import { IGenre, IMovieOrTv, ISeason } from '../helpers/types';
import axios from 'axios';
import Link from 'next/link'


interface X {
    id:number;
    seasons: ISeason[];
    title:string;
}
const CarouselSeasons = ({ seasons ,id ,title}: X) => {
    return (
        <Container>
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
                {seasons.length > 0
                    ? seasons.map((i) => {
                        return <Carousel.Slide key={i.id}>
                            <Link
                                href={{
                                    pathname: "/media/tv/season",
                                    /* query: {
                                        id: l.id
                                    }, */
                                }}
                                as={`/media/tv/season?id=${id}&title=${title}&season_number=${i.season_number}`}
                            >
                                <Image
                                    src={i.poster_path
                                        ? `${tmdb.imgUrl}${tmdb.imgSizeW1280}${i.poster_path}`
                                        : `/images/no_media.jpg`
                                    }
                                    fit="contain"
                                //  height="100%"
                                />
                                </Link>
                            </Carousel.Slide>
                        })
                            : <Carousel.Slide >
                                <Image
                                    src={`/images/no_media.jpg`}
                                    fit="contain"
                                    height={400}
                                />
                            </Carousel.Slide>
                    }
                </Carousel>
                </Container>
            )
}

            export default CarouselSeasons
