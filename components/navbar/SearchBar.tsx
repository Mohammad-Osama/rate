import React, { forwardRef, useRef, useState, useEffect } from 'react'
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
import { ISearchMulti } from '../../helpers/types';


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
        cursor: "pointer",
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
const SearchBar = () => {

    const { classes } = useStyles();
    const query = useRef<HTMLInputElement>(null);
    const emptyList: ISearchMulti[] = []

    const [list, setList]: [ISearchMulti[], (x: ISearchMulti[]) => void] = useState(emptyList)

    const multiSearch = async (q: string, type: string, page: number) => {
        if (q === " " || q === undefined || q === null) {
            setList([])
        }
        else {
            try {
                const response = await fetch(`/api/search?type=${type}&query=${q}}&page=${page}`)
                const data = await response.json()
                setList(data.results)
            } catch (error) {
                alert(error)
            }
        }
    }

    useEffect(() => {
       /*  if (query.current !== null) {
            if (query.current.value === ""
                || query.current.value === undefined
                || query.current.value === null)
                setList([])
            else
                multiSearch(query.current.value , "multi" ,1)
        }
        console.log(list)
        return () => {
            setList([])
        } */
    }, [])
    return (
        <Autocomplete style={{ minWidth: "40%" }}
            transition="pop-top-left"
            transitionDuration={80}
            transitionTimingFunction="ease"
            radius="lg"
            limit={10}
            className={classes.search}
            placeholder="Search"
            data={[]}
            ref={query}
            itemComponent={forwardRef(({ value, id, image, price, ...others }, query) => {
                return (
                    <div {...others} ref={query}>

                        <Group noWrap>
                            <Avatar src={image} />

                            <div>
                                <Text>{value}</Text>
                                <Text size="xs" color="dimmed">
                                    {price} $
                                </Text>
                            </div>
                        </Group>

                    </div>
                )
            })}
            onChange={() => {
               if (query.current !== null) {
                    multiSearch(query.current.value , "multi" ,1)
               }
            }}
        />
    )
}

export default SearchBar
