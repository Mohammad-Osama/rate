import React from 'react'
import {
    createStyles,
    Header,
    ActionIcon,
    Group,
    Burger,
    Container,
    Text,
    Autocomplete, Avatar,
    Menu,
} from '@mantine/core';
import Link from 'next/link';


const useStyles = createStyles((theme) => ({
    text: {
        display: 'block',
        cursor: "pointer",
        padding: '8px 12px',
        borderRadius: theme.radius.sm,
        textDecoration: 'none',
        color: "white",
        //  backgroundColor:"red",
        //   fontSize: theme.fontSizes.sm,
        // fontFamily:"cursive",
        fontWeight: 700,
        fontSize: 22,
        '&:hover': {
            backgroundColor: theme.colors.dark[6],
        },
        [theme.fn.smallerThan('sm')]: {
           /*  fontWeight: 500,
            fontSize: 16, */
        },
    },
}));
const HomeIcon = () => {
    const { classes } = useStyles();



    return (
        <div >

            <Link style={{
                textDecoration: 'none',
                color: 'black',
            }}
                href="/" >
                <div className={classes.text}>
                    Rate
                </div>
            </Link>

        </div>
    )
}

export default HomeIcon
