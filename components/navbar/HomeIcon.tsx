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
import * as colors from '../../helpers/colors'
import { useRouter } from 'next/router';

const useStyles = createStyles((theme) => ({
    text: {
        display: 'block',
        cursor: 'pointer',
        padding: '8px 12px',
        borderRadius: theme.radius.sm,
        textDecoration: 'none',
        color: "black",
        backgroundImage: theme.fn.gradient({ from: `${colors.sandTan}`, to: `${colors.nightBlue}` }),
        //  backgroundColor:`${colors.nightBlue}`,
        WebkitBorderRadius: "10px 10px",
        //    border:"2px solid black" ,
        //  WebkitTextStroke:"1px black" ,
        //   fontSize: theme.fontSizes.sm,
        // fontFamily:"cursive",
        fontWeight: 700,
        fontSize: 22,
        '&:hover': {
            backgroundColor: theme.colors.cyan[6],
        },
        [theme.fn.smallerThan('sm')]: {
            /*  fontWeight: 500,
             fontSize: 16, */
        },
    },
}));
const HomeIcon = () => {
    console.log(window.location.pathname === "/")
    const { classes } = useStyles();

    const router = useRouter()

    return (
        <div >

            {/*  <Link style={{
                textDecoration: 'none',
                color: 'black',
            }}
                href="/" > */}
            <div className={classes.text}
                onClick={() => window.location.pathname === "/"
                    ? window.location.reload()
                    : router.push('/')

                }

            >
                RATE
            </div>
            {/*  </Link> */}

        </div>
    )
}

export default HomeIcon
