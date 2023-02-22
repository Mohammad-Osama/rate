import { useState, useEffect } from 'react'
import {
    Stack,
    Container,
    Divider
} from '@mantine/core';
import { IRate } from '../../../helpers/types';
import { authState } from '../../../redux/slices/authSlice';
import { useSelector } from 'react-redux';
import NotFound from '../../../components/NotFound';
import axios from "axios"
import Loading from '../../../components/Loading';
import RateUserThumb from '../../../components/RateUserThumb';
import SideTitle from '../../../components/SideTitle';


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
                setLoading(false)
                setOk(true)
                setUserRates(response.data)
            })
            .catch(function (error) {
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
                    {userRates.map((rate) => {
                        return <RateUserThumb
                            key={rate._id}
                            rate={rate}
                        />
                    })
                    }
                </Stack>

            </Container>
        )
    else
        return (
            <NotFound />
        )
}

export default index
