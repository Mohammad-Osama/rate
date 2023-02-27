import React from 'react'
import { GetServerSidePropsResult, GetServerSidePropsContext } from 'next';
import * as tmdb from "../../../../helpers/tmdb"
import { ICredits, IMovieRate, IRate, ITv } from '../../../../helpers/types';
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
    Divider
} from '@mantine/core';
import clientPromise from '../../../../lib/db';
import AddRate from "../../../../components/AddRate"
import { useState, useEffect } from 'react';
import mongoose from "mongoose"

import { authState } from '../../../../redux/slices/authSlice';
import { useSelector, useDispatch } from 'react-redux';
import Link from 'next/link';
import AccordionPeople from '../../../../components/AccordionPeople';
import CarouselPhotos from '../../../../components/CarouselPhotos';
import CarouselVideos from '../../../../components/CarouselVideos';
import SideTitle from '../../../../components/SideTitle';
import MiddleTitle from '../../../../components/MiddleTitle';
import CarouselMedia from '../../../../components/CarouselMedia';
import Providers from '../../../../components/Providers';
import HeadPage from '../../../../components/HeadPage';
import { Tv as TvModel, ITv as TvModelType } from '../../../../models/tvModel';
import RadarChart from '../../../../components/RadarChart';
import TvDetails from '../../../../components/TvDetails';
import CarouselSeasons from '../../../../components/CarouselSeasons';
import AccordionCredits from '../../../../components/AccordionCredits';
import { addCredits } from '../../../../redux/slices/creditsEpisodeSlice';
import { AppDispatch } from '../../../../redux/store';
import NotFound from '../../../../components/NotFound';

const index = ({ tvInfoProps, tvRateInfoProps, tvRateInfoUserProps, tvInfoCreditsProps, media_type, notFound }: X) => {

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
        id,
        seasons,
        status,
        episode_run_time,
        tagline,
        genres,
        homepage,
        created_by,
        number_of_seasons,
        number_of_episodes,
        production_companies,
        production_countries,
        spoken_languages,
        networks
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
    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        dispatch(addCredits(tvInfoCreditsProps))
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
        return (
            <NotFound />
        )
    else
        return (
            <Container size="xl">
                <HeadPage
                    title={name}
                    description={overview as string}
                />
                <Group
                    position="apart"
                    m="xl"
                >
                    <div>
                        <Text
                            align="justify"
                            weight={700}
                            color="white"
                            style={{ fontFamily: 'Greycliff CF, sans-serif', fontSize: "30px", minWidth: "60px" }}
                        >
                            {name} <span style={{ fontSize: "16px", color: "#ADB5BD" }}>{status}</span>
                        </Text>
                        <Text
                            size="xl"
                            color="#ADB5BD"
                        >
                            {first_air_date.substring(0, 4)} - {original_language} - {number_of_seasons} Seasons - {episode_run_time[0]} minutes
                        </Text>
                    </div>
                    <div>
                        <Text size="xl"
                            color="#ADB5BD"
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
                        //  height="600px"
                        //  width="600px"
                        fit="contain"
                        alt={name}
                    />
                    <div style={{}} //second col in simple grid
                    >

                        <RadarChart
                            rateInfo={tvRateInfoProps}
                        />
                        <AddRate
                            tmdb_id={id}
                            title={name}
                            poster_path={poster_path as string}
                            tmdb_rating={vote_average}
                            media_type={media_type}
                            user={user}
                            isRatedUser={isRatedUser}
                            movieRateInfoUserProps={tvRateInfoUserProps}
                        />

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
                                                key !== 'user' &&
                                                key !== 'tmdb_rating' &&
                                                key !== 'poster_path'
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
                <Divider />
                <Space h="md" />
                <Group >
                    {genres.map((x) => {
                        return <Button color="dark"
                            style={{ borderColor: "white" }}

                            radius="xl"
                            key={x.id}
                        >
                            {x.name}
                        </Button>
                    })}
                </Group>
                <Space h="md" />
                <Divider w="50%" />
                <Space h="md" />
                <MiddleTitle
                    title="Created By"
                    content={
                        created_by.map((item, index) => {
                            if (index === created_by.length - 1) // person page to be done later  , edit href
                                return <Link
                                    href={{
                                        pathname: "/person/[id]",
                                        query: {
                                            id: item.id
                                        },
                                    }}
                                    as={`/person/${item.id}`}
                                    key={index}
                                    style={{ color: "#4DABF7" }}
                                >
                                    {item.name}
                                </Link>
                            else
                                return <React.Fragment key={index}>
                                    <Link
                                        href={{
                                            pathname: "/person/[id]",
                                            query: {
                                                id: item.id
                                            },
                                        }}
                                        as={`/person/${item.id}`}
                                        style={{ color: "#4DABF7" }}
                                    >
                                        {item.name}
                                    </Link>
                                    <> , </>
                                </React.Fragment>
                        })
                    } />
                <Space h="md" />
                <Divider />
                <Space h="md" />
                <Card radius="md" // first col in 2nd simple grid
                    p="md"
                    style={{ backgroundColor: colors.bodyBackground }}>

                    <Card.Section>
                        <Text mb="md"
                            size="xl"
                            color="#ADB5BD"
                        >
                            {tagline}
                        </Text>
                        <Text align="justify"
                            weight={100}
                            color="white"
                            style={{
                                fontFamily: 'Roboto,Helvetica,Arial,sans-serif',
                                fontSize: "25px",
                                backgroundColor: "#373A40"
                            }}>
                            {overview}
                        </Text>

                    </Card.Section>
                </Card>

                <Space h="md" />
                <Divider />
                <Space h="md" />

                <AccordionCredits
                    type="Cast"
                    data={tvInfoCreditsProps.cast}
                    id={tvInfoCreditsProps.id}
                    title={name}
                    media_type={media_type}
                />

                <Space h="xl" />

                <AccordionPeople
                    type="Crew"
                    data={tvInfoCreditsProps.crew}
                    id={tvInfoCreditsProps.id}
                    title={name}
                    media_type={media_type}
                />
                <Space h="xl" />
                <SideTitle text="Seasons"
                />
                <CarouselSeasons
                    id={id}
                    seasons={seasons}
                    title={name}
                />
                <Space h="xl" />
                <SideTitle text="Photos"
                />
                <CarouselPhotos
                    id={id}
                    type="tv"
                    season_number=''
                    episode_number=''
                />

                <Space h="xl" />
                <SideTitle text="Videos"
                />
                <CarouselVideos
                    id={id}
                    type="tv"
                    season_number=''
                    episode_number=''
                />
                <Space h="xl" />
                <SideTitle text="More Details"
                />
                <TvDetails
                    status={status}
                    first_air_date={first_air_date}
                    number_of_seasons={number_of_seasons}
                    number_of_episodes={number_of_episodes}
                    production_companies={production_companies}
                    production_countries={production_countries}
                    spoken_languages={spoken_languages}
                    homepage={homepage}
                    networks={networks}
                />

                <Space h="xl" />
                <SideTitle text="Similar Tv Shows"
                />
                <CarouselMedia
                    id={id}
                    mediaType={media_type}
                    callType="tv similar"

                />

                <Space h="xl" />
                <SideTitle text="Recommendations"
                />
                <CarouselMedia
                    id={id}
                    mediaType={media_type}
                    callType="tv recommendations"

                />
                <Space h="xl" />
                <SideTitle text="Where To Watch" />
                <Providers
                    id={id}
                    mediaType="tv"
                />
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
                    poster_path: (
                        tvInfo.poster_path !== null
                            ? tvInfo.poster_path
                            : ""
                    ),
                    tmdb_rating: tvInfo.vote_average,
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
