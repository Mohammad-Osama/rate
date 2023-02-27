import { useState, useEffect } from 'react'
import { Carousel } from '@mantine/carousel';
import {
    Container,
    Image,
    Stack,
} from '@mantine/core';
import * as tmdb from "../helpers/tmdb"
import { IGenre, IMovieOrTv } from '../helpers/types';
import Link from 'next/link'
import { authState } from '../redux/slices/authSlice';
import { useSelector } from 'react-redux';
import { useMediaQuery } from '@mantine/hooks';

interface X {
    id: number
    callType: string
    mediaType: string
}
const CarouselMedia = ({ id, callType, mediaType }: X) => {
    const emptyList: IMovieOrTv[] = []

    const [list, setList]: [IMovieOrTv[], (x: IMovieOrTv[]) => void] = useState(emptyList)

    async function getList(id: number, callType: string) {
        if (callType === "movie similar") {
            try {
                const response = await fetch(`/api/movies/similar?id=${id}`)
                const data = await response.json()
                setList(data.results)
            } catch (error) {
                alert(error)
            }
        }
        else if (callType === "movie recommendations") {
            try {
                const response = await fetch(`/api/movies/recommendations?id=${id}`)
                const data = await response.json()
                setList(data.results)
            } catch (error) {
                alert(error)
            }
        }
        else if (callType === "tv similar") {
            try {
                const response = await fetch(`/api/tv/similar?id=${id}`)
                const data = await response.json()
                setList(data.results)
            } catch (error) {
                alert(error)
            }
        }
        else if (callType === "tv recommendations") {
            try {
                const response = await fetch(`/api/tv/recommendations?id=${id}`)
                const data = await response.json()
                setList(data.results)
            } catch (error) {
                alert(error)
            }
        }
    }

    const userData = useSelector(authState)
    const userId = userData.id

    const Screen768px = useMediaQuery('(max-width: 768px)');
    const Screen500px = useMediaQuery('(max-width: 500px)');

    function slideRatio() {
        if (Screen768px&&!Screen500px)
        return "50%"
        else if (Screen500px &&Screen768px )
        return "100%"
        else return  "33.333333%"
    }
    function slideNumber() {
        if (Screen768px&&!Screen500px)
        return 2
        else if (Screen500px &&Screen768px )
        return 1
        else return  3
    }
    useEffect(() => {
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
                dragFree
                withIndicators
                slideSize={slideRatio()}
                slidesToScroll={slideNumber()}
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
                {list.length > 0
                    ? list.map((l) => {
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
                                        src={l.poster_path
                                            ? `${tmdb.imgUrl}${tmdb.imgSizeW1280}${l.poster_path}`
                                            : "/images/no_media.jpg"
                                        }
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

export default CarouselMedia
