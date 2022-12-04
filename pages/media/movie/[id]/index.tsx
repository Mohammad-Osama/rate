import React from 'react'
import { GetServerSidePropsResult, GetServerSidePropsContext } from 'next';
import * as tmdb from "../../../../helpers/tmdb"
import { IMovie } from '../../../../helpers/types';
import { Container, SimpleGrid, Image, Slider, Drawer, Button, Group } from '@mantine/core';
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
import AddRateCopy from "../../../../components/AddRateCopy"
ChartJS.register(
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend
);
const index = ({ movieInfoProps }: X) => {

    //  console.log(movieInfoProps)
    const { id, poster_path, title } = movieInfoProps

    const data = {
        labels: ['Acting', 'Story', 'Dialogue', 'Directing', 'Cinematography', 'Visual effects', 'Sound effects'],
        datasets: [
            {
                label: 'Average',
                data: [4, 5, 4, 5, 4, 5, 10],
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
                </div>

            </SimpleGrid>
                    <AddRate/>
                    <AddRateCopy/>
                
        </Container>
    )
}

export default index

interface X {
    movieInfoProps: IMovie

}
export async function getServerSideProps(context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<X>> {
    await clientPromise()
    const { id, type } = context.query
    let movieInfo = {} as IMovie
    try {
        if (type === "movie") {
            const response = await fetch(`${tmdb.urlMovie}${id}?api_key=${tmdb.key}&language=en-US`)
            const data = await response.json()
            movieInfo = data
        }



        return {
            props: {
                movieInfoProps: movieInfo

            },
        }

    } catch (error) {
        return {
            props: {
                movieInfoProps: {} as IMovie
            },
        }
    }
}
