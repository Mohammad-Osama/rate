import React from 'react'
import { GetServerSidePropsResult, GetServerSidePropsContext } from 'next';
import * as tmdb from "../../../../helpers/tmdb"
import { IMovie, IMovieRate } from '../../../../helpers/types';
import { Container, SimpleGrid, Grid, Image, Badge, Slider, Drawer, Button, Group, Progress, Text } from '@mantine/core';
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

import { authState } from '../../../../redux/slices/authSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { AppDispatch } from '../../../../redux/store';
import { Movie } from '../../../../models/movieModel';
//import AddRateCopy from "../../../../components/AddRateCopy"
ChartJS.register(
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend
);
const index = ({ movieInfoProps, media_type, movieRateInfoProps }: X) => {
  //  console.log(  "tttttttttt" ,movieRateInfoProps)
    const { acting, story, dialogue, directing, cinematography, visual_effects, sound_effects, rating_count } = movieRateInfoProps
    const userInfo = useSelector(authState)
    const user = userInfo.id
    const dispatch = useDispatch<AppDispatch>()
    //  console.log(movieInfoProps)
    const { id, poster_path, title } = movieInfoProps
    // const medtype = media_type

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
            <Badge color="green" size="xl" variant="filled">{x}</Badge>
        );
    }
    return (
        <Container size="xl">
            <SimpleGrid cols={2} spacing="lg"
                breakpoints={[
                    { maxWidth: 1024, cols: 2, spacing: 'md' },
                    { maxWidth: 768, cols: 2, spacing: 'sm' },
                    { maxWidth: 500, cols: 1, spacing: 'sm' },
                ]} >
                <Image
                    src={`${tmdb.imgUrl}${tmdb.imgSize}${poster_path}`}
                    fit="contain"
                    alt={title}
                />

                <div style={{}}>
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
                    />
                    <Text ml="40%"
                          color="blue"
                          size="xl"  
                          weight={800}
                            >
                        My Rating
                    </Text>
                    <Grid mt="xl">
                        {
                            Object.entries(movieRateInfoProps)
                                .filter(([key]) => key !== '_id' &&
                                    key !== 'tmdb_id' &&
                                    key !== 'title' &&
                                    key !== 'rating_count')
                                .map(([key, value]) => {
                                    return <Grid.Col span={6} key={key}>

                                        <Badge size="lg"
                                            radius="xl"
                                            color="blue"
                                            style={{backgroundColor:"#373A40" ,
                                                     borderColor:"#1A1B1E"}}
                                            leftSection={ValueBadge(value)}
                                            >
                                            {key}
                                        </Badge>


                                    </Grid.Col>
                                })
                        }

                    </Grid>

                    <>


                    </>




                    {/*  <Slider    value={value}
                            onChange={(value) => {
                                setValue(value)
                                addToForm(field, value)

                            }
                            }
                            max={10}
                            step={1}
                            min={0}
                            defaultValue={5}
                            labelAlwaysOn
            /> */}
                </div>

            </SimpleGrid>
            {/* <AddRate tmdb_id={id}
                title={title}
                media_type={media_type}
                user={user}
            /> */}


        </Container>
    )
}

export default index

interface X {
    movieInfoProps: IMovie
    media_type: string
    movieRateInfoProps: IMovieRate

}
export async function getServerSideProps(context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<X>> {
    await clientPromise()
    const { id, type } = context.query
    let movieInfo = {} as IMovie
    let movieRateInfo
    try {
        if (type === "movie") {
            const response = await fetch(`${tmdb.urlMovie}${id}?api_key=${tmdb.key}&language=en-US`)
            const data = await response.json()
            movieInfo = data
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
          //  console.log( "ressssss" , rateResponse)
        }

        return {
            props: {
                movieInfoProps: movieInfo,
                media_type: type as string,
                movieRateInfoProps: movieRateInfo as IMovieRate
            },
        }

    } catch (error) {
        return {
            props: {
                movieInfoProps: {} as IMovie,
                media_type: type as string,
                movieRateInfoProps: {} as IMovieRate
            },
        }
    }
}
