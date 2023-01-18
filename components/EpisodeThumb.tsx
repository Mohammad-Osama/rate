import React from 'react'
import { IEpisode} from '../helpers/types'
import { Image, Text, Badge, Button, Group, Stack, SimpleGrid, Grid, Divider, Space } from '@mantine/core';
import * as tmdb from "./../helpers/tmdb"
import Link from 'next/link'




interface X {
    episodeData: IEpisode
    title: string
}
const EpisodeThumb = ({ episodeData, title }: X) => {
    const { name,
        still_path,
        episode_number,
        season_number,
        runtime,
        air_date,
        vote_average,
        vote_count,
        overview,
        show_id
    } = episodeData

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
    return (
        <>
            <Grid
                gutter="lg"
                columns={12}
            //   style={{backgroundColor:"#212529"}}
            >
                <Grid.Col sm={4} >
                    <Link
                        href={{
                            pathname: "/media/tv/episode",
                        }}
                        as={`/media/tv/episode?id=${show_id}&title=${title}&season_number=${season_number}&episode_number=${episode_number}`}
                    >
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
                    </Link>
                </Grid.Col>
                <Grid.Col sm={8}>
                    <Group
                        position="apart"
                    //  m="xl"
                    >
                        <div>
                            <Link
                                href={{
                                    pathname: "/media/tv/episode",
                                }}
                                as={`/media/tv/episode?id=${show_id}&title=${title}&season_number=${season_number}&episode_number=${episode_number}`}
                            >
                                <Text
                                    //  p="xl"
                                    align="justify"
                                    weight={700}
                                    color="white"
                                    style={{ fontFamily: 'Greycliff CF, sans-serif', fontSize: "25px", minWidth: "60px" }}
                                >
                                    {name} <span style={{ fontSize: "16px", color: "#ADB5BD" }}>S{season_number}-E{episode_number}  {runtime} minutes</span>
                                </Text>
                            </Link>
                            <Text
                                size="xl"
                                color="#ADB5BD"
                            >
                                {air_date}
                            </Text>
                        </div>
                        <div>
                            {ValueBadge(vote_average)}
                        </div>

                    </Group>
                    <Text align="justify"
                        weight={100}
                        color="white"
                        style={{
                            fontFamily: 'Roboto,Helvetica,Arial,sans-serif',
                            fontSize: "20px",
                            backgroundColor: "#373A40"
                        }}>
                        {overview}
                    </Text>
                </Grid.Col>
            </Grid>
            <Space h="xl" />
            <Divider />
            <Space h="xl" />
        </>
    )
}

export default EpisodeThumb
