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
    seasons:ISeason[]
}
const CarouselSeasons = ({seasons}:X) => {
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
                                <Image
                                    src={i.poster_path
                                        ? `${tmdb.imgUrl}${tmdb.imgSizeW1280}${i.poster_path}`
                                        : `/images/no_media.jpg`
                                        }
                                    fit="contain"
                                //  height="100%"
                                />
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
