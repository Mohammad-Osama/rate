import React, { useState, useEffect } from 'react'
import { GetServerSidePropsResult, GetServerSidePropsContext } from 'next';
import * as tmdb from "../../../../helpers/tmdb"
import { IEpisode, ICredits } from '../../../../helpers/types';
import { Space, Container, Image, Text, Group, Divider, Grid } from '@mantine/core';
import HeadPage from '../../../../components/HeadPage';
import ValueBadge from '../../../../components/ValueBadge';
import { addCredits, removeCredits } from '../../../../redux/slices/creditsEpisodeSlice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../../redux/store';
import AccordionCredits from '../../../../components/AccordionCredits';
import SideTitle from '../../../../components/SideTitle';
import CarouselPhotos from '../../../../components/CarouselPhotos';


const index = ({ episodeProps, title, notFound, episodeCreditProps ,tvId}: X) => {
    const {
        name,
        season_number,
        episode_number,
        still_path,
        overview,
        runtime,
        air_date,
        vote_average,
        vote_count
    } = episodeProps
    console.log(episodeProps)
    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        dispatch(addCredits(episodeCreditProps))
        return () => {
            //   dispatch(removeCredits())
        }
    }, [])


    if (notFound === true)
        return (<div>Error Page</div>)
    else
        return (
            <Container size="xl">
                <HeadPage
                    title={name}
                    description={`${title} - "Season${season_number} - "Episode${episode_number}`}
                />
                <Grid
                    gutter="lg"
                    columns={12}
                //   style={{backgroundColor:"#212529"}}
                >
                    <Grid.Col sm={5} >
                        <Image
                            src={still_path
                                ? `${tmdb.imgUrl}${tmdb.imgSize}${still_path}`
                                : '/images/no_media.jpg'
                            }
                            // height="600px"
                            // width="30%"
                            fit="contain"
                            alt={name}
                        />
                    </Grid.Col>
                    <Grid.Col sm={7}>

                        <div>
                            <Group
                                position="apart"
                            //  m="xl"
                            >
                                <div>
                                    <Text
                                        //  p="xl"
                                        align="justify"
                                        weight={700}
                                        color="white"
                                        style={{ fontFamily: 'Greycliff CF, sans-serif', fontSize: "30px", minWidth: "60px" }}
                                    >
                                        {name} <span style={{ fontSize: "16px", color: "#ADB5BD" }}>{title} - S{season_number}E{episode_number} - {runtime} minutes</span>
                                    </Text>
                                    <Text
                                        size="xl"
                                        color="#ADB5BD"
                                    >
                                        {air_date}
                                    </Text>
                                </div>
                                <div>
                                    <Text
                                        size="xl"
                                        color="#ADB5BD"
                                    // mb='md'
                                    >
                                        TMDB Rating
                                    </Text>
                                    <Group>
                                        <ValueBadge x={vote_average} /><Text ml="-md" size="xl" color="#ADB5BD">/10</Text>
                                    </Group>
                                    <Text ml="40%" size="xl" color="#ADB5BD">{vote_count}</Text>
                                </div>
                            </Group>
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

                <Space h="xl" />

                <AccordionCredits
                    type="Guest Stars"
                    title={`${title} S${season_number}-E${episode_number}`}
                    data={episodeCreditProps.guest_stars}
                    media_type="episode"
                    id={episodeCreditProps.id}
                />
                <Space h="xl" />
                <AccordionCredits
                    type="Cast"
                    title={`${title} S${season_number}-E${episode_number}`}
                    data={episodeCreditProps.cast}
                    media_type="episode"
                    id={episodeCreditProps.id}
                />
                <Space h="xl" />
                <AccordionCredits
                    type="Crew"
                    title={`${title} S${season_number}-E${episode_number}`}
                    data={episodeCreditProps.crew}
                    media_type="episode"
                    id={episodeCreditProps.id}
                />
                <Space h="xl" />
                <SideTitle text="Photos"
                />
                <CarouselPhotos
                        id={parseInt(tvId) }
                        type="episode"
                        season_number={season_number}
                        episode_number={episode_number}
                />

                <Space h={333} />
            </Container>
        )
}

export default index


interface X {
    episodeProps: IEpisode;
    episodeCreditProps: ICredits;
    title: string;
    tvId: string;
    notFound: boolean;
}
export async function getServerSideProps(context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<X>> {
    const { id, season_number, title, episode_number } = context.query
    try {
        const response = await fetch(`${tmdb.urlTv}${id}/season/${season_number}/episode/${episode_number}?api_key=${tmdb.key}&language=en-US`)
        const resData = await response.json()
        const responseCredits = await fetch(`${tmdb.urlTv}${id}/season/${season_number}/episode/${episode_number}/credits?api_key=${tmdb.key}&language=en-US`)
        const resDataCredits = await responseCredits.json()
        return {
            props: {
                episodeProps: resData as IEpisode,
                episodeCreditProps: resDataCredits as ICredits,
                title: title as string,
                tvId: id as string,
                notFound: false
            },
        }
    } catch (error) {
        return {
            props: {
                episodeProps: {} as IEpisode,
                episodeCreditProps: {} as ICredits,
                title: title as string,
                tvId: id as string,
                notFound: false
            },
        }
    }
}

