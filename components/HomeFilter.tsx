import { SegmentedControl, Group, createStyles } from '@mantine/core';
import { Dispatch, SetStateAction } from 'react';
import { useMediaQuery } from '@mantine/hooks';
import * as colors from '../helpers/colors'


const useStyles = createStyles((theme, _params) => ({

    root: {
        backgroundColor: theme.colors.dark[6],
        boxShadow: theme.shadows.md,
        border: `1px solid ${theme.colors.dark[4]
            }`,
    },

    active: {
        backgroundImage: theme.fn.gradient({ from: `${colors.nightBlue}`, to: `${colors.sandTan}` }),
    },

    control: {
        border: '0 !important',
    },

    labelActive: {
        color: `${theme.white} !important`,
    },
    label: {
        color: "white"
    }
}));

const useStyles2 = createStyles((theme, _params) => ({
    
    root: {
        backgroundColor: theme.colors.dark[6],
        boxShadow: theme.shadows.md,
        border: `1px solid ${theme.colors.dark[4]
            }`,
    },

    active: {
        backgroundImage: theme.fn.gradient({ from: `${colors.nightBlue}`, to: `${colors.sandTan}` }),
    },

    control: {
        border: '0 !important',
    },

    labelActive: {
        color: `${theme.white} !important`,
    },
    label: {
        color: "white"
    }
}));

interface Props {
    mediaType: string;
    setMediaType: (x: string) => void;
    moviesTypes: string;
    setMoviestypes: (x: string) => void;
    tvTypes: string;
    setTvTypes: (x: string) => void;
    setPage: Dispatch<SetStateAction<number>>;
}


const HomeFilter = ({ mediaType,
    setMediaType,
    setMoviestypes,
    setTvTypes,
    moviesTypes,
    tvTypes,
    setPage
}: Props) => {


    const { classes } = useStyles();
    const classes2 = useStyles2().classes

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
    const moviesTypesDataSegment = [
        { label: 'Popular', value: 'popular' },
        { label: 'Top Rated', value: 'top_rated' },
        { label: 'Now Playing', value: 'now_playing' },
        { label: 'Upcoming', value: 'upcoming' },
    ];

    const tvTypesDataSegment = [
        { label: 'Popular', value: 'popular' },
        { label: 'Top Rated', value: 'top_rated' },
        { label: 'Airing Today', value: 'airing_today' },
        { label: 'On The Air', value: 'on_the_air' }

    ];
    const smallScreen = useMediaQuery('(max-width: 500px)');

    return (
        <Group
            position="apart"
            mb="xs"
        >
            <SegmentedControl
                classNames={classes}
                size={smallScreen
                    ? "md"
                    : "lg"
                }
                orientation={
                    smallScreen
                        ? "vertical"
                        : "horizontal"
                }

                value={mediaType === "movie"
                    ? moviesTypes
                    : tvTypes
                }
                onChange={mediaType === "movie"
                    ? (v) => {
                        setMoviestypes(v as string)
                        setPage(1)
                    }
                    : (v) => {
                        setTvTypes(v as string)
                        setPage(1)
                    }
                }
                data={mediaType === "movie"
                    ? moviesTypesDataSegment
                    : tvTypesDataSegment
                }
            />
            <SegmentedControl
                classNames={classes2}

                size={smallScreen
                    ? "md"
                    : "lg"
                }
                orientation={
                    smallScreen
                        ? "vertical"
                        : "horizontal"
                }
                value={mediaType}
                onChange={(v) => { //better than a ternary operator ?
                    setMediaType(v as string)
                    setPage(1)
                    setMoviestypes('popular')
                    setTvTypes('popular')
                }}
                data={[
                    { value: 'movie', label: 'Movies' },
                    { value: 'tv', label: 'Tv' },
                ]}
            />
        </Group>
    )
}

export default HomeFilter
