import { Group, Container, SimpleGrid, Chip, useMantineTheme, createStyles, Button, Image } from '@mantine/core';

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
        <Group position="apart">
            {mediaType === "Movies"
                ? <Chip.Group
                    position="center" color="indigo" spacing="md"
                    value={moviesTypes}
                    onChange={(v) => setMoviestypes(v as string)}
                >
                    {moviesTypesData.map((x) => {
                        return <Chip size="lg" variant="filled" value={x.value}>
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
                        return <Chip size="lg" variant="filled" value={x.value}>
                            {x.name}
                        </Chip>
                    })

                    }


                </Chip.Group>

            }


            {/*  <Group>
                { mediaType==="Movies"
                  ?  moviesTypes.map((x) => {
                        return <Button variant="outline"
                        color="cyan"
                        radius="xs"
                        onClick={() => {
                            setMoviestypes(x.value)
                        }}
                    >
                        {x.name}
                    </Button>
                })

                : tvTypes.map((x) => {
                    return <Button variant="outline"
                    color="cyan"
                    radius="xs"
                    onClick={() => {
                        setTvTypes(x.name)
                    }}
                >
                    {x.name}
                </Button>
            })  

                

                }


            </Group> */}

            <Chip.Group value={mediaType}
                onChange={(v) => setMediaType(v as string)}
                position="center" color="indigo" spacing="md" >
                <Chip size="lg" variant="filled" value="Movies">
                    Movies
                </Chip>
                <Chip size="lg" variant="filled" value="Tv">
                    Tv
                </Chip>
            </Chip.Group>

        </Group>
    )
}

export default HomeFilter
