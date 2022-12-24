import React from 'react'
import { ICast, ICastOrCrew, ICrew, IGenre, IMovieOrTv } from '../helpers/types'
import { Card, Image, Text, Badge, Button, Group, Center, Stack } from '@mantine/core';
import * as tmdb from "./../helpers/tmdb"
import Link from 'next/link'
import { AppDispatch } from '../redux/store';
import { authState ,logout } from '../redux/slices/authSlice';
import { useSelector ,useDispatch} from 'react-redux';

interface X {
    dataPerson : ICastOrCrew
}
const PersonThumb = ({dataPerson}: X) => {
   /*  const userData= useSelector(authState)
    const userId=userData.id */
    
    const { id , name,profile_path , character , job } = dataPerson
    return (
        <Stack align="center"
            justify="flex-start"
            spacing="xs" sx={() => ({
                backgroundColor: '#212529',
            })}>
            
            {/* <Link   href={{
                        pathname :"/media/${mediaType}/[id]",
                        query: {
                            id: id
                          },
            }}
                    as={`/media/${mediaType}/${id}?type=${mediaType}&user=${userId}`}
            > */}
                <Image
                    src={profile_path
                        ?`${tmdb.imgUrl}${tmdb.imgSize}${profile_path}`
                        :"/images/no_person.jpg"
                        }
                    fit="contain"
                    alt={name}

                />
          {/*   </Link> */}
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
                ?character
                :job
                }
            </Text>
        </Stack>
    )
}

export default PersonThumb
