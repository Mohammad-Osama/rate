import { Button, createStyles, Group, Text } from '@mantine/core';
import { Dispatch, SetStateAction } from 'react';
import { PlayerTrackPrev, PlayerTrackNext } from 'tabler-icons-react';
import { useMantineTheme } from '@mantine/core';

interface X {
    page: number;
    setPage: Dispatch<SetStateAction<number>>;
}
const useStyles = createStyles((theme, _params, getRef) => ({
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

const useStylesText = createStyles((theme, _params, getRef) => ({
    root: {
        backgroundColor: theme.colors.red[6],
        boxShadow: theme.shadows.md,
        border: `1px solid ${theme.colors.dark[4]
            }`,
        ':hover': {
            backgroundColor: theme.fn.gradient({ from: 'teal', to: 'cyan' }),
        }
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
    const classesText = useStylesText().classes
 //   const theme=useMantineTheme()
  //  const shadowmd=theme.shadows.md
    
    return (
        <Group
            spacing={0}
        // w="400px"
        // bg="#25262B"
        >
            <Button
                classNames={classes}
                // variant="outline"
                //  color="white"
                // bg="#25262B"
                // backgroundColor: theme.colors.dark[6]
                // disabled={page === 1}
                display={page === 1
                    ? "none"
                    : undefined
                }
                onClick={() => { setPage(page - 1) }}
                sx={{
                    '&[data-disabled]': {
                        pointerEvents: page === 1
                            ? 'stroke'
                            : 'none'
                    }

                }}
                leftIcon={<PlayerTrackPrev size={12} />}
            >
                Previous
            </Button>
            <div style={{
                 backgroundColor: "#25262B", 
                 height: "36px" ,
                 display:"flex",
                 alignItems:"center",
                 border:"1px solid #373A40",
                // boxShadow:`${shadowmd}`
                 }}>
                <Text
                    // classNames={classesText}

                   // variant="gradient"
                  //  gradient={{ from: 'indigo', to: 'red', deg: 45 }}
                    sx={{
                    //    fontFamily: 'Greycliff CF, sans-serif',
                      //  backgroundColor: "red"
                    }}

                    color="white"
                    // w="100%"
                    ta="center"
                  //   fz="xl"
                  //  fw={500}
                   // m={4}
                    p="xs"

                // variant="subtle"
                >
                    Page {page}
                </Text>
            </div>
            <Button
                classNames={classes}
                // variant="default"
                //  disabled={page === 500}
                display={page === 500
                    ? "none"
                    : undefined
                }
                onClick={() => { setPage(page + 1) }}
                /* sx={{
                    '&[data-disabled]': {
                        pointerEvents: page === 500
                            ? 'visible'
                            : 'none'
                    },
                }} */
                rightIcon={<PlayerTrackNext size={12} />}
            >
                Next
            </Button>
        </Group>
    )
}

export default PaginationButtons
