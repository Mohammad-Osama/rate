import React from 'react'
import { IGenre, IMovieOrTv } from '../helpers/types'
import { Card, Image, Text, Badge, Button, Group, Center, Stack } from '@mantine/core';
import * as tmdb from "./../helpers/tmdb"
import Link from 'next/link'



interface X {
    media: IMovieOrTv;
    genre: IGenre[]
}
const MediaThumb = ({ media, genre }: X) => {

    const { id, title, poster_path, vote_average, release_date, genre_ids ,name,first_air_date} = media
    return (
        <Stack align="center"
            justify="space-between"
            spacing="sm" sx={() => ({
                backgroundColor: '#212529',
            })}>
            <Link href='/media/[_id]' as={`/media/${id}`}>
                <Image
                    src={`${tmdb.imgUrl}${tmdb.imgSize}${poster_path}`}
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
