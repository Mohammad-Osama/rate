import React from 'react'
import { Space, Divider, Image, Accordion, createStyles, SimpleGrid, Group, Button, ActionIcon, AccordionControlProps, Box, Text, Stack } from '@mantine/core';
import { ICast, ICastOrCrew, ICredits, ICrew, IPersonCreditsCastorCrew, IPersonCreditsCrew, IPersonCreditsModified } from '../helpers/types';
import PersonThumb from './personThumb'
import Link from 'next/link'
import { useSelector, useDispatch } from 'react-redux';
import { creditsState } from '../redux/slices/creditsEpisodeSlice';
import MediaCreditsThumb from './MediaCreditsThumb';
import * as tmdb from "./../helpers/tmdb"


const useStyles = createStyles((theme) => ({
    root: {
        backgroundColor: "red",
        borderRadius: theme.radius.sm,
    },

    item: {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
        border: '1px solid transparent',
        position: 'relative',
        zIndex: 0,
        transition: 'transform 150ms ease',

        '&[data-active]': {
            transform: 'scale(1.03)',
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
            boxShadow: theme.shadows.md,
            borderColor: theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2],
            borderRadius: theme.radius.md,
            zIndex: 1,
        },
    },

    chevron: {
        '&[data-rotate]': {
            transform: 'rotate(-90deg)',
        },
    },
}));


interface X {
    type: string
    data: IPersonCreditsCastorCrew[]
    // id: number
    // title: string
}
const AccordionCreditsPerson = ({ type, data }: X) => {
    const { classes } = useStyles();
    const modified = data.map(x => (
        {
            id: x.id,
            title:
                (x.title
                    ? x.title
                    : x.name)
            ,
            poster_path: x.poster_path,
            release_date:
                (x.release_date
                    ? x.release_date
                    : x.first_air_date
                        ? x.first_air_date
                        : "2030-01-01"
                ),
            media_type: x.media_type,
            vote_average: x.vote_average,
            credit_id: x.credit_id,
            role:
                (x.character
                    ? x.character
                    : x.job
                )
        } as IPersonCreditsModified
    ))
    //  console.log(modified)
    /* function AccordionControl(props: AccordionControlProps) {
        return (
            <Box sx={{ display: 'flex', alignItems: 'center', backgroundColor: "#2C2E33" }}>
                <Accordion.Control {...props} mih="100%" />
                <Link href={{
                    pathname: "/credits",
                    query: {
                        id: id,
                    },
                }}
                    as={`/credits?title=${title}&type=${type}`}
                    style={{ width: "50%" }}
                >
                    <Button bg="#373A40"
                        fz="md"
                        w="100%">
                        See all {type}
                    </Button>
                </Link>
            </Box>
        );
    } */
    return (
        <Accordion
            defaultValue={type}
            chevronPosition="left"
            variant="separated"
            styles={{
                control: {
                    backgroundColor: "#2C2E33",

                },
                label: {
                    color: 'white',
                    fontSize: "20px"
                },
                panel: {
                    backgroundColor: "#373A40",

                }, chevron: {
                    color: "white",
                }
            }}
            style={{ borderColor: "" }}
            radius="xs"
        //  classNames={classes}
        //   className={classes.root}
        >
            <Accordion.Item value={type}>
                <Accordion.Control>{type}</Accordion.Control>
                <Accordion.Panel>
                    <Stack
                    >
                        {modified.sort((a, b) =>
                            new Date(b.release_date as string).valueOf() - new Date(a.release_date as string).valueOf()
                        )
                            .map((d) => {
                                return <MediaCreditsThumb
                                    key={d.credit_id}
                                    dataMedia={d}
                                />
                            })
                        }
                    </Stack>
                </Accordion.Panel>
            </Accordion.Item>
        </Accordion>
    )
}

export default AccordionCreditsPerson
{/* <React.Fragment>
                            <SimpleGrid cols={2} spacing="lg" h={300}
                            breakpoints={[
                                { maxWidth: 1024, cols: 2, spacing: 'md' },
                                { maxWidth: 768, cols: 1, spacing: 'sm' },
                                { maxWidth: 500, cols: 1, spacing: 'sm' },
                            ]}
                        //   style={{backgroundColor:"#212529"}}
                        >
                            <Group position="apart">
                                <div>
                                    <Image
                                        src={d.poster_path
                                            ? `${tmdb.imgUrl}${tmdb.imgSize}${d.poster_path}`
                                            : "/images/no_media.jpg"
                                        }
                                        height={200}
                                        width={100}
                
                                        fit="contain"
                                        alt={d.name
                                            ?d.name
                                            : d.title
                                        }
                                    />
                                    <Text
                                        size="xl"
                                        color="#ADB5BD"
                                    >
                                        {d.character
                                            ? d.character
                                            : d.job
                                        }
                                    </Text>
                                </div>
                                <Text
                                    size="xl"
                                    color="#ADB5BD"
                                // mb='md'
                                >
                                   {d.release_date
                                   ?d.release_date
                                   :d.first_air_date
                                   }
                                </Text>
                
                            </Group>
                        </SimpleGrid>
                        <Space h='xl'/>
                        <Divider/>
                        </React.Fragment> */}