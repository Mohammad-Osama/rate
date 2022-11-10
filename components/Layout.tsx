import { Container, useMantineTheme, createStyles } from '@mantine/core';


const useStyles = createStyles((theme) => ({
    container: {
        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
        backgroundColor:"#373A40",
        //    paddingbottom:"60px",
        position: "relative",
        minHeight: "100vh",

    },
}));

type LayoutProps = {
    children: React.ReactNode,
};

const Layout = ({ children }: LayoutProps, ) => {


    const { classes } = useStyles()

        return (
            <div className={classes.container}>
              
                <main>{children}</main>
               
            </div>
        )
}

export default Layout


