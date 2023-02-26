import { createStyles } from '@mantine/core';
import Footer from './Footer';
import HeaderHome from './HeaderHome';
import { Navbar } from './navbar/Navbar';
import { useRouter } from "next/router"
import AffixApp from './AffixApp';

const useStyles = createStyles(() => ({
    container: {
        backgroundColor: "#373A40",
        position: "relative",
        minHeight: "100vh",
    },
}));

type LayoutProps = {
    children: React.ReactNode,
};

const Layout = ({ children }: LayoutProps,) => {
    const router = useRouter()

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
            <AffixApp/>
            <Footer />
        </div>
    )
}

export default Layout


