import React, { useState, useEffect } from 'react'
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
import { Rate, Rate as RateModel } from '../../../../models/rateModel';
import { User as UserModel } from '../../../../models/userModel';
import { IRate, IUser } from '../../../../helpers/types';
import { authState } from '../../../../redux/slices/authSlice';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Error from '../../../../components/Error';
import NotFound from '../../../../components/NotFound';
import axios from "axios"
import Loading from '../../../../components/Loading';


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



const index = () => {
    const theme = useMantineTheme();
    const userData = useSelector(authState)
    const userId = userData.id
    const router = useRouter()
    const [ok, setOk] = useState(false)
    const [loading, setLoading] = useState(true)

    const emptyUserInfo = {} as IUser
    const [userInfo, setUserInfo] = useState(emptyUserInfo)

    const emptyUserRates: IRate[] = []
    const [userRates, setUserRates] = useState(emptyUserRates)

    const [userRatesNumber, setUserRatesNumber] = useState<number>()

    async function getUserData() {
        const token = localStorage.getItem("token")?.replace(/^"(.*)"$/, '$1')
        const config = {
            headers: { Authorization: `Bearer ` + token }

        };
        console.log(token)
        axios.get(`/api/users/profile?id=${userId}`,
            config)
            .then((response) => {
                console.log("resssssssssssss", response)
                setLoading(false)
                setOk(true)
                setUserInfo(response.data.user)
                setUserRates(response.data.rates)
                setUserRatesNumber(response.data.number)

            })
            .catch(function (error) {
                console.log("errrrrrr", error)
                setOk(false)
                setLoading(false)
            })
    }
    useEffect(() => {
        getUserData()
        //  !userId && router.push("/")
        return () => {

        }
    }, [])

    if (loading)
        return (
            <Loading />
        )
    else if (ok)
        return (
            <Playground
                ratesProps={userRates}
                userProps={userInfo}
                userRatesNumber={userRatesNumber}
            />
        )
    else
        return (
            <NotFound />
        )
}

export default index

