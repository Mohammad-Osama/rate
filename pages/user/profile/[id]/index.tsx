import { useState, useEffect } from 'react'
import {
    Text,
    Center,
    createStyles,
    Container,
    Grid,
    Space,
    Avatar
} from '@mantine/core';
import { IRate, IUser } from '../../../../helpers/types';
import { authState } from '../../../../redux/slices/authSlice';
import { useSelector } from 'react-redux';
import NotFound from '../../../../components/NotFound';
import axios from "axios"
import Loading from '../../../../components/Loading';
import SideTitle from '../../../../components/SideTitle';
import CarouselRates from '../../../../components/CarouselRates';
import Link from 'next/link';
import * as colors from '../../../../helpers/colors'
import { useMediaQuery } from '@mantine/hooks';


const useStyles = createStyles((theme) => ({
    active: {
        '&, &:hover': {
            backgroundColor: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).background,
            color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
        },
    },
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


const index = () => {
    const { classes } = useStyles()

    const userData = useSelector(authState)
    const userId = userData.id

    const [ok, setOk] = useState(false)
    const [loading, setLoading] = useState(true)

    const emptyUserInfo = {} as IUser
    const [userInfo, setUserInfo] = useState(emptyUserInfo)

    const emptyUserRates: IRate[] = []
    const [userRates, setUserRates] = useState(emptyUserRates)

    const [userRatesNumber, setUserRatesNumber] = useState<number>()

    const {
        createdAt
    } = userInfo


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
    async function getUserData() {
        const token = localStorage.getItem("token")?.replace(/^"(.*)"$/, '$1')
        const config = {
            headers: { Authorization: `Bearer ` + token }

        };
        axios.get(`/api/users/profile?id=${userId}`,
            config)
            .then((response) => {
                setLoading(false)
                setOk(true)
                setUserInfo(response.data.user)
                setUserRates(response.data.rates)
                setUserRatesNumber(response.data.number)

            })
            .catch(function (error) {
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
            <Container>
                <Grid
                    columns={12}
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
                             {userInfo.first_name} {userInfo.last_name} 
                            
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
                    rates={userRates}
                />

                <Link
                    href={{
                        pathname: "/user/rates",
                        /* query: {
                            id: item.id
                        }, */
                    }}
                    as={`/user/rates`}
                >
                    <span
                        className={classes.textLink}
                    >
                        See all {userRatesNumber} ratings
                    </span>
                </Link>
            </Container >
        )
    else
        return (
            <NotFound />
        )
}

export default index

