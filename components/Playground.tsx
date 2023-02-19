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



const useStyles = createStyles((theme) => ({
    link: {
        width: 50,
        height: 50,
        borderRadius: theme.radius.md,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],

        '&:hover': {
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[0],
        },
    },

    active: {
        '&, &:hover': {
            backgroundColor: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).background,
            color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
        },
    },
}));

interface X {
    ratesProps: IRate[];
    userProps: IUser
}
const Playground = ({ ratesProps, userProps }: X) => {

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
                        {/* <Image
                            width={220}
                            height={220}
                            fit="cover"
                            src="/images/no_person.jpg"
                        /> */}
                        <Avatar
                            size={150}
                            src={null}   
                            variant="filled"
                           // color="grey"
                        />

                      
                    </Center>
                </Grid.Col>
                <Grid.Col
                    sm={7}
                >
                    <Text
                        //   size="lg"
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
        </Container>
    )
}

export default Playground
