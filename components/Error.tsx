import { createStyles,Title, Text, Button, Stack } from '@mantine/core';
import * as colors from '../helpers/colors'

const useStyles = createStyles((theme) => ({
    root: {
        paddingTop: 80,
        paddingBottom: 80,
    },
    title: {
        fontWeight: 900,
        fontSize: 34,
        marginBottom: theme.spacing.md,
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,

        [theme.fn.smallerThan('sm')]: {
            fontSize: 32,
        },
    },
    button: {
        backgroundColor: theme.colors.dark[6],
        boxShadow: theme.shadows.md,
        border: `1px solid ${theme.colors.dark[4]
            }`,
        ':hover': {
            backgroundImage: theme.fn.gradient({ from: `${colors.nightBlue}`, to: `${colors.sandTan}` }),
        },
    }

}));

const Error = () => {

    const { classes } = useStyles();

    return (
        <Stack
            className={classes.root}
        >
            <Title
                className={classes.title}
                align="center"
                color="white"
            >
                Page does not exist
            </Title>
            <Text
                size="lg"
                color="white"
                align="center"
            >
                The page you are trying to open does not exist.
                <br />
                Refresh the page or choose a different category .
            </Text>
            <div style={{ display: "flex", justifyContent: "center" }}>
                <Button
                    size="md"
                    className={classes.button}
                    onClick={() => window.location.reload()}
                >
                    Refresh The Page
                </Button>
            </div>
        </Stack>
    )
}

export default Error
