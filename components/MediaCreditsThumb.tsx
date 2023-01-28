import {
    Grid,
    Image,
    Group,
    Text,
    Divider,
} from '@mantine/core';
import { IPersonCreditsModified } from '../helpers/types';
import * as tmdb from "./../helpers/tmdb"
import ValueBadge from './ValueBadge';
import Link from 'next/link'
import { useSelector } from 'react-redux';
import { authState } from '../redux/slices/authSlice';

interface X {
    dataMedia: IPersonCreditsModified
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

    const userData= useSelector(authState)
    const userId=userData.id

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
                            <Link href={{
                                pathname: "/media/${mediaType}/[id]",
                                query: {
                                    id: id
                                },
                            }}
                                as={`/media/${media_type}/${id}?type=${media_type}&user=${userId}`}
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


