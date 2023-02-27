import React, { useState, useEffect } from 'react'
import { GetServerSidePropsResult, GetServerSidePropsContext } from 'next';
import * as tmdb from "../../../helpers/tmdb"
import { IGenre, ICollectionDetails, IMovieOrTv } from '../../../helpers/types';
import { Space, Container, SimpleGrid, Card, Image, Text } from '@mantine/core';
import * as colors from '../../../helpers/colors'
import axios from 'axios';
import MediaThumb from '../../../components/MediaThumb';
import SideTitle from '../../../components/SideTitle';
import HeadPage from '../../../components/HeadPage';
import NotFound from '../../../components/NotFound';



const index = ({ collectionProps, notFound }: X) => {
    const { name, overview, poster_path, parts } = collectionProps
    const mediaType = "movie"
    const emptyGenres: IGenre[] = []

    const [genres, setGenres]: [IGenre[], (x: IGenre[]) => void] = useState(emptyGenres)

    async function getGenres() {
        const genresMovies: any = await axios.get("/api/movies/genres")
        const genresTv: any = await axios.get("/api/tv/genres")
        const result = genresMovies.data.genres.concat(
            genresTv.data.genres.filter((bo: any) => {
                genresMovies.data.genres.every((ao: any) => {
                    ao.id != bo.id
                })
            })
        )
        setGenres(result as IGenre[])
    }

    const findGenre = (x: IMovieOrTv) => {
        let names: IGenre[] = []
        x.genre_ids?.forEach((movieGenre: number) => {
            genres.forEach((ids: IGenre) => {
                if (movieGenre === ids.id) {
                    names.push({ id: movieGenre, name: ids.name })
                }
            })
        })
        return names
    }

    useEffect(() => {
        getGenres()
        return () => {
        }
    }, [])


    if (notFound === true)
        return (
            <NotFound />
        )
    else
        return (
            <Container size="xl" my="md" pb="xl" >
                <HeadPage
                    title={name}
                    description={overview}

                />
                <Text
                    align="center"
                    weight={700}
                    color="white"
                    style={{ fontFamily: 'Greycliff CF, sans-serif', fontSize: "30px", minWidth: "60px" }}
                >
                    {name}
                </Text>
                <SimpleGrid cols={2} spacing="lg" mt="xl" mb="xl"
                    breakpoints={[
                        { maxWidth: 1024, cols: 2, spacing: 'md' },
                        { maxWidth: 768, cols: 1, spacing: 'sm' },
                        { maxWidth: 500, cols: 1, spacing: 'sm' },
                    ]}
                //   style={{backgroundColor:"#212529"}}
                >
                    <Image
                        src={`${tmdb.imgUrl}${tmdb.imgSize}${poster_path}`}
                        fit="contain"
                        alt={name}
                    />
                    <Card radius="md" // first col in 2nd simple grid
                        p="md"
                        style={{ backgroundColor: colors.bodyBackground }}>

                        <Card.Section>
                            <Text
                                align="justify"
                                weight={100}
                                color="white"
                                style={{
                                    fontFamily: 'Roboto,Helvetica,Arial,sans-serif',
                                    fontSize: "25px",
                                    backgroundColor: "#373A40"
                                }}>
                                {overview}
                            </Text>
                        </Card.Section>
                    </Card>
                </SimpleGrid>
                <Space h="xl" />
                <SideTitle text="Movies In This Collection" />
                <SimpleGrid cols={4} spacing="lg"
                    breakpoints={[
                        { maxWidth: 1024, cols: 3, spacing: 'md' },
                        { maxWidth: 768, cols: 2, spacing: 'sm' },
                        { maxWidth: 500, cols: 1, spacing: 'sm' },
                    ]} >
                    {parts.map((x) => {
                        return <MediaThumb media={x}
                            genre={findGenre(x)}
                            key={x.id}
                            mediaType={mediaType}
                        />
                    })}
                </SimpleGrid>
            </Container>
        )
}
export default index



interface X {
    collectionProps: ICollectionDetails
    notFound: boolean
}
export async function getServerSideProps(context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<X>> {
    const { id } = context.query
    try {
        const response = await fetch(`${tmdb.url}/collection/${id}?api_key=${tmdb.key}&language=en-US`)
        const resData = await response.json()
        return {
            props: {
                collectionProps: resData as ICollectionDetails,
                notFound: false
            },
        }
    } catch (error) {
        return {
            props: {
                collectionProps: {} as ICollectionDetails,
                notFound: false
            },
        }
    }
}