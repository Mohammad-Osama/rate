import { useState } from 'react';
import {
    createStyles,
    Container,
    Avatar,
    UnstyledButton,
    Group,
    Text,
    Menu,
    Tabs,
    Burger,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
    Logout, UserCircle,
    Settings,
    ChevronDown,
} from 'tabler-icons-react';
import { authState, logout } from '../../redux/slices/authSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { AppDispatch } from '../../redux/store';

const useStyles = createStyles((theme) => ({
    header: {
        paddingTop: theme.spacing.sm,
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
        borderBottom: `1px solid ${theme.colorScheme === 'dark' ? 'transparent' : theme.colors.gray[2]
            }`,
        marginBottom: 120,
    },

    mainSection: {
        paddingBottom: theme.spacing.sm,
    },

    user: {
        color: "white",
        backgroundColor: `${theme.colors.dark[5]}`,
        padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
        borderRadius: theme.radius.sm,
        transition: 'background-color 100ms ease',

        '&:hover': {
            backgroundColor: `${theme.colors.dark[3]}`,
        },

       /*  [theme.fn.smallerThan('xs')]: {
            display: 'none',
        }, */
    },

    /* burger: {
        [theme.fn.largerThan('xs')]: {
            display: 'none',
        },
    }, */

    userActive: {
        color: "white",
        backgroundColor: theme.colors.cyan[9],
    },
    dropdown: {
        backgroundColor: `${theme.colors.dark[5] }`,
    },
    item: {
        color: "white",
        '&:hover': {
            backgroundImage:` ${theme.fn.gradient({ from: `${theme.colors.cyan[9]}`, to: `${theme.colors.teal[9]}` }) } !important`,
            fontSize: "17px"
        },
    }

    /* tabs: {
        [theme.fn.smallerThan('sm')]: {
            display: 'none',
        },
    },

    tabsList: {
        borderBottom: '0 !important',
    },

    tab: {
        fontWeight: 500,
        height: 38,
        backgroundColor: 'transparent',

        '&:hover': {
            backgroundColor: theme.colors.grape[4],
        },

        '&[data-active]': {
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
            borderColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[2],
        },
    }, */
}));

interface X {
    first_name: string;
    last_name: string;
}
const UserMenu = ({ first_name, last_name }: X) => {

    const { classes, theme, cx } = useStyles();
    const [opened, { toggle }] = useDisclosure(false);
    const [userMenuOpened, setUserMenuOpened] = useState(false);
    const dispatch = useDispatch<AppDispatch>()
    const router = useRouter()
    return (
        <Menu
            width={260}
            position="bottom-end"
            transition="pop-top-right"
            onClose={() => setUserMenuOpened(false)}
            onOpen={() => setUserMenuOpened(true)}
            classNames={classes}

        >
            <Menu.Target>
                <UnstyledButton
                    className={cx(classes.user, { [classes.userActive]: userMenuOpened })}
                >
                    <Group spacing={7}>
                        <UserCircle size={24} />
                        <Text weight={500} size="sm" sx={{ lineHeight: 1 }} mr={3}>
                            {first_name} {last_name}
                        </Text>
                        <ChevronDown size={12} />
                    </Group>
                </UnstyledButton>
            </Menu.Target>
            <Menu.Dropdown
            >
                <Menu.Item
                    icon={<Settings size={18} />}

                /* component={NextLink} href={'/dashboard'} */
                >                
                        Account
                </Menu.Item>
                <Menu.Item
                    icon={<Logout size={18} />}
                    onClick={() => {
                        dispatch(logout())
                        router.push("/")
                    }}
                >
                    Logout
                </Menu.Item>
            </Menu.Dropdown>
        </Menu>
    )
}

export default UserMenu
