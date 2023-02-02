import React, { forwardRef } from 'react'
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
import { useDisclosure } from '@mantine/hooks';

import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect, useRef } from 'react';
import UserDisplay from './UserDisplay';
import { useSelector, useDispatch } from 'react-redux';
import { creditsState } from '../../redux/slices/creditsEpisodeSlice';
import { authState } from '../../redux/slices/authSlice';
import SearchBar from './SearchBar';
import BurgerMenu from './BurgerMenu';


const useStyles = createStyles((theme) => ({
    container: {
        // color: theme.colors.red[0],
        backgroundColor: theme.colors.dark[7],
        borderColor: theme.colors.dark[3],
    },
    search: {
        border: 'none',
    },
    inner: {
        height: 56,
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
    },

    links: {
        [theme.fn.smallerThan('sm')]: {
            display: 'none',
        },
    },

    burger: {
        [theme.fn.largerThan('sm')]: {
            display: 'none',
        },
    },

    link: {
        display: 'block',
        cursor: "pointer",
        lineHeight: 1,
        padding: '8px 12px',
        borderRadius: theme.radius.sm,
        textDecoration: 'none',
        color: theme.colors.dark[0],
        fontSize: theme.fontSizes.sm,
        fontWeight: 500,

        '&:hover': {
            backgroundColor: theme.colors.dark[6],
        },
    },

    linkLabel: {
        marginRight: 5,

    },
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
            display: 'none',
        },
    },
}));



export function Navbar() {
    const { classes } = useStyles();
    const { id } = useSelector(creditsState)
    //   const {id} = useSelector(authState)

    useEffect(() => {

    }, [id])
    return (
        <Header height={60} mb={12} className={classes.container} >
            <Container size="xl" className={classes.inner}>
                <div >

                    <Link style={{
                        textDecoration: 'none',
                        color: 'black',
                    }}
                        href="/" >
                        <div className={classes.text}>
                            Home
                        </div>
                    </Link>

                </div>
                <SearchBar />
                <Link style={{
                        textDecoration: 'none',
                        color: 'black',
                    }}
                        href="/search" >
                        <div className={classes.text}>
                            Search
                        </div>
                    </Link>
                    <Link style={{
                        textDecoration: 'none',
                        color: 'black',
                    }}
                        href="/disover" >
                        <div className={classes.text}>
                            Discover
                        </div>
                    </Link>
                <UserDisplay />
                <BurgerMenu />
            </Container>
        </Header>
    );
}

