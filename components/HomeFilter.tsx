import { Group, Container, SimpleGrid, Chip, useMantineTheme, createStyles, Button, Image } from '@mantine/core';

interface Props {
    mediaType: string;
    moviesTypes: string
    setMediaType: (x: string) => void
    setMoviestypes: (x: string) => void
    setTvTypes: (x: string) => void
}


const HomeFilter = ({ mediaType, setMediaType, setMoviestypes, setTvTypes, moviesTypes }: Props) => {

    const moviesTypesData = [
        { name: 'Popular', value: 'popular' },
        { name: 'Top Rated', value: 'top_rated' },
        { name: 'Now Playing', value: 'now_playing' },
        { name: 'Upcoming', value: 'upcoming' },
    ];

    const tvTypes = [
        { name: 'Popular', value: 'Popular' },
        { name: 'Top Rated', value: 'Top Rated' },
        { name: 'Airing Today', value: 'Airing Today' },
        { name: 'On The Air', value: 'On The Air' }

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
                : null

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
