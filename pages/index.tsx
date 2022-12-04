import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { IGenre, IMovieOrTv } from '../helpers/types';
import { Group, Container, SimpleGrid, Chip, useMantineTheme, createStyles, Button, Image } from '@mantine/core';
import * as tmdb from "./../helpers/tmdb"
import MediaThumb from '../components/MediaThumb';
import HomeFilter from '../components/HomeFilter';



const useStyles = createStyles((theme) => ({
  container: {
    //  color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
    // backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.cyan[1],
    color: theme.colors.dark[0],
    backgroundColor: theme.colors.dark[4],
  },

}));



export default function Home() {

  const { classes } = useStyles()

  const emptyList: IMovieOrTv[] = []
  const emptyGenres: IGenre[] = []

  const [list, setList]: [IMovieOrTv[], (x: IMovieOrTv[]) => void] = useState(emptyList)
  const [genres, setGenres]: [IGenre[], (x: IGenre[]) => void] = useState(emptyGenres)


  const [mediaType, setMediaType]: [string, (x: string) => void] = useState("movie")


  const [moviesTypes, setMoviestypes]: [string, (x: string) => void] = useState("popular")
  const [tvTypes, setTvTypes]: [string, (x: string) => void] = useState("popular")


  async function getMovies(type : string) {
    const movies = await axios.get(`/api/movies?type=${type}` )
    setList(movies.data.results as IMovieOrTv[])
  }

  async function getTvs(type : string) {
    const tvs = await axios.get(`/api/tv?type=${type}` )
    setList(tvs.data.results as IMovieOrTv[])
  }

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
    if (mediaType==="movie")
    {
      getMovies(moviesTypes)
    }
    else {
      getTvs(tvTypes)
    }
   
   
    getGenres()
    return () => {

    }
  }, [moviesTypes , mediaType ,tvTypes ])
  return (
    <div className={styles.container}>
      <Head>
        <title>Rate My Media</title>
        <meta name="rate" content="rate a movie or a tv show" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container size="xl" my="md" pb="xl" className={classes.container}>
          <HomeFilter  mediaType={mediaType}
                       setMediaType={setMediaType}
                       moviesTypes={moviesTypes}
                       setMoviestypes={setMoviestypes} 
                       tvTypes={tvTypes}
                       setTvTypes={setTvTypes}
                        />

        <SimpleGrid cols={4} spacing="lg"
          breakpoints={[
            { maxWidth: 1024, cols: 3, spacing: 'md' },
            { maxWidth: 768, cols: 2, spacing: 'sm' },
            { maxWidth: 500, cols: 1, spacing: 'sm' },
          ]} >
          {list?.map((x) => {

            return <MediaThumb media={x}
                               genre={findGenre(x)}
                               key={x.id} 
                               mediaType={mediaType}
                               />
                          })}
        </SimpleGrid>
      </Container>

    </div>
  )
}
