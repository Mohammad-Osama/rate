import React from 'react'
import { Accordion, createStyles, SimpleGrid } from '@mantine/core';
import { ICast, ICastOrCrew, ICrew } from '../helpers/types';
import PersonThumb from './personThumb'

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
    data: ICastOrCrew[]
}
const AccordionPeople = ({ type, data }: X) => {
    const { classes } = useStyles();

    return (
        <Accordion variant="separated" styles={{
            control: {
                backgroundColor: "#2C2E33",

            },
            label: {
                color: 'white',
                fontSize:"20px"
            },
            panel: {
                backgroundColor: "grey",

            }, chevron: {
                color: "white",
            }

        }}
            style={{ borderColor: "red" }}
            radius="xs"
        //  classNames={classes}
        //   className={classes.root}
        >
            <Accordion.Item value="Actors">
                <Accordion.Control>{type}</Accordion.Control>
                <Accordion.Panel>
                    <SimpleGrid cols={6} spacing="lg"
                        breakpoints={[
                            { maxWidth: 1024, cols: 6, spacing: 'md' },
                            { maxWidth: 768, cols: 6, spacing: 'sm' },
                            { maxWidth: 500, cols: 3, spacing: 'sm' },
                        ]}
                    //   style={{backgroundColor:"#212529"}}
                    >
                        {data.slice(0, 12).map((d) => {
                            return <PersonThumb dataPerson={d} key={d.id} />
                        })
                        }
                    </SimpleGrid>
                </Accordion.Panel>
            </Accordion.Item>

        </Accordion>
    )
}

export default AccordionPeople
