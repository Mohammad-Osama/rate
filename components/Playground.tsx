import React from 'react'
import { useState } from 'react';
import {
    AppShell,
    Navbar,
    Header,
    Footer,
    Aside,
    Text,
    MediaQuery,
    Burger,
    useMantineTheme,
    Center,
    Tooltip,
    UnstyledButton,
    Stack,
    createStyles,
    Container,
    SimpleGrid,
    Grid,
    Image,
    Badge,
    Button,
    Group,
    Space,
    Card,
    Divider,
    Avatar
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import SideTitle from './SideTitle';
import { IRate, IUser } from '../helpers/types';
import CarouselRates from './CarouselRates';
import Link from 'next/link';
import * as colors from '../helpers/colors'


const useStyles = createStyles((theme) => ({
    textLink: {
        fontFamily: 'Roboto,Helvetica,Arial,sans-serif',
        fontSize: "22px",
        display: "inline-block",
        marginTop: "30px",
        color: `${colors.sandTan}`,
        '&:hover': {
            textDecoration: "underline"
        },
    }
}));

interface X {
    ratesProps: IRate[];
    userProps: IUser;
    userRatesNumber: number | undefined;
}
const Playground = ({ ratesProps, userProps, userRatesNumber }: X) => {
    const { classes } = useStyles()
    const {
        createdAt
    } = userProps

    const theme = useMantineTheme();
    // console.log("propppssss user", userProps)
    console.log("propppssss rates", ratesProps)
    const smallScreen = useMediaQuery('(max-width: 768px)');

    const membershipDate = () => {
        const date = new Date(createdAt);
        const options = {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
        };
        return date.toLocaleString("en-US", options as any)

    }
    return (
        <Container>

            <Grid
                columns={12}
            //  gutter="lg"
            >
                <Grid.Col
                    sm={5}
                >
                    <Center>
                        <Avatar
                            size={150}
                            src={null}
                            variant="filled"
                        />
                    </Center>
                </Grid.Col>
                <Grid.Col
                    sm={7}
                >
                    <Text
                        align={
                            smallScreen
                                ? "center"
                                : "left"
                        }
                        weight={700}
                        color="white"
                        style={{ fontFamily: 'Greycliff CF, sans-serif', fontSize: "30px", minWidth: "60px" }}
                    >
                        {/*  {userProps.first_name} {userProps.last_name} */}
                        John Smith
                    </Text>
                    <Text
                        align={
                            smallScreen
                                ? "center"
                                : "left"
                        }
                        size="xl"
                        color="#ADB5BD"
                    >
                        Member since  {membershipDate()}
                    </Text>
                </Grid.Col>

            </Grid>
            <Space h="xl" />
            <SideTitle
                text="My Ratings"
            />
            <CarouselRates
                rates={ratesProps}
            />

            <Link
                href={{
                    pathname: "/search",
                    /* query: {
                        id: item.id
                    }, */
                }}
                as={`/search`}
            >
                <span
                    className={classes.textLink}
                >
                    See all {userRatesNumber} ratings
                </span>
            </Link>
        </Container >


    )
}

export default Playground
