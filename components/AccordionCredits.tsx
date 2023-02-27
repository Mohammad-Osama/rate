import React from 'react'
import { Accordion, SimpleGrid, Button, AccordionControlProps, Box, Text } from '@mantine/core';
import {  ICastOrCrew } from '../helpers/types';
import PersonThumb from './personThumb'
import Link from 'next/link'




interface X {
    type: string
    data: ICastOrCrew[] | undefined
    id: number
    title: string
    media_type: string
}
const AccordionCredits = ({ type, id, data, title, media_type }: X) => {
 

    function AccordionControl(props: AccordionControlProps) {
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
    }
    return (
        <Accordion
            defaultValue={media_type === "movie" || media_type === "tv"
                ? "Cast"
                : "Guest Stars"
            }
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
                    backgroundColor: "grey",

                }, chevron: {
                    color: "white",
                }

            }}
            style={{ borderColor: "red" }}
            radius="xs"
        >
            <Accordion.Item value={type}>
                <AccordionControl>{type}</AccordionControl>
                <Accordion.Panel>
                    <SimpleGrid cols={6} spacing="lg"
                        breakpoints={[
                            { maxWidth: 1024, cols: 6, spacing: 'md' },
                            { maxWidth: 768, cols: 3, spacing: 'sm' },
                            { maxWidth: 500, cols: 2, spacing: 'sm' },
                        ]}
                    >
                        {data?.slice(0, 12).map((d) => {
                            return <PersonThumb dataPerson={d} key={d.credit_id} />
                        })
                        }
                    </SimpleGrid>
                </Accordion.Panel>
            </Accordion.Item>
        </Accordion>
    )
}

export default AccordionCredits
