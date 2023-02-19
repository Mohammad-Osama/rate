import React, { useState, useEffect } from 'react'
import { Carousel } from '@mantine/carousel';
import {
    Container,
    Image,
    SimpleGrid,
    Text,
    Stack,
    Badge,
    Overlay
} from '@mantine/core';
import * as tmdb from "../helpers/tmdb"
import { IGenre, IMovieOrTv } from '../helpers/types';
import axios from 'axios';
import Link from 'next/link'
import { authState } from '../redux/slices/authSlice';
import { useSelector } from 'react-redux';
import { IRate, IUser } from '../helpers/types';
import RatingOneItem from './RateOneItem';
interface X {
    rates: IRate[]
}

const CarouselRates = ({ rates }: X) => {
    const userData = useSelector(authState)
    const userId = userData.id

    const [show, setShow] = useState(false)

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
                {rates.length > 0
                    ? rates.map((rate) => {
                        return <Carousel.Slide key={rate._id}
                        >
                            <Stack
                                align="center"
                                justify="space-between"
                                spacing="sm"
                                sx={() => ({
                                    backgroundColor: '#212529',
                                })}>
                                <RatingOneItem
                                    rate={rate}
                                />
                            </Stack>
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

export default CarouselRates
