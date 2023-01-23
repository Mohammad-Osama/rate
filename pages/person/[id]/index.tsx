import React, { useState, useEffect } from 'react'
import { GetServerSidePropsResult, GetServerSidePropsContext } from 'next';
import * as tmdb from "../../../helpers/tmdb"
import { IEpisode, ICredits, IPerson } from '../../../helpers/types';
import { Space, Container, Image, Text, Group, Divider, Grid,Stack } from '@mantine/core';
import HeadPage from '../../../components/HeadPage';
import ValueBadge from '../../../components/ValueBadge';
import { addCredits, removeCredits } from '../../../redux/slices/creditsEpisodeSlice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../redux/store';
import AccordionCredits from '../../../components/AccordionCredits';
import SideTitle from '../../../components/SideTitle';
import CarouselPhotos from '../../../components/CarouselPhotos';
import CarouselVideos from '../../../components/CarouselVideos';
import MiddleTitle from '../../../components/MiddleTitle';



const index = ({ personProps, notFound }: X) => {
    console.log(personProps)
    const {
        name,
        biography,
        profile_path,
        known_for_department,
        also_known_as
    } = personProps

    if (notFound === true)
        return (<div>Error Page</div>)
    else
        return (
            <Container size="xl">
                <HeadPage
                    title={name}
                    description={biography}
                />

                <Text
                    //  p="xl"
                    align="justify"
                    weight={700}
                    color="white"
                    style={{ fontFamily: 'Greycliff CF, sans-serif', fontSize: "30px", minWidth: "60px" }}
                >
                    {name}
                </Text>
                <Text
                    size="xl"
                    color="#ADB5BD"
                >
                    {known_for_department}
                </Text>
                <Grid
                    gutter="lg"
                    columns={12}
                //   style={{backgroundColor:"#212529"}}
                >
                    <Grid.Col sm={5} >
                        <Image
                            src={profile_path
                                ? `${tmdb.imgUrl}${tmdb.imgSize}${profile_path}`
                                : '/images/no_person.jpg'
                            }
                            // height="600px"
                            // width="30%"
                            fit="contain"
                            alt={name}
                        />
                    </Grid.Col>
                    <Grid.Col sm={7}>

                        <Stack>
                            <MiddleTitle
                                    title="Also Known As"
                                    content={also_known_as.map((item, index) => {
                                        if (index === also_known_as.length - 1)
                                            return <React.Fragment key={item}>{item}</React.Fragment>
                                        else
                                            return <React.Fragment key={item}><>{item}</> <> , </></React.Fragment>
                                    })}
                            />
                            
                            <Space h="md" />
                            <Divider />
                            <Space h="md" />


                        </Stack>
                    </Grid.Col>
                </Grid>
                <Text align="justify"
                    weight={100}
                    color="white"
                    style={{
                        fontFamily: 'Roboto,Helvetica,Arial,sans-serif',
                        fontSize: "25px",
                        backgroundColor: "#373A40"
                    }}>
                    {biography}
                </Text>


            </Container>
        )
}

export default index


interface X {
    personProps: IPerson;
    notFound: boolean;
}
export async function getServerSideProps(context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<X>> {
    const { id } = context.query
    try {
        // api.themoviedb.org/3/person/{person_id}?api_key=<<api_key>>&language=en-US
        const response = await fetch(`${tmdb.urlPerson}${id}?api_key=${tmdb.key}&language=en-US`)
        const resData = await response.json()
        return {
            props: {
                personProps: resData as IPerson,
                notFound: false
            },
        }
    } catch (error) {
        return {
            props: {
                personProps: {} as IPerson,
                notFound: false
            },
        }
    }
}
