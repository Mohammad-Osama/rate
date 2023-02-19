import React, { useState } from 'react'
import {
    Image,
    createStyles,
} from '@mantine/core';
import * as tmdb from "../helpers/tmdb"
import Link from 'next/link'
import { authState } from '../redux/slices/authSlice';
import { useSelector } from 'react-redux';
import { IRate } from '../helpers/types';
import RadarChartUser from './RadarChartUser';


const useStyles = createStyles((theme) => ({
    container: {
        position: "relative",
    },

    image: {
        backfaceVisibility: "hidden",
        transition: ".5s ease",
        width: "100%",
        height: "auto",
    },

    div: {
        transition: ".5s ease",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%,-50%)",
        msTransform: "translate(-50%,-50%)",
        textAlign: "center",
    },
}));

interface X {
    rate: IRate
}

const RatingOneItem = ({ rate }: X) => {
    const { classes } = useStyles()

    const userData = useSelector(authState)
    const userId = userData.id

    const [imageOpacity, setImageOpacity] = useState(1)
    const [divOpacity, setDivOpacity] = useState(0)

    const showRate = (e: any) => {
        e.preventDefault();
        setImageOpacity(0.3)
        setDivOpacity(1)
    };
    const hideRate = (e: any) => {
        e.preventDefault();
        setImageOpacity(1)
        setDivOpacity(0)
    };

    return (
        <div
            className={classes.container}
            onMouseOver={(e) => showRate(e)}
            onMouseOut={(e) => hideRate(e)}
        >
            <Link
                href={{
                    pathname: "/media/${mediaType}/[id]",
                    query: {
                        id: rate.tmdb_id
                    },
                }}
                as={`/media/${rate.media_type}/${rate.tmdb_id}?type=${rate.media_type}&user=${userId}`}
            >
                <Image
                    className={classes.image}
                    src={rate.poster_path
                        ? `${tmdb.imgUrl}${tmdb.imgSizeW1280}${rate.poster_path}`
                        : "/images/no_media.jpg"
                    }
                    fit="contain"
                    style={{
                        opacity: `${imageOpacity}`
                    }}
                />

                <div
                    className={classes.div}
                    style={{
                        opacity: `${divOpacity}`
                    }}
                >
                    <RadarChartUser
                        rateInfo={rate}
                    />
                </div>
            </Link>
        </div>
    )
}

export default RatingOneItem
