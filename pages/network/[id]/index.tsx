import { GetServerSidePropsResult, GetServerSidePropsContext } from 'next';
import * as tmdb from "../../../helpers/tmdb"
import { INetworkDetails, IProductionCompanyDetails } from '../../../helpers/types';
import { Space, Container, SimpleGrid, Card, Image, Text, Stack, HoverCard } from '@mantine/core';
import * as colors from '../../../helpers/colors'
import MiddleTitle from '../../../components/MiddleTitle';
import Link from 'next/link';
import HeadPage from '../../../components/HeadPage';

const index = ({networkProps,notFound}:X) => {
    const{name,logo_path,origin_country,headquarters,homepage}=networkProps

    if (notFound === true)
        return (<div>Error Page</div>)
    else
    return (
        <Container size="xl" my="md" pb="xl" >
            <HeadPage
                title={name}
                description={name}
            />
            <Text
                align="center"
                weight={700}
                color="white"
                style={{ fontFamily: 'Greycliff CF, sans-serif', fontSize: "30px", minWidth: "60px" }}
            >
                {name}
            </Text>
            <SimpleGrid cols={2} spacing="xl" mt="xl" mb="xl"
                breakpoints={[
                    { maxWidth: 1024, cols: 2, spacing: 'md' },
                    { maxWidth: 768, cols: 1, spacing: 'sm' },
                    { maxWidth: 500, cols: 1, spacing: 'sm' },
                ]}
            >
                <Image
                    src={logo_path
                        ? `${tmdb.imgUrl}${tmdb.imgOriginal}${logo_path}`
                        : '/images/no_media.jpg'
                    }
                    fit="contain"
                    alt={name}
                />

                <Stack ml="xl">
                    <MiddleTitle
                        title={"Headquarters "}
                        content={headquarters}
                    />
                    <MiddleTitle
                        title={"Country "}
                        content={origin_country}
                    />
                    <MiddleTitle
                        title={"Website "}
                        content={<a href={homepage} style={{ color: "#4DABF7" }}>Homepage </a>}
                    />
                </Stack>
            </SimpleGrid>

            <Space h="xl" />

            
            <Space h="xl" />
        </Container>
    )
}

export default index


interface X {
    networkProps: INetworkDetails
    notFound: boolean
}
export async function getServerSideProps(context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<X>> {
    const { id } = context.query
    try {
        const response = await fetch(`${tmdb.url}/network/${id}?api_key=${tmdb.key}`)
        const resData = await response.json()
        return {
            props: {
                networkProps: resData as INetworkDetails,
                notFound: false
            },
        }
    } catch (error) {
        return {
            props: {
                networkProps: {} as INetworkDetails,
                notFound: false
            },
        }
    }
}