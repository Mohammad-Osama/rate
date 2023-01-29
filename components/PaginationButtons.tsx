import { Button, createStyles, Group, Text } from '@mantine/core';
import { Dispatch, SetStateAction } from 'react';
import { PlayerTrackPrev, PlayerTrackNext } from 'tabler-icons-react';

interface X {
    page: number;
    setPage: Dispatch<SetStateAction<number>>;
}

const useStyles = createStyles((theme, _params) => ({
    root: {
        backgroundColor: theme.colors.dark[6],
        boxShadow: theme.shadows.md,
        border: `1px solid ${theme.colors.dark[4]
            }`,
        ':hover': {
            backgroundImage: theme.fn.gradient({ from: 'teal', to: 'cyan' }),
        },
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

const PaginationButtons = ({ page, setPage }: X) => {
    const { classes } = useStyles();

    return (
        <Group
            spacing={0}
        >
            <Button
                classNames={classes}
                display={page === 1
                    ? "none"
                    : undefined
                }
                onClick={() => { setPage(page - 1) }}
                leftIcon={<PlayerTrackPrev size={12} />}
            >
                Previous
            </Button>
            <div style={{
                backgroundColor: "#25262B",
                height: "36px",
                display: "flex",
                alignItems: "center",
                border: "1px solid #373A40",
            }}>
                <Text
                    color="white"
                    ta="center"
                    p="xs"
                >
                    Page {page}
                </Text>
            </div>
            <Button
                classNames={classes}
                display={page === 500
                    ? "none"
                    : undefined
                }
                onClick={() => { setPage(page + 1) }}
                rightIcon={<PlayerTrackNext size={12} />}
            >
                Next
            </Button>
        </Group>
    )
}

export default PaginationButtons
