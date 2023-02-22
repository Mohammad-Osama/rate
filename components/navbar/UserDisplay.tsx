import { createStyles, Text } from '@mantine/core';
import Link from 'next/link';
import { authState } from '../../redux/slices/authSlice';
import { useSelector } from 'react-redux';
import UserMenu from './UserMenu';


const useStyles = createStyles((theme) => ({

    text: {
        display: 'block',
        cursor: "pointer",
        padding: '8px 12px',
        borderRadius: theme.radius.sm,
        textDecoration: 'none',
        color: "white",
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

    if (id)
        return (
            <UserMenu
                first_name={first_name}
                last_name={last_name}
                id={id}
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
