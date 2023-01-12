import React from 'react'
import {
    Container,
    Image,
    Space,
    Divider,
    HoverCard
} from '@mantine/core';
import MiddleTitle from './MiddleTitle';
import Link from 'next/link';
import { IProductionCompany, IProductionCountry, ISpokenLanguage, IStatus } from '../helpers/types';
import * as tmdb from "../helpers/tmdb"



interface X {
    status: string;
    first_air_date: string;
    number_of_seasons: number
    number_of_episodes: number
    production_countries: IProductionCountry[]
    production_companies: IProductionCompany[]
    spoken_languages: ISpokenLanguage[]
    homepage:string
}

const TvDetails = ({ status,
    first_air_date,
    number_of_seasons,
    number_of_episodes,
    production_companies,
    production_countries,
    spoken_languages,
    homepage
}: X) => {
    return (
        <Container
        //style={{ border: "solid" }} 
        >
            <Space h="lg" />
            <MiddleTitle
                title="Status"
                content={status}
            />

            <Divider variant="solid" mt="lg" mb="lg" />

            <MiddleTitle
                title="First Air Date"
                content={first_air_date}
            />

            <Divider variant="solid" mt="lg" mb="lg" />

            <MiddleTitle
                title="Seasons"
                content={number_of_seasons.toString()}
            />

            <Divider variant="solid" mt="lg" mb="lg" />

            <MiddleTitle
                title="Episodes"
                content={number_of_episodes.toString()}
            />

            <Divider variant="solid" mt="lg" mb="lg" />

            <MiddleTitle
                title="Filming Locations"
                content={production_countries.map((item, index) => {
                    if (index === production_countries.length - 1)
                        return <React.Fragment key={item.name}>{item.name}</React.Fragment>
                    else
                        return <React.Fragment key={item.name}><>{item.name}</> <> , </></React.Fragment>
                })}
            />

            <Divider variant="solid" mt="lg" mb="lg" />

            <MiddleTitle
                title="Production Companies"
                content={
                    production_companies.map((item, index) => {
                        if (index === production_companies.length - 1)
                            return <HoverCard position="top" key={index}>
                                <HoverCard.Target>
                                    <Link
                                        href={{
                                            pathname: "/company/[id]",
                                            query: {
                                                id: item.id,
                                            },
                                        }}
                                        as={`/company/${item.id}`}
                                        style={{ color: "#4DABF7" }}
                                    >
                                        {item.name}
                                    </Link>
                                </HoverCard.Target>
                                <HoverCard.Dropdown bg="gray">
                                    <Image
                                        src={item.logo_path
                                            ? `${tmdb.imgUrl}${tmdb.imgOriginal}${item.logo_path}`
                                            : '/images/no_media.jpg'
                                        }
                                        height={133}
                                        width={133}
                                        fit="contain"
                                    />
                                </HoverCard.Dropdown>
                            </HoverCard>
                        else
                            return <HoverCard position="top" key={index}>
                                <HoverCard.Target>
                                    <span ><Link
                                        href={{
                                            pathname: "/company/[id]",
                                            query: {
                                                id: item.id,
                                            },
                                        }}
                                        as={`/company/${item.id}`}
                                        style={{ color: "#4DABF7" }}
                                    >
                                        {item.name}
                                    </Link>
                                        <> , </>
                                    </span>
                                </HoverCard.Target>
                                <HoverCard.Dropdown bg="gray">
                                    <Image
                                        src={item.logo_path
                                            ? `${tmdb.imgUrl}${tmdb.imgOriginal}${item.logo_path}`
                                            : '/images/no_media.jpg'
                                        }
                                        height={133}
                                        width={133}
                                        fit="contain"
                                    />
                                </HoverCard.Dropdown>
                            </HoverCard>
                    })
                } />

            <Divider variant="solid" mt="lg" mb="lg" />

            <MiddleTitle
                title="Spoken Languages"
                content={
                    spoken_languages.map((item, index) => {
                        if (index === spoken_languages.length - 1)
                            return <React.Fragment key={index}>{item.english_name}</React.Fragment>
                        else
                            return <React.Fragment key={index}><>{item.english_name}</> <> , </></React.Fragment>
                    })
                } />
            <Divider variant="solid" mt="lg" mb="lg" />

            <MiddleTitle
                title="Website"
                content={<a href={homepage} key={1} style={{ color: "#4DABF7" }}>Homepage </a>}
            />
            <Space h="lg" />  {/* incase of another detail ? */}

            <Divider variant="solid" mt="lg" mb="lg" />

            <Space h="lg" />

        </Container>
    )
}

export default TvDetails
