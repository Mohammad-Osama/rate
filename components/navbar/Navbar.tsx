import {
    createStyles,
    Header,
    Container,
} from '@mantine/core';
import Link from 'next/link';
import UserDisplay from './UserDisplay';
import SearchBar from './SearchBar';
import BurgerMenu from './BurgerMenu';
import HomeIcon from './HomeIcon';


const useStyles = createStyles((theme) => ({
    container: {
        // color: theme.colors.red[0],
        backgroundColor: theme.colors.dark[7],
        borderColor: theme.colors.dark[3],
    },
    search: {
        border: 'none',
    },
    inner: {
        height: 56,
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
    },

    links: {
        [theme.fn.smallerThan('sm')]: {
            display: 'none',
        },
    },

    burger: {
        [theme.fn.largerThan('sm')]: {
            display: 'none',
        },
    },

    link: {
        display: 'block',
        cursor: "pointer",
        lineHeight: 1,
        padding: '8px 12px',
        borderRadius: theme.radius.sm,
        textDecoration: 'none',
        color: theme.colors.dark[0],
        fontSize: theme.fontSizes.sm,
        fontWeight: 500,

        '&:hover': {
            backgroundColor: theme.colors.dark[6],
        },
    },

    linkLabel: {
        marginRight: 5,

    },
    text: {
        display: 'block',
        cursor: "pointer",
        padding: '8px 12px',
        borderRadius: theme.radius.sm,
        textDecoration: 'none',
        color: "white",
        fontWeight: 500,
        fontSize: 22,
        '&:hover': {
            backgroundColor: theme.colors.dark[6],
        },
        [theme.fn.smallerThan('sm')]: {
            display: 'none',
        },
    },
}));



export function Navbar() {
    const { classes } = useStyles();

    return (
        <Header height={60} mb={12} className={classes.container} >
            <Container size="xl" className={classes.inner}>
                <HomeIcon
                    width=""
                />
                <SearchBar />
                <Link style={{
                    textDecoration: 'none',
                    color: 'black',
                }}
                    href="/search" >
                    <div className={classes.text}>
                        Search
                    </div>
                </Link>
                <Link style={{
                    textDecoration: 'none',
                    color: 'black',
                }}
                    href="/discover" >
                    <div className={classes.text}>
                        Discover
                    </div>
                </Link>
                <UserDisplay />
                <BurgerMenu />
            </Container>
        </Header>
    );
}

