import React from 'react'
import { IMovieOrTv } from '../helpers/types'
import { Card, Image, Text, Badge, Button, Group, Center, Stack } from '@mantine/core';
import * as tmdb from "./../helpers/tmdb"

interface X {
    media: IMovieOrTv;
}
const MediaThumb = ({ media }: X) => {

    const { id, title, poster_path, vote_average, release_date, genre_ids } = media

    return (
        <Stack align="center"
            justify="space-between"
            spacing="sm" sx={() => ({
                backgroundColor:'#212529',
            })}>
            <Image
                src={`${tmdb.imgUrl}${tmdb.imgSize}${poster_path}`}
                fit="contain"
                alt={title}

            />
            <Text color="white"
                align="center"
                size="xl"
                weight={700}
                m="md"
            >
                {title}
            </Text>
            <Group position="center">
                {genre_ids.map((x) => {

                    return <Button color="dark" style={{ borderColor:"white"}} compact radius="xl">
                       {x}
                    </Button>
                })}
            </Group>
            <Text color="white" size="xl">
                        {release_date}
                    </Text>
            <Badge color="teal" variant="filled" size="lg" m="lg">
                {vote_average}
            </Badge>
        </Stack>
    )
}

export default MediaThumb
