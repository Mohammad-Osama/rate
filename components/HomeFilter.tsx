import { Group, Container, SimpleGrid, Chip, useMantineTheme, createStyles, Button, Image } from '@mantine/core';
import { useState, useEffect } from 'react';


const useStyles = createStyles((theme, _params, getRef) => ({
    label: {
        '&[data-checked]': {
            '&, &:hover': {
                backgroundColor: theme.colors.blue[theme.fn.primaryShade()],
                color: theme.white,
            },

            [`& .${getRef('iconWrapper')}`]: {
                color: theme.white,
            },
        },
    },

    iconWrapper: {
        ref: getRef('iconWrapper'),
    },
}));


interface Props {
    mediaType: string;
    setMediaType: (x: string) => void;
    moviesTypes: string;
    setMoviestypes: (x: string) => void;
    tvTypes: string;
    setTvTypes: (x: string) => void;
}


const HomeFilter = ({ mediaType,
    setMediaType,
    setMoviestypes,
    setTvTypes,
    moviesTypes,
    tvTypes }: Props) => {


    const { classes } = useStyles();
    const moviesTypesData = [
        { name: 'Popular', value: 'popular' },
        { name: 'Top Rated', value: 'top_rated' },
        { name: 'Now Playing', value: 'now_playing' },
        { name: 'Upcoming', value: 'upcoming' },
    ];

    const tvTypesData = [
        { name: 'Popular', value: 'popular' },
        { name: 'Top Rated', value: 'top_rated ' },
        { name: 'Airing Today', value: 'airing_today' },
        { name: 'On The Air', value: 'on_the_air' }

    ];


    return (
        <Group position="apart" m="lg">
            {mediaType === "movie"
                ? <Chip.Group
                    position="center" spacing="md"
                    value={moviesTypes}
                    onChange={(v) => setMoviestypes(v as string)}
                >
                    {moviesTypesData.map((x) => {
                        return <Chip size="lg" classNames={classes}
                            // variant="filled"
                            //   color="yellow"
                            //  radius="md"
                            value={x.value}
                            key={x.value}
                        >
                            {x.name}
                        </Chip>
                    })

                    }


                </Chip.Group>

                : <Chip.Group
                    position="center" color="indigo" spacing="md"
                    value={tvTypes}
                    onChange={(v) => setTvTypes(v as string)}
                >
                    {tvTypesData.map((x) => {
                        return <Chip size="lg" 
                                    classNames={classes}
                                     value={x.value}
                                     key={x.value}
                                 >
                                        {x.name}
                                  </Chip>
                    })
                    }
                </Chip.Group>
            }

            <Chip.Group value={mediaType}
                onChange={(v) => setMediaType(v as string)}
                position="center"  spacing="md" >
                <Chip size="lg"color="red" variant="filled" value="movie">
                    Movies
                </Chip>
                <Chip size="lg" color="red"variant="filled" value="tv">
                    Tv
                </Chip>
            </Chip.Group>

        </Group>
    )
}

export default HomeFilter
