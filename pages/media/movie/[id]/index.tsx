import React from 'react'
import { GetStaticProps, GetStaticPropsResult, GetServerSideProps, GetStaticPropsContext, GetServerSidePropsResult, GetServerSidePropsContext } from 'next';
import * as tmdb from "../../../../helpers/tmdb"
import { IMovie } from '../../../../helpers/types';


const index = ({movieInfoProps}:X) => {
   console.log(movieInfoProps)
   const {id} = movieInfoProps
    return (
        <div>

            {
           id 
            }
        </div>
    )
}

export default index

interface X {
    movieInfoProps: IMovie 
   
}
export async function getServerSideProps(context:GetServerSidePropsContext): Promise<GetServerSidePropsResult<X>> {
    const {id,type}=context.query
     let movieInfo={} as IMovie
     try {
        if (type==="movie")
        {
            const response = await fetch(`${tmdb.urlMovie}${id}?api_key=${tmdb.key}&language=en-US`)
            const data = await response.json()
            movieInfo =data
        }
      
   
 
         return {
             props: {
                 movieInfoProps: movieInfo
                 
             },
         }
 
     } catch (error) {
         return {
             props: {
                movieInfoProps:{} as IMovie
             },
         }
     }
 } 
