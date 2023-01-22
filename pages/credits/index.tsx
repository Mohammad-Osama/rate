import { ICastOrCrew } from '../../helpers/types';
import { Group, Container, SimpleGrid, Button, Text } from '@mantine/core';
import PersonThumb from '../../components/personThumb';
import { useRouter } from 'next/router'
import HeadPage from '../../components/HeadPage';
import { useSelector } from 'react-redux';
import { creditsState } from '../../redux/slices/creditsEpisodeSlice';
import React, { useState, useEffect } from 'react'
import { GetServerSidePropsResult, GetServerSidePropsContext } from 'next';



const index = () => {
    const [list, setList]: [ICastOrCrew[] | undefined, (x: ICastOrCrew[] | undefined) => void] = useState<ICastOrCrew[] | undefined>()
    const router = useRouter()
    const { title, type } = (router.query);
    const { cast, crew, guest_stars } = useSelector(creditsState)

    /*  function moveDirector() {
         const removeDirector = creditProps.filter((x: ICastOrCrew) => x.job !== "Director")
         removeDirector.unshift(...creditProps)
         //now back at the beginning  , not working ! 
         return removeDirector
     }
  */

    /* if (notFound === true)
        return (<div>Error Page</div>)
    else */
    useEffect(() => {
        switch (type) {
            case "Guest Stars":
                setList(guest_stars)
                break;
            case "Cast":
                setList(cast)
                break;
            case "Crew":
                setList(crew)
                break;
        }
        return () => {
        }
    }, [])


    return (
        <Container size="xl" my="md" pb="xl" >
            <HeadPage
                title={`${title} - ${type}`}
                description={`${title} - ${type}`}

            />
            <Group position="apart" mr="xl" ml="xl" mb="xl">
                <Text
                    align="justify"
                    weight={700}
                    color="white"
                    style={{ fontFamily: 'Greycliff CF, sans-serif', fontSize: "30px", minWidth: "60px" }}
                >
                    {title} - {type}
                </Text>

                <Button
                    bg="#373A40"
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
                {list?.map((x) => {
                    return <PersonThumb
                        dataPerson={x}
                        key={x.credit_id}
                    />
                })
                }
            </SimpleGrid>
        </Container>
    )
}

export default index

interface X {
    title: string;
    type: string;
    notFound: boolean;
}

// added this to fix router query being undefined 
export async function getServerSideProps(context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<X>> {
    const { title, type } = context.query
    return {
        props: {
            title: title as string,
            type: type as string,
            notFound: false
        },
    }
}