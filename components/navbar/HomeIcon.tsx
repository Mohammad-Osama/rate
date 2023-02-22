import React from 'react'
import { createStyles } from '@mantine/core';
import * as colors from '../../helpers/colors'
import { useRouter } from 'next/router';

const useStyles = createStyles((theme) => ({
    text: {
        display: 'block',
        cursor: 'pointer',
        padding: '8px 12px',
        borderRadius: theme.radius.sm,
        textDecoration: 'none',
        color: "black",
        backgroundImage: theme.fn.gradient({ from: `${colors.sandTan}`, to: `${colors.nightBlue}` }),
        WebkitBorderRadius: "10px 10px",
        fontWeight: 700,
        fontSize: 22,
        [theme.fn.smallerThan('sm')]: {
        },
    },
}));
interface X {
    width: string;
}
const HomeIcon = ({ width }: X) => {

    const { classes } = useStyles();
    const router = useRouter()

    return (
        <div
            style={{
                width: `${width}`
            }}
        >
            <div
                className={classes.text}
                onClick={() => window.location.pathname === "/"
                    ? window.location.reload()
                    : router.push('/')
                }
            >
                RATE
            </div>
        </div>
    )
}

export default HomeIcon
