import { useState } from 'react';
import {
    createStyles,
    Burger,
    Menu,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import Link from 'next/link';
import * as colors from "./../../helpers/colors"



const useStyles = createStyles((theme) => ({


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

                <Link
                    style={{
                        textDecoration: 'none',
                        color: 'black',
                    }}
                    href="/search" >
                    <Menu.Item >
                        Search
                    </Menu.Item>
                </Link>

                <Link
                    style={{
                        textDecoration: 'none',
                        color: 'black',
                    }}
                    href="/discover" >
                    <Menu.Item >
                        Discover
                    </Menu.Item>
                </Link>

            </Menu.Dropdown>
        </Menu>
    )
}

export default BurgerMenu
