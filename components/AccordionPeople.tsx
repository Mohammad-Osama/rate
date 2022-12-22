import React from 'react'
import { Accordion, createStyles } from '@mantine/core';

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
const AccordionPeople = () => {
    const { classes } = useStyles();

    return (
        <Accordion variant="separated" styles={{
            control: {
                backgroundColor: "#2C2E33",
                
            }, 
            label: {
                 color: 'white',     
                },
            panel :{ 
                backgroundColor: "grey",
                
            } , chevron :{
                color: "white",
            }

        }}
            style={{ borderColor: "red" }}
            radius="xs"
        //  classNames={classes}
        //   className={classes.root}
        >
            <Accordion.Item value="customization">
                <Accordion.Control>Customization</Accordion.Control>
                <Accordion.Panel>Colors, fonts, shadows and many other parts are customizable to fit your design needs</Accordion.Panel>
            </Accordion.Item>

        </Accordion>
    )
}

export default AccordionPeople
