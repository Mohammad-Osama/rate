import { createStyles } from '@mantine/core';
import Footer from './Footer';
import HeaderHome from './HeaderHome';
import { Navbar } from './navbar/Navbar';
import { useRouter } from "next/router"
import { authState, login, register, reset } from '../redux/slices/authSlice';
import { useDispatch, useSelector } from 'react-redux';


const useStyles = createStyles(() => ({
    container: {
        // color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
        backgroundColor: "#373A40",
        //    paddingbottom:"60px",
        position: "relative",
        minHeight: "100vh",

    },
}));

type LayoutProps = {
    children: React.ReactNode,
};

const Layout = ({ children }: LayoutProps,) => {
    const router = useRouter()
    const userState = useSelector(authState)

    const { classes } = useStyles()

    const beginNow=()=>{
        router.push("/#home-container")
    }

    return (
        <div className={classes.container}>
            <Navbar />
            {router.route === '/' &&
                <HeaderHome
                    mediaType="movie"
                    time_window="day"
                    beginNow={beginNow}
                />

            }
            <main>{children}</main>
            <Footer />
        </div>
    )
}

export default Layout


