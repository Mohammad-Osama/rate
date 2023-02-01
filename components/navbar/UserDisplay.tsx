import { createStyles, Text } from '@mantine/core';
import Link from 'next/link';
import { authState, logout } from '../../redux/slices/authSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { AppDispatch } from '../../redux/store';
import UserMenu from './UserMenu';


const useStyles = createStyles((theme) => ({

    text: {
        display: 'block',
        cursor: "pointer",
        padding: '8px 12px',
        borderRadius: theme.radius.sm,
        textDecoration: 'none',
        color: "white",
        //  backgroundColor:"red",
        //   fontSize: theme.fontSizes.sm,
        fontWeight: 700,
        fontSize: 22,
        '&:hover': {
            backgroundColor: theme.colors.dark[6],
        },
    },
}));


const UserDisplay = () => {
    const { classes } = useStyles();

    const { id, first_name, last_name } = useSelector(authState)
    const dispatch = useDispatch<AppDispatch>()
    const router = useRouter()

    if (id)
        return (
            <UserMenu
                first_name={first_name}
                last_name={last_name}
            />
        )
    else
        return (
            <Link href="/login" passHref >
                <div className={classes.text} >
                    Login
                </div>
            </Link>
        )
}

export default UserDisplay
