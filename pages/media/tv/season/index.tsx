import React, { useState, useEffect } from 'react'
import { GetServerSidePropsResult, GetServerSidePropsContext } from 'next';
import * as tmdb from "../../../../helpers/tmdb"
import { IGenre, ICollectionDetails, IMovieOrTv, ISeasonDetails } from '../../../../helpers/types';
import { Space, Container, SimpleGrid, Card, Image, Text } from '@mantine/core';
import { useRouter } from 'next/router'
import * as colors from '../../../../helpers/colors'
import axios from 'axios';
import MediaThumb from '../../../../components/MediaThumb';
import SideTitle from '../../../../components/SideTitle';
import HeadPage from '../../../../components/HeadPage';


const index = ({seasonProps,notFound}:X) => {
    console.log(seasonProps)
    return (
        <div>
            testing
        </div>
    )
}

export default index


interface X {
    seasonProps: ISeasonDetails
    notFound: boolean
}
export async function getServerSideProps(context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<X>> {
    const { id , season_number } = context.query
    try {
        const response = await fetch(`${tmdb.urlTv}${id}/season/${season_number}?api_key=${tmdb.key}&language=en-US`)
        const resData = await response.json()
        return {
            props: {
                seasonProps: resData as ISeasonDetails,
                notFound: false
            },
        }
    } catch (error) {
        return {
            props: {
                seasonProps: {} as ISeasonDetails,
                notFound: false
            },
        }
    }
}
