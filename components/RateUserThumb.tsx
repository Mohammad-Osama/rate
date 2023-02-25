import {
    Grid,
    Image,
    Group,
    Text,
    Divider,
} from '@mantine/core';
import { IRate } from '../helpers/types';
import * as tmdb from "./../helpers/tmdb"
import ValueBadge from './ValueBadge';
import Link from 'next/link'
import { useSelector } from 'react-redux';
import { authState } from '../redux/slices/authSlice';
import RadarChartUser from './RadarChartUser';
import { useMediaQuery } from '@mantine/hooks';

interface X {
    rate: IRate
}
const RateUserThumb = ({ rate }: X) => {
    const userData = useSelector(authState)
    const userId = userData.id
    const {
        media_type,
        poster_path,
        title,
        tmdb_id,
        tmdb_rating,
        createdAt,
        updatedAt,

    } = rate
    const createdDate = new Date(createdAt);
    const updatedDate = new Date(updatedAt);

    const createdDateFormatted = () => {
        const date = new Date(createdAt);
        const options = {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
        };
        return date.toLocaleString("en-US", options as any)
    }
    const updatedDateFormatted = () => {
        const date = new Date(createdAt);
        const options = {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
        };
        return date.toLocaleString("en-US", options as any)
    }

    function createdOrUpdated() {
        if (createdDate.getTime() === updatedDate.getTime())
            return `Created : ${createdDateFormatted()}`
        else if (createdDate.getTime() < updatedDate.getTime())
            return `Updated : ${updatedDateFormatted()}`
    }

    const smallScreen = useMediaQuery('(max-width: 897px)');

    return (
        <>
            <Group
                position="apart"
            >
                <Grid
                    columns={12}
                    w={566}
                    align="center"
                    style={{
                        //backgroundColor:"#212529",
                        marginTop: `${smallScreen
                            ? "30px"
                            : ""
                            }`,
                        boxShadow: " rgba(0, 0, 0, 0.16) 0px 1px 4px, rgb(51, 51, 51) 0px 0px 0px 3px",

                    }}
                >
                    <Grid.Col
                        span={3}
                        maw="136px"
                        m="xs"
                    >
                        <div style={{ height: "160px", width: "120px" }}>
                            <Link href={{
                                pathname: "/media/${mediaType}/[id]",
                                query: {
                                    id: tmdb_id
                                },
                            }}
                                as={`/media/${media_type}/${tmdb_id}?type=${media_type}&user=${userId}`}
                            >
                                <Image
                                    src={poster_path
                                        ? `${tmdb.imgUrl}${tmdb.imgSize}${poster_path}`
                                        : "/images/no_media.jpg"
                                    }
                                    height="100%"
                                    fit="contain"
                                    alt={title}
                                />
                            </Link>
                        </div>
                    </Grid.Col>

                    <Grid.Col
                        span={3}
                        miw="350px"
                        ml="xs"
                        style={{ display: "flex", alignItems: "center" }}
                    >
                        <div>
                            <Text
                                size="xl"
                                color="white"
                                mb="md"
                            >
                                {title}
                            </Text>
                            <Text
                                size="lg"
                                color="#ADB5BD"
                                mb="md"
                            >
                                {createdOrUpdated()}
                            </Text>
                            <Text
                                size="lg"
                                color="#ADB5BD"
                                mb="md"
                            >
                                {media_type === "movie"
                                    ? "Movie"
                                    : "Show"
                                }
                            </Text>
                            <ValueBadge
                                x={tmdb_rating}
                            />
                        </div>
                    </Grid.Col>
                </Grid>
                <div
                    style={{
                        marginTop: `${smallScreen
                            ? "30px"
                            : ""
                            }`,
                        // boxShadow:" rgba(0, 0, 0, 0.16) 0px 1px 4px, rgb(51, 51, 51) 0px 0px 0px 3px"
                        //  boxShadow: "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px"
                        boxShadow: " rgba(0, 0, 0, 0.16) 0px 1px 4px, rgb(51, 51, 51) 0px 0px 0px 3px",
                    }}>
                    <RadarChartUser
                        rateInfo={rate}
                    />
                </div>
            </Group>
            <Divider />
        </>
    )
}

export default RateUserThumb
