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
const index = () => {
    return (
        <div>
            i need to know type of media first before getServerSideProps ?!
        </div>
    )
}

export default index

// tv model first !!!!!!!!!!!!!!!!!!

/* export async function getServerSideProps(context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<X>> {
    await clientPromise()
    const { id, type, user } = context.query
    //  console.log("uuuu", context.query)
    let tvInfo = {} as ITv
    let tvRateInfo
    let tvRateInfoUser
    let tvCredits
    try {
        if (type === "tv") {
            const response = await fetch(`${tmdb.urlTv}${id}?api_key=${tmdb.key}&language=en-US`)
            const data = await response.json()
            tvInfo = data
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
} */
