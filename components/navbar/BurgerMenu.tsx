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
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';



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
}));



const BurgerMenu = () => {
    const [opened, { toggle }] = useDisclosure(false);
    const [userMenuOpened, setUserMenuOpened] = useState(false);
    const { classes } = useStyles();
    return (
        <Menu
            width={200}
            position="bottom-end"
            transition="pop-top-right"

            onClose={() => setUserMenuOpened(false)}
            onOpen={() => setUserMenuOpened(true)}
        /* control={
          
        } */
        >
            <Menu.Target>
                <Burger
                    opened={opened}
                    onClick={toggle}
                    className={classes.burger}
                    size="sm"
                />

            </Menu.Target>
            <Menu.Dropdown>

            <Menu.Item >
               Search
            </Menu.Item>
                <Menu.Item

                >
                  Discover
                   {/*  <MenuInNav classes={classes} /> */}
                </Menu.Item>
               
            </Menu.Dropdown>

        </Menu>
    )
}

export default BurgerMenu
