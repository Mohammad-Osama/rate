import React from 'react'
import { ICastOrCrew } from '../helpers/types'
import { Image, Text, Stack } from '@mantine/core';
import * as tmdb from "./../helpers/tmdb"
import Link from 'next/link'

interface X {
    dataPerson: ICastOrCrew
}
const PersonThumb = ({ dataPerson }: X) => {

    const { id, name, profile_path, character, job } = dataPerson
    return (
        <Stack align="center"
            justify="flex-start"
            spacing="xs" sx={() => ({
                backgroundColor: '#212529',
            })}>

            <Link   href={{
                        pathname :"/person/[id]",
                        query: {
                            id: id
                          },
            }}
                    as={`/person/${id}`}
            >
            <Image
                src={profile_path
                    ? `${tmdb.imgUrl}${tmdb.imgSize}${profile_path}`
                    : "/images/no_person.jpg"
                }
                fit="contain"
                alt={name}

            />
              </Link>
            <Text color="white"
                align="center"
                size="xl"
                weight={500}
                m="xs"
            >
                {name
                }
            </Text>
            <Text color="white"
                align="center"
                size="lg"
                weight={400}
                m="xs"
            >
                {character
                    ? character
                    : job
                }
            </Text>
        </Stack>
    )
}

export default PersonThumb
