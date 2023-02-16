import { useState, useEffect, useRef } from 'react';
import {
    createStyles,
    Header,
    ActionIcon,
    Group,
    Burger,
    Container,
    Text,
    Autocomplete, Avatar,
    Menu,
    UnstyledButton
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import Link from 'next/link';
import * as colors from "./../../helpers/colors"



const useStyles = createStyles((theme) => ({
    search: {
        border: 'none',
    },
    inner: {
        height: 56,
        display: 'flex',
        justifyContent: 'space-between',
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
        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
        fontSize: theme.fontSizes.sm,
        fontWeight: 500,

        '&:hover': {
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
        },
    },

    linkLabel: {
        marginRight: 5,

    },
    text: {
        display: 'block',

        padding: '8px 12px',
        borderRadius: theme.radius.sm,
        textDecoration: 'none',
        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
        //   fontSize: theme.fontSizes.sm,
        fontWeight: 700,

        '&:hover': {
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
        },
    },

    user: {
        color: "white",
        backgroundColor: `${theme.colors.dark[5]}`,
        //    padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
        //  borderRadius: theme.radius.sm,
        transition: 'background-color 100ms ease',

        '&:hover': {
            backgroundColor: `${theme.colors.dark[3]}`,
        },
        height: "80%",
        [theme.fn.largerThan('sm')]: {
            display: 'none',
        },
    },
    userActive: {
        color: "white",
        backgroundImage: theme.fn.gradient({ from: `${colors.nightBlue}`, to: `${colors.sandTan}` }),
    },
    item: {
        color: "white",
        '&:hover': {
            backgroundImage: ` ${theme.fn.gradient({ from: `${colors.nightBlue}`, to: `${colors.sandTan}` })} !important`,
            fontSize: "17px"
        },
    },
    dropdown: {
        backgroundColor: `${theme.colors.dark[5]}`,
    },
}));




const BurgerMenu = () => {
    const [opened, { toggle }] = useDisclosure(false);
    const [userMenuOpened, setUserMenuOpened] = useState(false);
    const { classes, theme, cx } = useStyles();

    return (
        <Menu
            classNames={classes}
            width={200}
            position="bottom-end"
            transition="pop-top-right"
            onClose={() => setUserMenuOpened(false)}
            onOpen={() => setUserMenuOpened(true)} 
        >
            <Menu.Target>
                <Burger
                    opened={opened}
                    onClick={toggle}
                    className={cx(classes.user, { [classes.userActive]: userMenuOpened })} size="sm"
                />
            </Menu.Target>

            <Menu.Dropdown>

                <Link style={{
                    textDecoration: 'none',
                    color: 'black',
                }}
                    href="/search" >
                    <Menu.Item >
                        Search
                    </Menu.Item>
                </Link>

                <Link style={{
                    textDecoration: 'none',
                    color: 'black',
                }}
                    href="/discover" >
                    <Menu.Item >
                        Discover
                        {/*  <MenuInNav classes={classes} /> */}
                    </Menu.Item>
                </Link>

            </Menu.Dropdown>
        </Menu>
    )
}

export default BurgerMenu
