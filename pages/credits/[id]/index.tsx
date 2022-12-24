import React from 'react'
import { GetServerSidePropsResult, GetServerSidePropsContext } from 'next';
import * as tmdb from "../../../helpers/tmdb"
import { ICastOrCrew } from '../../../helpers/types';




const index = ({ creditProps, notFound }: X) => {
    return (
        <div>
            {creditProps.map((c) => {
                if (c.job) {
                    return c.job
                }
                else {
                    return c.character
                }
            })}
        </div>
    )
}

export default index



interface X {
    creditProps: ICastOrCrew[]
    notFound: boolean
}
export async function getServerSideProps(context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<X>> {
    const { id, type } = context.query
    let movieCredits
    try {

        const responseCredits = await fetch(`${tmdb.urlMovie}${id}/credits?api_key=${tmdb.key}&language=en-US`)
        const dataCredits = await responseCredits.json()
        if (type === "Cast") {
            movieCredits = dataCredits.cast
            return {
                props: {
                    creditProps: movieCredits,
                    notFound: false
                },
            }
        }
        else {
            movieCredits = dataCredits.crew
            return {
                props: {
                    creditProps: movieCredits,
                    notFound: false
                },
            }
        }
    } catch (error) {
        return {
            props: {
                creditProps: [] as ICastOrCrew[],
                notFound: false
            },
        }
    }
}