import { useState } from 'react';
import {
    createStyles,
    UnstyledButton,
    Group,
    Text,
    Menu,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
    Logout, UserCircle,
    Settings,
} from 'tabler-icons-react';
import { logout } from '../../redux/slices/authSlice';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { AppDispatch } from '../../redux/store';
import * as colors from "./../../helpers/colors"
import Link from 'next/link';


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
        padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
        borderRadius: theme.radius.sm,
        transition: 'background-color 100ms ease',

        '&:hover': {
            backgroundColor: `${theme.colors.dark[6]}`,
        },
        height: "80%"
    },

    userActive: {
        color: "white",
        backgroundImage: theme.fn.gradient({ from: `${colors.nightBlue}`, to: `${colors.sandTan}` }),
    },
    dropdown: {
        backgroundColor: `${theme.colors.dark[5]}`,
    },
    item: {
        color: "white",
        '&:hover': {
            backgroundImage: ` ${theme.fn.gradient({ from: `${colors.nightBlue}`, to: `${colors.sandTan}` })} !important`,
            fontSize: "17px"
        },
    },
    userInfo: {
        [theme.fn.smallerThan('sm')]: {
            display: 'none',
        },
    },
}));

interface X {
    first_name: string;
    last_name: string;
    id: string;
}
const UserMenu = ({ first_name, last_name, id }: X) => {

    const { classes, theme, cx } = useStyles();
    const [opened, { toggle }] = useDisclosure(false);
    const [userMenuOpened, setUserMenuOpened] = useState(false);
    const dispatch = useDispatch<AppDispatch>()
    const router = useRouter()
    return (
        <Menu
            width={200}
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
                        <Text
                            className={classes.userInfo}
                            weight={500}
                            size="lg"
                          //  sx={{ lineHeight: 4 }}
                            mr={3}

                        >
                            {first_name}
                        </Text>
                    </Group>
                </UnstyledButton>
            </Menu.Target>
            <Menu.Dropdown
            >
                {/* <Link style={{
                    textDecoration: 'none',
                    color: 'black',
                }}
                    href={{
                        pathname: "/profile/[id]",
                        query: {
                            id: id
                        },
                    }}
                    as={`/user/profile/${id}`}
                > */}
                    <Menu.Item
                        icon={<Settings size={18} />}
                        onClick={()=>window.location.pathname === `/user/profile/${id}/`
                            ? window.location.reload()
                            :router.push(`/user/profile/${id}`)
                         }
                    >
                        My Profile
                    </Menu.Item>
               {/*  </Link> */}
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
