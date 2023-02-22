import React from 'react'
import { IGenre, IMovieOrTv } from '../helpers/types'
import { Image, Text, Badge, Button, Group, Stack } from '@mantine/core';
import * as tmdb from "./../helpers/tmdb"
import Link from 'next/link'
import { authState  } from '../redux/slices/authSlice';
import { useSelector } from 'react-redux';

interface X {
    media: IMovieOrTv;
    genre: IGenre[];
    mediaType:string
}
const MediaThumb = ({ media, genre ,mediaType}: X) => {
    const userData= useSelector(authState)
    const userId=userData.id

    const { id, title, poster_path, vote_average, release_date ,name,first_air_date} = media
    return (
        <Stack align="center"
            justify="space-between"
            spacing="sm" 
            sx={() => ({
                backgroundColor: '#212529',
                '&:hover': {
                    transform: 'scale(1.01)',
                  },
            })}>
            
            <Link   href={{
                        pathname :"/media/${mediaType}/[id]",
                        query: {
                            id: id
                          },
            }}
                    as={`/media/${mediaType}/${id}?type=${mediaType}&user=${userId}`}
            >
                <Image
                    src={poster_path
                        ?`${tmdb.imgUrl}${tmdb.imgSize}${poster_path}`
                        :'/images/no_media.jpg'
                        
                    }
                    fit="contain"
                    alt={title}
                />
            </Link>
            <Text color="white"
                align="center"
                size="xl"
                weight={700}
                m="md"
            >
                {title
                ?title
                :name
                }
            </Text>
            <Group position="center">
                {genre.map((x) => {
                    return <Button color="dark"
                        style={{ borderColor: "white" }}
                        compact
                        radius="xl"
                        key={x.id}
                    >
                        {x.name}
                    </Button>
                })}
            </Group>
            <Text color="white" size="xl">
                {release_date
                ?release_date
                :first_air_date
                }
            </Text>
            <Badge color="teal" variant="filled" size="lg" m="lg">
                {vote_average}
            </Badge>
        </Stack>
    )
}

export default MediaThumb
