import { createStyles, Title, Stack } from '@mantine/core';
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
        // backgroundImage: theme.fn.gradient({ from: `${colors.sandTan}`, to: `${colors.nightBlue}` }),
        [theme.fn.smallerThan('sm')]: {
            fontSize: 32,
        },
    },

}));

const ComingSoon = () => {
    const { classes } = useStyles();
    return (
        <Stack
            className={classes.root}
        >
            <Title
                className={classes.title}
                align="center"
                color={`${colors.sandTan}`}
            >
                Coming Soon !
            </Title>
        </Stack>
    )
}

export default ComingSoon
