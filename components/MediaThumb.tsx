import React from 'react'
import { IMovieOrTv } from '../helpers/types'
import { Card, Image, Text, Badge, Button, Group, Center } from '@mantine/core';
import * as tmdb from "./../helpers/tmdb"

interface X {
    media: IMovieOrTv;
}
const Moviethumb = ({ media }: X) => {
    const { id, title, poster_path, vote_average, release_date, genre_ids } = media
    return (
        <Card p="xl" style={{
            backgroundColor: '#212529',

        }}>
            <Card.Section>

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
            </Card.Section>


            <Card.Section>
                <Group position="center">
                    {genre_ids.map(() => {

                        return <Button>
                            genre
                        </Button>
                    })}
                </Group>

            </Card.Section>

            <Card.Section >
                <Center style={{ marginBottom: 30, marginTop: 30 }}>
                    <Text color="white" size="xl">
                        {release_date}
                    </Text>
                </Center>

                <Center style={{ marginBottom: 30, marginTop: 30 }}>
                    <Badge color="teal" variant="filled" size="lg">
                        {vote_average}
                    </Badge>
                </Center>

            </Card.Section>

        </Card>


    )
}

export default Moviethumb
