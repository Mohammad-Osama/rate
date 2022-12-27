import React from 'react'
import { GetServerSidePropsResult, GetServerSidePropsContext } from 'next';
import * as tmdb from "../../../../helpers/tmdb"
import { ICredits, IMovie, IMovieRate, IRate } from '../../../../helpers/types';
import { IRate as IRateModelType, Rate as RateModel } from "../../../../models/rateModel"
import * as colors from '../../../../helpers/colors'
import {
    Container,
    SimpleGrid,
    Grid,
    Image,
    Badge,
    Slider,
    Drawer,
    Button,
    Group,
    Progress,
    Text,
    Space,
    Card,
    Stack,
    Flex,
    Divider,
    Accordion
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
import { useState, useEffect, useMemo } from 'react';
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

//import AddRateCopy from "../../../../components/AddRateCopy"
ChartJS.register(
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend
);
const index = ({ movieInfoProps, media_type, movieRateInfoProps, movieRateInfoUserProps, notFound, movieInfoCreditsProps }: X) => {
    //   console.log("movie", movieRateInfoProps)
    //  console.log("user", movieRateInfoUserProps)
    // console.log("movie from tmdb", movieInfoProps)
    const [isRatedUser, setIsRatedUser] = useState<boolean>();
    //  console.log("ratingStatus paretn", isRatedUser)
    const { acting, story, dialogue, directing, cinematography, visual_effects, sound_effects, rating_count } = movieRateInfoProps
    const userInfo = useSelector(authState)
    const user = userInfo.id
    const dispatch = useDispatch<AppDispatch>()
    //  console.log(movieInfoProps)
    const { id,
        poster_path,
        title,
        release_date,
        original_language,
        runtime,
        vote_average,
        vote_count
    } = movieInfoProps
    // const medtype = media_type
    //  const mainArea :any = React.useMemo( () => <AddRate/>, [] );
    const actingData = Math.round((acting / rating_count) * 10) / 10
    const storyData = Math.round((story / rating_count) * 10) / 10
    const dialogueData = Math.round((dialogue / rating_count) * 10) / 10
    const directingData = Math.round((directing / rating_count) * 10) / 10
    const cinematographyData = Math.round((cinematography / rating_count) * 10) / 10
    const visualEffData = Math.round((visual_effects / rating_count) * 10) / 10
    const soundEffData = Math.round((sound_effects / rating_count) * 10) / 10

    const data = {
        labels: ['Acting',
            'Story',
            'Dialogue',
            'Directing',
            'Cinematography',
            'Visual effects',
            'Sound effects'],
        datasets: [
            {
                label: 'Average',
                data: [actingData,
                    storyData,
                    dialogueData,
                    directingData,
                    cinematographyData,
                    visualEffData,
                    soundEffData],
                backgroundColor: '#39d353', // label box  background
                borderColor: '#39d353', // lines 
                borderWidth: 5,
                fill: false,
                fillColor: "red",
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: 'red'
            },
        ]
    };

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
        if (movieRateInfoUserProps === null) {
            setIsRatedUser(false)
        }
        else {
            setIsRatedUser(true)
        }
        return () => {

        }
    }, [])



    //  const findDirector = () => {
    //  let final

    // console.log(found.length)
    //  if (found.length > 0)
    //   { // try it at the text 
    /*        found.map((item,index)=>{
             if (index===found.length-1)
             return (item)
             else 
             return( item +",")
           })
       } 
  } */

    //findDirector()
    const writers = movieInfoCreditsProps.crew.filter(m =>
        m.job === "Writer"
    ).map((x) => {
        return x.name
    })

    const directors = movieInfoCreditsProps.crew.filter(m =>
        m.job === "Director"
    ).map((x) => {
        return x.name
    })

    if (notFound === true)
        return (<div>Error Page</div>)
    else
        return (
            <Container size="xl">
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
                            {title}
                        </Text>
                        <Text
                            size="xl"
                            color="#ADB5BD"
                        >
                            {release_date.substring(0, 4)} - {original_language} - {runtime} minutes
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
                        { maxWidth: 768, cols: 2, spacing: 'sm' },
                        { maxWidth: 500, cols: 1, spacing: 'sm' },
                    ]}
                //   style={{backgroundColor:"#212529"}}
                >
                    <Image
                        src={`${tmdb.imgUrl}${tmdb.imgSize}${poster_path}`}
                        fit="contain"
                        alt={title}
                    />

                    <div style={{}} //second col in simple grid
                    >
                        <Radar options={{
                            responsive: true,
                            maintainAspectRatio: true,

                            color: "yellow",// color of the main label at the top
                            scales: {
                                r: {
                                    min: 0,
                                    max: 10,
                                    pointLabels: { // edit labels 
                                        color: "white",
                                        font: {
                                            size: 15
                                        }
                                    },
                                    //  reverse,
                                    //  startAngle:33, // rotates the chart
                                    //  suggestedMax:44,
                                    //   suggestedMin,
                                    ticks: {
                                        display: false,
                                        stepSize: 1

                                        //  textStrokeColor: 'rgb(54, 162, 235)',
                                        //   color: 'white',
                                        //  backdropColor: 'red'
                                    },
                                    angleLines: {
                                        //     color: 'yellow',
                                    },
                                    //  type,
                                    //  weight,
                                    grid: {
                                        color: "#2C2E33",
                                        lineWidth: 2,

                                    },
                                }
                            }
                        }}
                            data={data}

                        //  style={{ minHeight: "100%", minWidth: "100%" }}
                        />
                        <AddRate tmdb_id={id}
                            title={title}
                            media_type={media_type}
                            user={user}
                            isRatedUser={isRatedUser}
                            movieRateInfoUserProps={movieRateInfoUserProps}
                        />
                        {/*  { isRatedUser===true
                              ?<Text>voted</Text>
                              :<Text>didnt vote</Text>

                            } */}
                        {movieRateInfoUserProps !== null &&
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
                                        Object.entries(movieRateInfoUserProps)
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
                {/* <AddRate tmdb_id={id}
                title={title}
                media_type={media_type}
                user={user}
            /> */}
                <Divider />
                <Space h="md" />
                <SimpleGrid cols={2} spacing="lg"
                    breakpoints={[
                        { maxWidth: 1024, cols: 2, spacing: 'md' },
                        { maxWidth: 768, cols: 2, spacing: 'sm' },
                        { maxWidth: 500, cols: 1, spacing: 'sm' },
                    ]} >


                    <Card radius="md" // first col in 2nd simple grid
                        p="md"
                        style={{ backgroundColor: colors.bodyBackground }}>

                        <Card.Section>
                            <Text mb="md"
                                size="xl"
                                color="#ADB5BD"
                            >
                                {movieInfoProps.tagline}
                            </Text>
                            <Text align="justify"
                                weight={100}
                                color="white"
                                style={{
                                    fontFamily: 'Roboto,Helvetica,Arial,sans-serif',
                                    fontSize: "25px",
                                    backgroundColor: "#373A40"
                                }}>
                                {movieInfoProps.overview}
                            </Text>

                        </Card.Section>


                    </Card>

                    {/* <Flex // second col in simple grid
                          //  mih={50}
                           // bg="rgba(0, 0, 0, .3)"
                           // gap="xs"
                            justify="flex-start"
                            align="center"
                            direction="row"
                            wrap="wrap"
                    > */}
                    <Stack m="xl">
                        <Group position="left" mt={-20}>
                            {movieInfoProps.genres.map((x) => {

                                return <Button color="dark"
                                    style={{ borderColor: "white" }}

                                    radius="xl"
                                    key={x.id}
                                >
                                    {x.name}
                                </Button>
                            })}
                        </Group>
                        <Divider />

                        <Text align="justify"
                            weight={700}
                            color="white"
                            style={{
                                fontFamily: 'Roboto,Helvetica,Arial,sans-serif',
                                fontSize: "20px",
                                backgroundColor: "#373A40",
                                // wordWrap:"break-word",
                                //  display:"flex",
                                //  justifyContent:"flex-start",
                                wordSpacing: "1px",
                            }}>

                            Writer: {
                                writers.map((item, index) => {
                                    if (index === writers.length - 1)
                                        return <Link href="/person" key={index}>{item}</Link>
                                    else
                                        return <React.Fragment key={index}><Link href={`/${item}`} >{item}</Link> <> , </></React.Fragment>
                                })
                            }

                        </Text>
                        {/*  {movieInfoCreditsProps.crew.map((m)=>{
                            if (m.job==="Director")
                            return  <span>{m.name} </span>
                        })

                        } */}
                        <Text align="justify"
                            weight={700}
                            color="white"
                            style={{
                                fontFamily: 'Roboto,Helvetica,Arial,sans-serif',
                                fontSize: "20px",
                                backgroundColor: "#373A40",
                                // wordWrap:"break-word",
                                //  display:"flex",
                                //  justifyContent:"flex-start",
                                wordSpacing: "1px",
                            }}>

                            Director: {
                                directors.map((item, index) => {
                                    if (index === directors.length - 1)
                                        return <Link href="/person" key={index}>{item}</Link>
                                    else
                                        return <React.Fragment key={index}><Link href={`/${item}`} >{item}</Link> <> , </></React.Fragment>
                                })
                            }

                        </Text>

                        <Text align="justify"
                            weight={700}
                            color="white"
                            style={{
                                fontFamily: 'Roboto,Helvetica,Arial,sans-serif',
                                fontSize: "20px",
                                backgroundColor: "#373A40",
                                // wordWrap:"break-word",
                                //  display:"flex",
                                //  justifyContent:"flex-start",
                                wordSpacing: "1px",
                            }}>
                            <a href={movieInfoProps.homepage as string} style={{ color: "#4DABF7" }}>Homepage </a>
                            - <a href={movieInfoProps.imdb_id as string} style={{ color: "#4DABF7" }}>IMDB </a>

                        </Text>
                    </Stack>
                    {/*    </Flex> */}

                </SimpleGrid>
                <Space h="md" />
                <AccordionPeople
                    type="Cast"
                    data={movieInfoCreditsProps.cast}
                    id={movieInfoCreditsProps.id}
                    title={title}
                />
                <Space h="xl" />
                <AccordionPeople
                    type="Crew"
                    data={movieInfoCreditsProps.crew}
                    id={movieInfoCreditsProps.id}
                    title={title}
                />
                <Space h="xl" />
                <SideTitle text="Photos"
                                />
                <CarouselPhotos
                    id={movieInfoProps.id}
                    type="movie"
                />

                <Space h="xl" />
                <SideTitle text="Videos"
                                />
                <CarouselVideos
                    id={movieInfoProps.id}
                    type="movie"
                />
                <Space h={666} />
            </Container>
        )
}

export default index

interface X {
    movieInfoProps: IMovie
    movieInfoCreditsProps: ICredits
    media_type: string
    movieRateInfoProps: IMovieRate
    movieRateInfoUserProps: IRate | null
    notFound: boolean
}
export async function getServerSideProps(context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<X>> {
    await clientPromise()
    const { id, type, user } = context.query
    //  console.log("uuuu", context.query)
    let movieInfo = {} as IMovie
    let movieRateInfo
    let movieRateInfoUser
    let movieCredits
    try {
        if (type === "movie") {
            const response = await fetch(`${tmdb.urlMovie}${id}?api_key=${tmdb.key}&language=en-US`)
            const data = await response.json()
            movieInfo = data
            const responseCredits = await fetch(`${tmdb.urlMovie}${id}/credits?api_key=${tmdb.key}&language=en-US`)
            const dataCredits = await responseCredits.json()
            movieCredits = dataCredits
            const rateResponse = await Movie.findOne({ tmdb_id: id })
                .select(['-createdAt',
                    '-updatedAt',
                    '-__v'])
            if (rateResponse === null) {
                movieRateInfo = {
                    title: movieInfo.title,
                    tmdb_id: movieInfo.id,
                    rating_count: 0,
                    acting: 0,
                    story: 0,
                    dialogue: 0,
                    cinematography: 0,
                    visual_effects: 0,
                    sound_effects: 0,
                    directing: 0,
                }
            }
            else {
                movieRateInfo = JSON.parse(JSON.stringify(rateResponse))
            }
            if (user === "null") {
                movieRateInfoUser = null
            }
            else {
                const ObjectId = mongoose.Types.ObjectId
                const userId = new ObjectId(user as string);

                const existingRateUser = await RateModel.findOne({ user: userId, tmdb_id: id })
                    .select(['-createdAt',
                        '-updatedAt',
                        '-__v'])

                movieRateInfoUser = JSON.parse(JSON.stringify(existingRateUser))

            }

            return {
                props: {
                    movieInfoProps: movieInfo,
                    movieInfoCreditsProps: movieCredits,
                    media_type: type as string,
                    movieRateInfoProps: movieRateInfo as IMovieRate,
                    movieRateInfoUserProps: movieRateInfoUser as IRate,
                    notFound: false
                },
            }

        }

        else {
            return {
                props: {
                    movieInfoProps: {} as IMovie,
                    movieInfoCreditsProps: {} as ICredits,
                    media_type: type as string,
                    movieRateInfoProps: {} as IMovieRate,
                    movieRateInfoUserProps: null,
                    notFound: true
                },
            }
        }
    } catch (error) {
        return {
            props: {
                movieInfoProps: {} as IMovie,
                movieInfoCreditsProps: {} as ICredits,
                media_type: type as string,
                movieRateInfoProps: {} as IMovieRate,
                movieRateInfoUserProps: null,
                notFound: true
            },
        }
    }
}
