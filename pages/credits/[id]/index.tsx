import React from 'react'
import { GetServerSidePropsResult, GetServerSidePropsContext } from 'next';
import * as tmdb from "../../../helpers/tmdb"
import { ICastOrCrew } from '../../../helpers/types';
import { Group, Container, SimpleGrid, Chip, useMantineTheme, createStyles, Button, Image, Text } from '@mantine/core';
import PersonThumb from '../../../components/personThumb';
import Link from 'next/link'
import { useRouter } from 'next/router'




const index = ({ creditProps, type, title, notFound }: X) => {
    const router = useRouter()

 function moveDirector(){
        const removeDirector = creditProps.filter((x: ICastOrCrew) => x.job !== "Director")
        removeDirector.unshift(...creditProps)
       //now back at the beginning  , not working ! 
        return removeDirector
    }


    if (notFound === true)
        return (<div>Error Page</div>)
    else
        return (
            <Container size="xl" my="md" pb="xl" >
                <Group position="apart" mr="xl" ml="xl" mb="xl">
                    <Text
                        align="justify"
                        weight={700}
                        color="white"
                        style={{ fontFamily: 'Greycliff CF, sans-serif', fontSize: "30px", minWidth: "60px" }}
                    >
                        {title} - {type}
                    </Text>

                    <Button bg="#373A40"
                        fz="md"
                        //   w="100%"
                        onClick={() => router.back()}
                    >
                        Go Back
                    </Button>
                </Group>
                <SimpleGrid cols={6} spacing="lg"
                    breakpoints={[
                        { maxWidth: 1024, cols: 6, spacing: 'md' },
                        { maxWidth: 768, cols: 4, spacing: 'sm' },
                        { maxWidth: 500, cols: 3, spacing: 'sm' },
                    ]} >
                     {type==="Cast"
                     ? creditProps.map((x) => {
                        // if (type==="Cast")
                        return <PersonThumb dataPerson={x}
                            key={x.credit_id}
                        />
                    })
                    : moveDirector().map((x) => {
                        console.log("in func")
                        // if (type==="Cast")
                        return <PersonThumb dataPerson={x}
                            key={x.credit_id}
                        />
                    })
                     }   
                    {}
                </SimpleGrid>
                {/*  <div>
            {creditProps.map((c) => {
                if (c.job) {
                    return c.job
                }
                else {
                    return c.character
                }
            })}
        </div> */}
            </Container>
        )
}

export default index



interface X {
    creditProps: ICastOrCrew[]
    type: string
    title: string
    notFound: boolean
}
export async function getServerSideProps(context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<X>> {
    const { id, type, title } = context.query
    let movieCredits
    try {
        const responseCredits = await fetch(`${tmdb.urlMovie}${id}/credits?api_key=${tmdb.key}&language=en-US`)
        const dataCredits = await responseCredits.json()
        if (type === "Cast") {
            movieCredits = dataCredits.cast
            return {
                props: {
                    creditProps: movieCredits,
                    type: "Cast",
                    title: title as string,
                    notFound: false
                },
            }
        }
        else {
            movieCredits = dataCredits.crew
            return {
                props: {
                    creditProps: movieCredits,
                    type: "Crew",
                    title: title as string,
                    notFound: false
                },
            }
        }
    } catch (error) {
        return {
            props: {
                creditProps: [] as ICastOrCrew[],
                type: "Error",
                title: "Error",
                notFound: false
            },
        }
    }
}