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
    status: IStatus;
    release_date: string;
    budget: number;
    revenue: number;
    production_countries: IProductionCountry[]
    production_companies: IProductionCompany[]
    spoken_languages: ISpokenLanguage[]
}


const MovieDetails = ({
    status,
    release_date,
    budget,
    revenue,
    production_countries,
    production_companies,
    spoken_languages,
}: X) => {

    const budgetFinal = Math.round((budget / 1000000) * 100) / 100
    const revenueFinal = Math.round((revenue / 1000000) * 100) / 100
    const profit = revenue - budget

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
                title="Release Date"
                content={release_date}
            />

            <Divider variant="solid" mt="lg" mb="lg" />

            <MiddleTitle
                title="Budget"
                content={`${budgetFinal.toString()} mil $`}
            />

            <Divider variant="solid" mt="lg" mb="lg" />

            <MiddleTitle
                title="Revenue"
                content={`${revenueFinal.toString()} mil $  (${status === "Released"
                    ? ` ${profit.toString()} mil $)`
                    : ')'
                    }`
                }
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
                                    <Link href="/person" style={{ color: "#4DABF7" }}>{item.name}</Link>
                                </HoverCard.Target>
                                <HoverCard.Dropdown bg="gray">
                                    <Image 
                                        src={`${tmdb.imgUrl}${tmdb.imgOriginal}${item.logo_path}`}  
                                        height={133}
                                        width={133}

                                    />
                                </HoverCard.Dropdown>
                            </HoverCard>
                        else
                            return <HoverCard position="top" key={index}>
                                <HoverCard.Target>
                                <span ><Link href={`/${item.name}`} style={{ color: "#4DABF7" }}>{item.name}</Link> <> , </></span>
                                </HoverCard.Target>
                                <HoverCard.Dropdown bg="gray">
                                <Image 
                                        src={`${tmdb.imgUrl}${tmdb.imgOriginal}${item.logo_path}`}  
                                        height={133}
                                        width={133}
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

            <Space h="lg" />  {/* incase of another detail ? */}

            <Divider variant="solid" mt="lg" mb="lg" />

            <Space h="lg" />

        </Container>
    )
}

export default MovieDetails
