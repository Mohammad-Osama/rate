import React, { forwardRef, useRef, useState } from 'react'
import {
    createStyles,
    Group,
    Text,
    Autocomplete, Avatar,
} from '@mantine/core';
import { ISearchMulti } from '../../helpers/types';
import * as tmdb from "./../../helpers/tmdb"
import * as colors from "./../../helpers/colors"
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { authState } from '../../redux/slices/authSlice';


const useStyles = createStyles((theme) => ({
    search: {
        border: 'none',  // ??
        width: "40%",
      [theme.fn.smallerThan('xs')]: {

        },
    },
    input: {
        backgroundColor: `${colors.dark4}`,
        border: `1px solid ${colors.dark4}`,
        color: "white",
        height: "40px",
        
        [theme.fn.smallerThan('xs')]: {
         //   width: "100px",
        },
    },
    itemsWrapper: {
        backgroundColor: `${colors.dark3}`,
        border: `1px solid ${colors.dark4}`,
    },
    item: {
        ':hover': {
            backgroundImage: theme.fn.gradient({ from: `${colors.nightBlue}`, to: `${colors.sandTan}` }),
            fontSize: "17px"
        },
    },


}));
const SearchBar = () => {

    const { classes } = useStyles();
    const query = useRef<HTMLInputElement>(null);
    const emptyList: ISearchMulti[] = []

    const [list, setList]: [ISearchMulti[], (x: ISearchMulti[]) => void] = useState(emptyList)

    function letterCounter(x: string) {
        return x.replace(/[^a-zA-Z]/g, '').length;
    }

    const multiSearch = async (q: string, type: string, page: number) => {
        if (q === " " || q === undefined || q === null || letterCounter(q) < 2) {
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

    type IResult = {
        value: string;
        id: number;
        image: string | null | undefined;
        type: string;
    }

    const SearchedData = () => {

        let results: IResult[] = []

        list?.forEach((x) => {
            results.push({
                value: (x.name
                    ? x.name as string
                    : x.title as string
                ),
                id: x.id,
                image: (x.poster_path
                    ? x.poster_path
                    : x.profile_path

                ),
                type: x.media_type
            })
        })
        return results
    }
    const router = useRouter()
    const userData = useSelector(authState)
    const userId = userData.id

    return (
        <Autocomplete
            // style={{ minWidth: "30%" }}
            transition="pop-top-left"
            transitionDuration={80}
            transitionTimingFunction="ease"
            radius="lg"
            limit={10}
            className={classes.search}
            classNames={classes}
            placeholder="Search"
            data={SearchedData()}
            ref={query}
            itemComponent={forwardRef(({ value, id, image, type, ...others }, query) => {
                return (
                    <div
                        {...others}
                        ref={query}
                        // to fix hover 
                        onMouseEnter={undefined}
                        onMouseLeave={undefined}
                    >
                        <Group
                            noWrap
                        >
                            <Avatar
                                size="lg"
                                src={image
                                    ? `${tmdb.imgUrl}${tmdb.imgSize}${image}`
                                    : '/images/no_media.jpg'
                                } />
                            <div>
                                <Text
                                    color="white"
                                    weight={500}
                                >
                                    {value}
                                </Text>
                                <Text
                                    color={`${colors.dark0}`}
                                >
                                    {type}
                                </Text>
                            </div>
                        </Group>
                    </div>
                )
            })}
            onChange={() => {
                if (query.current !== null) {
                    multiSearch(query.current.value, "multi", 1)
                }
            }}
            onItemSubmit={(item) => {
                const { type, id } = item
                if (type === 'person') {
                    router.push(`/person/${id}`)
                }
                else {
                    router.push(`/media/${type}/${id}?type=${type}&user=${userId}`)
                }
            }
            }
        />
    )
}

export default SearchBar
