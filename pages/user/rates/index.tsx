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
import { GetServerSidePropsResult, GetServerSidePropsContext } from 'next';
import clientPromise from '../../../lib/db';
import { Rate, Rate as RateModel } from '../../../models/rateModel';
import { User as UserModel } from '../../../models/userModel';
import { IRate, IUser } from '../../../helpers/types';
import { authState } from '../../../redux/slices/authSlice';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Error from '../../../components/Error';
import NotFound from '../../../components/NotFound';
import axios from "axios"
import Loading from '../../../components/Loading';
import PlayGroundRates from '../../../components/PlayGroundRates';




const index = () => {
    const userData = useSelector(authState)
    const userId = userData.id


    const emptyUserRates: IRate[] = []
    const [userRates, setUserRates] = useState(emptyUserRates)

    const [ok, setOk] = useState(false)
    const [loading, setLoading] = useState(true)

    async function getUserRates() {
        const token = localStorage.getItem("token")?.replace(/^"(.*)"$/, '$1')
        const config = {
            headers: { Authorization: `Bearer ` + token }

        };
        axios.get(`/api/users/rates?id=${userId}`,
            config)
            .then((response) => {
                console.log("resssssssssssss", response)
                setLoading(false)
                setOk(true)
                setUserRates(response.data)

            })
            .catch(function (error) {
                console.log("errrrrrr", error)
                setOk(false)
                setLoading(false)
            })
    }

    useEffect(() => {
        getUserRates()
    }, [])


    if (loading)
        return (
            <Loading />
        )
    else if (ok)
        return (
           <PlayGroundRates
                    rates={userRates}
           />
        )
    else
        return (
            <NotFound />
        )
}

export default index
