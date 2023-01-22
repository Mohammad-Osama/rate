import React, { useState, useEffect } from 'react'
import { GetServerSidePropsResult, GetServerSidePropsContext } from 'next';
import * as tmdb from "../../../../helpers/tmdb"
import { IGenre, ICollectionDetails, IMovieOrTv, ISeasonDetails } from '../../../../helpers/types';
import { Space, Container, SimpleGrid, Card, Image, Text, Group, Divider, Grid } from '@mantine/core';
import { useRouter } from 'next/router'
import * as colors from '../../../../helpers/colors'
import axios from 'axios';
import MediaThumb from '../../../../components/MediaThumb';
import SideTitle from '../../../../components/SideTitle';
import HeadPage from '../../../../components/HeadPage';
import EpisodeThumb from '../../../../components/EpisodeThumb';


const index = ({ seasonProps, notFound, title }: X) => {
    const { name, overview, episodes, poster_path } = seasonProps
   // console.log(seasonProps)
    if (notFound === true)
        return (<div>Error Page</div>)
    else
    return (
        <Container size="xl">
            <HeadPage
                title={name}
                description={overview}
            />
            <Grid
                gutter="lg"
                columns={12}
            //   style={{backgroundColor:"#212529"}}
            >
                <Grid.Col sm={3} >
                    <Image
                        src={poster_path
                            ? `${tmdb.imgUrl}${tmdb.imgSize}${poster_path}`
                            : '/images/no_media.jpg'
                        }
                        // height="600px"
                        // width="30%"
                        fit="contain"
                        alt={name}
                    />
                </Grid.Col>
                <Grid.Col sm={9}>
                    <div>
                        <Text
                            //  p="xl"
                            align="justify"
                            weight={700}
                            color="white"
                            style={{ fontFamily: 'Greycliff CF, sans-serif', fontSize: "30px", minWidth: "60px" }}
                        >
                            {title} - {name}
                        </Text>

                        <Space h="md" />
                        <Divider />
                        <Space h="md" />

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
                    </div>
                </Grid.Col>
            </Grid>

            <Space h="md" />
            <Divider />
            <Space h="md" />

            <SideTitle text="Episode List" />
            {episodes.map((e) => {
                return <EpisodeThumb
                    episodeData={e}
                    title={title}
                    key={e.id}
                />
            })}
        </Container>
    )
}

export default index


interface X {
    seasonProps: ISeasonDetails;
    title: string;
    notFound: boolean;
}
export async function getServerSideProps(context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<X>> {
    const { id, season_number, title } = context.query
    try {
        const response = await fetch(`${tmdb.urlTv}${id}/season/${season_number}?api_key=${tmdb.key}&language=en-US`)
        const resData = await response.json()
        return {
            props: {
                seasonProps: resData as ISeasonDetails,
                title: title as string,
                notFound: false
            },
        }
    } catch (error) {
        return {
            props: {
                seasonProps: {} as ISeasonDetails,
                title: title as string,
                notFound: false
            },
        }
    }
}
