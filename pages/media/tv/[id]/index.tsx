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
import { Tv as TvModel, ITv as TvModelType} from '../../../../models/tvModel';
const index = ({tvInfoProps,tvRateInfoProps ,tvRateInfoUserProps , tvInfoCreditsProps}:X) => {
    console.log(tvInfoProps,tvRateInfoProps ,tvRateInfoUserProps , tvInfoCreditsProps)
    return (
        <div>
            testing
        </div>
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
            const rateResponse = await TvModel.findOne({ tmdb_id: id ,  media_type:type})
                .select(['-createdAt',
                    '-updatedAt',
                    '-__v'])
            if (rateResponse === null) {
                tvRateInfo  =  {
                    title: tvInfo.name,
                    tmdb_id: tvInfo.id,
                    media_type:type,
                    rating_count: 0,
                    acting: 0,
                    story: 0,
                    dialogue: 0,
                    cinematography: 0,
                    visual_effects: 0,
                    sound_effects: 0,
                    directing: 0,
                } as  TvModelType
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

                const existingRateUser = await RateModel.findOne({ user: userId, tmdb_id: id , media_type:type})
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
