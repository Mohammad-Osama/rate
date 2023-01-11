import React from 'react'
import { GetServerSidePropsResult, GetServerSidePropsContext } from 'next';
import * as tmdb from "../../../../helpers/tmdb"
import { ICredits, IMovie, IMovieRate, IRate, ITv } from '../../../../helpers/types';
import { IRate as IRateModelType, Rate as RateModel } from "../../../../models/rateModel"
import * as colors from '../../../../helpers/colors'
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
    Divider,
} from '@mantine/core';
import {
    Chart as ChartJS,
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';
import clientPromise from '../../../../lib/db';
import AddRate from "../../../../components/AddRate"
import { useState, useEffect } from 'react';
import mongoose from "mongoose"

import { authState } from '../../../../redux/slices/authSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { AppDispatch } from '../../../../redux/store';
import { Movie } from '../../../../models/movieModel';
import Link from 'next/link';
import AccordionPeople from '../../../../components/AccordionPeople';
import CarouselPhotos from '../../../../components/CarouselPhotos';
import CarouselVideos from '../../../../components/CarouselVideos';
import SideTitle from '../../../../components/SideTitle';
import MiddleTitle from '../../../../components/MiddleTitle';
import CarouselMedia from '../../../../components/CarouselMedia';
import Providers from '../../../../components/Providers';
import CollectionThumb from '../../../../components/CollectionThumb';
import MovieDetails from '../../../../components/MovieDetails';
import HeadPage from '../../../../components/HeadPage';
import { Tv as TvModel, ITv as TvModelType } from '../../../../models/tvModel';
import RadarChart from '../../../../components/RadarChart';


const index = ({ tvInfoProps, tvRateInfoProps, tvRateInfoUserProps, tvInfoCreditsProps,media_type, notFound }: X) => {
console.log("tvRateInfoProps" , tvRateInfoProps)
console.log("tvRateInfoUserPropsssuuuuuuuuuu" , tvRateInfoUserProps)
    const [isRatedUser, setIsRatedUser] = useState<boolean>();

    const userInfo = useSelector(authState)
    const user = userInfo.id

    const {
        name,
        overview,
        first_air_date,
        original_language,
        vote_average,
        vote_count,
        poster_path,
        id


    } = tvInfoProps


    function ValueBadge(x: number) {
        return (
            <Badge //color="green"
                size="xl"
                variant="filled"
                styles={{
                    inner: {
                        color: "white",
                        fontSize: "15px"
                    },
                }
                }>
                {x}
            </Badge>
        );
    }

    useEffect(() => {
        if (tvRateInfoUserProps === null) {
            setIsRatedUser(false)
        }
        else {
            setIsRatedUser(true)
        }
        return () => {

        }
    }, [])
    if (notFound === true)
        return (<div>Error Page</div>)
    else
        return (
            <Container size="xl">
                <HeadPage
                    title={name}
                    description={overview as string}
                />
                <Group position="apart" m="xl"
                //maybe change mr and ml later 
                >
                    <div>
                        <Text
                            //  p="xl"
                            align="justify"
                            weight={700}
                            color="white"
                            style={{ fontFamily: 'Greycliff CF, sans-serif', fontSize: "30px", minWidth: "60px" }}
                        >
                            {name}
                        </Text>
                        <Text
                            size="xl"
                            color="#ADB5BD"
                        >
                            {first_air_date.substring(0, 4)} - {original_language} - {/* {runtime} minutes */}
                        </Text>
                    </div>
                    <div>
                        <Text size="xl"
                            color="#ADB5BD"
                        // mb='md'
                        >
                            TMDB Rating
                        </Text>
                        <Group>
                            {ValueBadge(vote_average)}<Text ml="-md" size="xl" color="#ADB5BD">/10</Text>
                        </Group>
                        <Text ml="40%" size="xl" color="#ADB5BD">{vote_count}</Text>
                    </div>

                </Group>
                <SimpleGrid cols={2} spacing="lg"
                    breakpoints={[
                        { maxWidth: 1024, cols: 2, spacing: 'md' },
                        { maxWidth: 768, cols: 1, spacing: 'sm' },
                        { maxWidth: 500, cols: 1, spacing: 'sm' },
                    ]}
                //   style={{backgroundColor:"#212529"}}
                >
                    <Image
                        src={poster_path
                            ? `${tmdb.imgUrl}${tmdb.imgSize}${poster_path}`
                            : '/images/no_media.jpg'
                        }
                        fit="contain"
                        alt={name}
                    />

                    <div style={{}} //second col in simple grid
                    >
                        
                        <RadarChart
                            rateInfo={tvRateInfoProps}
                        />
                        <AddRate tmdb_id={id}
                            title={name}
                            media_type={media_type}
                            user={user}
                            isRatedUser={isRatedUser}
                            movieRateInfoUserProps={tvRateInfoUserProps}
                        />
                        {/*  { isRatedUser===true
                              ?<Text>voted</Text>
                              :<Text>didnt vote</Text>

                            } */}
                        {tvRateInfoUserProps !== null &&
                            <div>
                                <Text ml="40%" mt="xl"
                                    color="blue"
                                    size="xl"
                                    weight={800}
                                >
                                    My Rating
                                </Text>
                                <Grid mt="xl">
                                    {
                                        Object.entries(tvRateInfoUserProps)
                                            .filter(([key]) => key !== '_id' &&
                                                key !== 'tmdb_id' &&
                                                key !== 'title' &&
                                                key !== 'media_type' &&
                                                key !== 'user'
                                            )
                                            .map(([key, value]) => {
                                                return <Grid.Col span={6} key={key}>

                                                    <Badge size="lg" h={35}
                                                        radius="xl"
                                                        color="blue"
                                                        style={{
                                                            backgroundColor: "#373A40",
                                                            borderColor: "#5C5F66",

                                                        }}
                                                        styles={{
                                                            inner: {
                                                                color: "white",
                                                                fontSize: "15px"
                                                            },
                                                        }
                                                        }
                                                        leftSection={ValueBadge(value)}
                                                    >
                                                        {key}
                                                    </Badge>
                                                </Grid.Col>
                                            })
                                    }
                                </Grid>
                            </div>
                        }
                    </div>

                </SimpleGrid>


            </Container>
        )
}

export default index

interface X {
    tvInfoProps: ITv
    tvInfoCreditsProps: ICredits
    media_type: string
    tvRateInfoProps: IMovieRate
    tvRateInfoUserProps: IRate | null
    notFound: boolean
}

export async function getServerSideProps(context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<X>> {
    await clientPromise()
    const { id, type, user } = context.query
    //  console.log("uuuu", context.query)
    let tvInfo = {} as ITv
    let tvRateInfo = {} as TvModelType
    let tvRateInfoUser
    let tvCredits
    try {
        if (type === "tv") {
            const response = await fetch(`${tmdb.urlTv}${id}?api_key=${tmdb.key}&language=en-US`)
            const data = await response.json()
            tvInfo = data
            const responseCredits = await fetch(`${tmdb.urlTv}${id}/credits?api_key=${tmdb.key}&language=en-US`)
            const dataCredits = await responseCredits.json()
            tvCredits = dataCredits
            const rateResponse = await TvModel.findOne({ tmdb_id: id, media_type: type })
                .select(['-createdAt',
                    '-updatedAt',
                    '-__v'])
            if (rateResponse === null) {
                tvRateInfo = {
                    title: tvInfo.name,
                    tmdb_id: tvInfo.id,
                    media_type: type,
                    rating_count: 0,
                    acting: 0,
                    story: 0,
                    dialogue: 0,
                    cinematography: 0,
                    visual_effects: 0,
                    sound_effects: 0,
                    directing: 0,
                } as TvModelType
            }
            else {
                tvRateInfo = JSON.parse(JSON.stringify(rateResponse))
            }
            if (user === "null") {
                tvRateInfoUser = null
            }
            else {
                const ObjectId = mongoose.Types.ObjectId
                const userId = new ObjectId(user as string);

                const existingRateUser = await RateModel.findOne({ user: userId, tmdb_id: id, media_type: type })
                    .select(['-createdAt',
                        '-updatedAt',
                        '-__v'])

                tvRateInfoUser = JSON.parse(JSON.stringify(existingRateUser))
            }
            return {
                props: {
                    tvInfoProps: tvInfo,
                    tvInfoCreditsProps: tvCredits as ICredits,
                    media_type: type as string,
                    tvRateInfoProps: tvRateInfo as IMovieRate,
                    tvRateInfoUserProps: tvRateInfoUser as IRate,
                    notFound: false
                },
            }
        }
        else {
            return {
                props: {
                    tvInfoProps: {} as ITv,
                    tvInfoCreditsProps: {} as ICredits,
                    media_type: type as string,
                    tvRateInfoProps: {} as IMovieRate,
                    tvRateInfoUserProps: null,
                    notFound: true
                },
            }
        }
    } catch (error) {
        return {
            props: {
                tvInfoProps: {} as ITv,
                tvInfoCreditsProps: {} as ICredits,
                media_type: type as string,
                tvRateInfoProps: {} as IMovieRate,
                tvRateInfoUserProps: null,
                notFound: true
            },
        }
    }
}
