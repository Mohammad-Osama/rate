import React from 'react'
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
import { ICast, ICastOrCrew, ICredits, ICrew, IPersonCreditsCastorCrew, IPersonCreditsCrew, IPersonCreditsModified } from '../helpers/types';
import * as tmdb from "./../helpers/tmdb"
import ValueBadge from './ValueBadge';

interface X {
    //  type: string
    dataMedia: IPersonCreditsModified
    // id: number
    // title: string
}
const MediaCreditsThumb = ({ dataMedia }: X) => {
    const {
        poster_path,
        title,
        role,
        release_date,
        media_type,
        vote_average,
        id
    } = dataMedia


    return (
        <>
            <Group
                position="apart"
            >
                <Grid
                    columns={12}
                // gutter="lg"

                //   style={{backgroundColor:"#212529"}}
                >
                    <Grid.Col
                        span={3}
                        maw="136px"
                        m="xs"
                    >
                        <div style={{ height: "160px", width: "120px" }}>
                            <Image
                                src={poster_path
                                    ? `${tmdb.imgUrl}${tmdb.imgSize}${poster_path}`
                                    : "/images/no_media.jpg"
                                }
                                //  mah="100%"
                                //     maw="100%"
                                height="100%"
                                // width={100}

                                fit="contain"
                                alt={title}
                            />
                        </div>
                    </Grid.Col>

                    <Grid.Col
                        span={3}
                        miw="350px"
                        ml="xs"
                        style={{ display: "flex", alignItems: "center" }}
                    >
                        <div style={{}}>

                            <Text
                                size="xl"
                                color="white"
                            //  mt="xl"
                            >
                                {title}
                            </Text>
                            <Text
                                size="xl"
                                color="#ADB5BD"
                            >
                                {role}
                            </Text>
                            <ValueBadge
                                x={vote_average}
                            />

                        </div>

                    </Grid.Col>

                    {/*  <Grid.Col
                    span={3}
                    offset={3}
                    miw="300px"
                    m="xs"
                    style={{ display: "flex", alignItems: "center" }}
                >
                    <div style={{}}>
                        <Text
                            size="xl"
                            color="#ADB5BD"
                        // align="center"

                        // mb='md'
                        >
                            {release_date
                                ? release_date
                                : first_air_date
                            }
                        </Text>
                        <Text
                            size="xl"
                            color="#ADB5BD"
                        // align="center"

                        // mb='md'
                        >
                            {media_type}
                        </Text>

                    </div>

                </Grid.Col> */}

                </Grid>
                <div style={{ marginRight: "100px", marginLeft: "10px" }}>
                    <Text
                        size="xl"
                        color="#ADB5BD"
                    // align="center"

                    // mb='md'
                    >
                        {release_date}
                    </Text>
                    <Text
                        size="xl"
                        color="#ADB5BD"
                    // align="center"

                    // mb='md'
                    >
                        {media_type}
                    </Text>

                </div>

            </Group>
            <Divider />
        </>

    )
}

export default MediaCreditsThumb



