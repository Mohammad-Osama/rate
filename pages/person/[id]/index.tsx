import React from 'react'
import { GetServerSidePropsResult, GetServerSidePropsContext } from 'next';
import * as tmdb from "../../../helpers/tmdb"
import { IPerson, IPersonCredits } from '../../../helpers/types';
import { Space, Container, Image, Text, Group, Divider, Grid, Stack } from '@mantine/core';
import HeadPage from '../../../components/HeadPage';
import ValueBadge from '../../../components/ValueBadge';
import AccordionCreditsPerson from '../../../components/AccordionCreditsPerson';
import SideTitle from '../../../components/SideTitle';
import CarouselPhotos from '../../../components/CarouselPhotos';
import MiddleTitle from '../../../components/MiddleTitle';



const index = ({ personProps, notFound, personCreditsProps }: X) => {
    const {
        name,
        biography,
        profile_path,
        known_for_department,
        also_known_as,
        popularity,
        birthday,
        deathday,
        place_of_birth,
        homepage,
        imdb_id,
        id
    } = personProps

    const born = () => {
        if (birthday === null && place_of_birth === null)
            return ""

        else if (birthday !== null && place_of_birth === null)
            return `${birthday}`

        else if (birthday === null && place_of_birth !== null)
            return ` in ${place_of_birth}`

        else if (birthday !== null && place_of_birth !== null)
            return `${birthday} in ${place_of_birth}`
    }


    if (notFound === true)
        return (<div>Error Page</div>)
    else
        return (
            <Container size="xl">
                <HeadPage
                    title={name}
                    description={biography}
                />
                <Group
                    position="apart"
                    m="xl"
                >
                    <div>
                        <Text
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
                            Known for : {known_for_department}
                        </Text>
                    </div>
                    <div>
                        <Text
                            size="xl"
                            color="#ADB5BD"
                        >
                            Popularity
                        </Text>
                        <ValueBadge x={popularity} />
                    </div>
                </Group>
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

                            <MiddleTitle
                                title="Born"
                                content={born()}
                            />
                            {deathday &&
                                <MiddleTitle
                                    title="Died"
                                    content={deathday}
                                />
                            }

                            <MiddleTitle
                                title="Websites"
                                content={[<a href={homepage as string} key={1} style={{ color: "#4DABF7" }}>Homepage </a>,
                                    "- ",
                                <a href={`https://www.imdb.com/name/${imdb_id}`} key={2} style={{ color: "#4DABF7" }}>IMDB </a>
                                ]} />
                        </Stack>
                    </Grid.Col>
                </Grid>
                <Divider />
                <Space h="md" />
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
                <Space h="md" />
                <Divider />
                <Space h="xl" />
                <SideTitle
                    text="Photos"
                />
                <CarouselPhotos
                    id={id}
                    type="perosn"
                    season_number=''
                    episode_number=''
                />
                <Space h="xl" />
                <AccordionCreditsPerson
                    type="Cast"
                    data={personCreditsProps.cast}
                />
                <Space h="xl" />
                <AccordionCreditsPerson
                    type="Crew"
                    data={personCreditsProps.crew}
                />


            </Container>
        )
}

export default index


interface X {
    personProps: IPerson;
    personCreditsProps: IPersonCredits;
    notFound: boolean;
}
export async function getServerSideProps(context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<X>> {
    const { id } = context.query
    try {
        const response = await fetch(`${tmdb.urlPerson}${id}?api_key=${tmdb.key}&language=en-US`)
        const resData = await response.json()
        const responseCredits = await fetch(`${tmdb.url}/person/${id}/combined_credits?api_key=${tmdb.key}&language=en-US`)
        const dataCredits = await responseCredits.json()
        return {
            props: {
                personProps: resData as IPerson,
                personCreditsProps: dataCredits as IPersonCredits,
                notFound: false
            },
        }
    } catch (error) {
        return {
            props: {
                personProps: {} as IPerson,
                personCreditsProps: {} as IPersonCredits,
                notFound: false
            },
        }
    }
}
