import { GetServerSidePropsResult, GetServerSidePropsContext } from 'next';
import * as tmdb from "../../../helpers/tmdb"
import { IProductionCompanyDetails } from '../../../helpers/types';
import { Space, Container, SimpleGrid, Card, Image, Text, Stack, HoverCard } from '@mantine/core';
import * as colors from '../../../helpers/colors'
import MiddleTitle from '../../../components/MiddleTitle';
import Link from 'next/link';
import HeadPage from '../../../components/HeadPage';
import NotFound from '../../../components/NotFound';




const index = ({ companyProps, notFound }: X) => {
    const { name, description, headquarters, logo_path, origin_country, parent_company } = companyProps

    if (notFound === true)
        return (
            <NotFound />
        )
    else
        return (
            <Container size="xl" my="md" pb="xl" >
                <HeadPage
                    title={name}
                    description={description !== ''
                        ? description
                        : name
                    }
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
                            title={"Parent Company "}
                            content={parent_company
                                ? <HoverCard position="top">
                                    <HoverCard.Target>
                                        <Link
                                            href={{
                                                pathname: "/company/[id]",
                                                query: {
                                                    id: parent_company.id,
                                                },
                                            }}
                                            as={`/company/${parent_company.id}`}
                                            style={{ color: "#4DABF7" }}
                                        >
                                            {parent_company.name}
                                        </Link>
                                    </HoverCard.Target>
                                    <HoverCard.Dropdown bg="gray">
                                        <Image
                                            src={parent_company.logo_path
                                                ? `${tmdb.imgUrl}${tmdb.imgOriginal}${parent_company.logo_path}`
                                                : '/images/no_media'
                                            }
                                            height={133}
                                            width={133}
                                            fit="contain"
                                        />
                                    </HoverCard.Dropdown>
                                </HoverCard>
                                : ""
                            }
                        />
                    </Stack>
                </SimpleGrid>

                <Space h="xl" />

                <Card radius="md"
                    p="md"
                    m="xl"
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
                            {description
                                ? description
                                : ""
                            }
                        </Text>
                    </Card.Section>
                </Card>
                <Space h="xl" />
            </Container>
        )
}
export default index


interface X {
    companyProps: IProductionCompanyDetails
    notFound: boolean
}
export async function getServerSideProps(context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<X>> {
    const { id } = context.query
    try {
        const response = await fetch(`${tmdb.url}/company/${id}?api_key=${tmdb.key}`)
        const resData = await response.json()
        return {
            props: {
                companyProps: resData as IProductionCompanyDetails,
                notFound: false
            },
        }
    } catch (error) {
        return {
            props: {
                companyProps: {} as IProductionCompanyDetails,
                notFound: false
            },
        }
    }
}