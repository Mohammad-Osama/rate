import { SegmentedControl, Group, Container, SimpleGrid, Chip, useMantineTheme, createStyles, Button, Image } from '@mantine/core';
import { useState, useEffect } from 'react';
import { useMediaQuery } from '@mantine/hooks';


const useStyles = createStyles((theme, _params, getRef) => ({
   /*  label: {
        '&[data-checked]': {
            '&, &:hover': {
                backgroundColor: theme.colors.blue[theme.fn.primaryShade()],
                color: theme.white,
            },

            [`& .${getRef('iconWrapper')}`]: {
                color: theme.white,
            },
        },
    }, */

   /*  iconWrapper: {
        ref: getRef('iconWrapper'),
    }, */
    root: {
        backgroundColor: theme.colors.dark[6] ,
        boxShadow: theme.shadows.md,
        border: `1px solid ${
          theme.colors.dark[4] 
        }`,
      },
    
      active: {
        backgroundImage: theme.fn.gradient({ from: 'blue', to: 'orange' }),
      },
    
      control: {
        border: '0 !important',
      },
    
      labelActive: {
        color: `${theme.white} !important`,
      },
      label :{
          color:"white"
      }
}));
const useStyles2 = createStyles((theme, _params) => ({
     root: {
         backgroundColor: theme.colors.dark[6] ,
         boxShadow: theme.shadows.md,
         border: `1px solid ${
           theme.colors.dark[4] 
         }`,
       },
     
       active: {
         backgroundImage: theme.fn.gradient({ from: 'blue', to: 'red' }),
       },
     
       control: {
         border: '0 !important',
       },
     
       labelActive: {
         color: `${theme.white} !important`,
       },
       label :{
           color:"white"
       }
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
    const classes2  = useStyles2().classes

    const theme = useMantineTheme();

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
        { label: 'Top Rated', value: 'top_rated ' },
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
             //   bg="#F8F9FA"
              //  color="blue"
                value={mediaType === "movie"
                    ? moviesTypes
                    : tvTypes
                }
                onChange={mediaType === "movie"
                    ? (v) => setMoviestypes(v as string)
                    : (v) => setTvTypes(v as string)
                }
                data={mediaType === "movie"
                    ? moviesTypesDataSegment
                    : tvTypesDataSegment

                }
            />
            {/* {mediaType === "movie"
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
            } */}
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
               // bg="#F8F9FA"
              //  color="blue"
                value={mediaType
                    
                }
                onChange={(v) => setMediaType(v as string)}
                data={[
                    { value: 'movie', label: 'Movies' },
                    { value: 'tv', label: 'Tv' },
                  ]}
            />
            {/* <Chip.Group value={mediaType}
                onChange={(v) => setMediaType(v as string)}
                position="center" spacing="md" >
                <Chip size="lg" color="red" variant="filled" value="movie">
                    Movies
                </Chip>
                <Chip size="lg" color="red" variant="filled" value="tv">
                    Tv
                </Chip>
            </Chip.Group> */}

        </Group>
    )
}

export default HomeFilter
