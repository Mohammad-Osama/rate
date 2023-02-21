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
import RateUserThumb from './RateUserThumb';


interface X {
    rates: IRate[]
}


const PlayGroundRates = ({ rates }: X) => {

    return (
        <Container>
            <Divider
                labelPosition="center"
                label={  
                        <SideTitle
                            text="My Ratings"
                        />    
                }
            />
            <Stack
                justify="center"
            >
                {rates.map((rate) => {
                    return <RateUserThumb
                        key={rate._id}
                        rate={rate}
                    />
                })
                }
            </Stack>

        </Container>
    )
}

export default PlayGroundRates
