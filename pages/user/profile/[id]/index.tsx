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
    Divider
} from '@mantine/core';
import Playground from '../../../../components/Playground';
import { GetServerSidePropsResult, GetServerSidePropsContext } from 'next';
import clientPromise from '../../../../lib/db';
import { Rate as RateModel } from '../../../../models/rateModel';
import { User as UserModel } from '../../../../models/userModel';
import { IRate, IUser } from '../../../../helpers/types';



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



const index = ({ ratesProps, userProps }: X) => {
    const theme = useMantineTheme();

    return (
        <Playground
            ratesProps={ratesProps}
            userProps={userProps}
        />
    )
}

export default index


interface X {
    ratesProps: IRate[];
    userProps: IUser,
    notFound: boolean
}
export async function getServerSideProps(context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<X>> {
    await clientPromise()
    const { id } = context.query
    try {
        const ratesData = await RateModel.find({ user: id })
            .limit(12)
            .sort({ updatedAt: -1 })

        const rates = JSON.parse(JSON.stringify(ratesData))

        const userData = await UserModel.findById(id)
            .select([
                //  '-createdAt',
                //  '-updatedAt',
                '-__v',
                "-password",
            ])
        const user = JSON.parse(JSON.stringify(userData))

        return {
            props: {
                ratesProps: rates as IRate[],
                userProps: user as IUser,
                notFound: false
            },
        }
    } catch (error) {
        return {
            props: {
                ratesProps: [] as IRate[],
                userProps: {} as IUser,
                notFound: true
            },
        }
    }
}

