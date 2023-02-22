import { createStyles,Title, Text, Button, Stack } from '@mantine/core';
import * as colors from '../helpers/colors'
import Link from 'next/link';

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

const NotFound = () => {

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
                Page Not Found
            </Title>
            <Text
                size="lg"
                color="white"
                align="center"
            >
                The page you are trying to open does not exist.
            </Text>
            <div style={{ display: "flex", justifyContent: "center" }}>
                <Link
                href="/"
                >
                <Button
                    size="md"
                    className={classes.button}
                >
                    Home Page
                </Button>
                </Link>
            </div>
        </Stack>
    )
}

export default NotFound
