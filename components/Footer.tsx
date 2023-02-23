import { createStyles, Text, Container, ActionIcon, Group } from '@mantine/core';
import { BrandTwitter, BrandYoutube, BrandLinkedin, BrandFacebook } from 'tabler-icons-react';
import HomeIcon from './navbar/HomeIcon';
import * as colors from "../helpers/colors"
import React, { useState } from 'react';
import FeedBack from './FeedBack';

const data = [
    {
        "title": "About",
        "links": [
            {
                "label": "Features",
                "link": "#"
            },
            {
                "label": "Pricing",
                "link": "#"
            },
            {
                "label": "Support",
                "link": "#"
            },
            {
                "label": "Forums",
                "link": "#"
            }
        ]
    },
    {
        "title": "Project",
        "links": [
            {
                "label": "Contribute",
                "link": "#"
            },
            {
                "label": "Media assets",
                "link": "#"
            },
            {
                "label": "Changelog",
                "link": "#"
            },
            {
                "label": "Releases",
                "link": "#"
            }
        ]
    },
    {
        "title": "Community",
        "links": [
            {
                "label": "Send Feedback",
                "link": "#"
            },
            {
                "label": "Follow on Twitter",
                "link": "#"
            },
            {
                "label": "Follow on Facebook",
                "link": "#"
            },
            {
                "label": "Join Discord",
                "link": "#"
            }
        ]
    }
]
const useStyles = createStyles((theme) => ({
    footer: {
        marginTop: 120,
        paddingTop: theme.spacing.xl * 2,
        paddingBottom: theme.spacing.xl * 2,
        backgroundColor: theme.colors.dark[6],
        borderTop: `1px solid ${theme.colors.dark[5]}`,
    },

    logo: {
        margin: "20px",
        [theme.fn.smallerThan('sm')]: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        },
    },

    description: {
        marginTop: 5,

        [theme.fn.smallerThan('sm')]: {
            marginTop: theme.spacing.xs,
            textAlign: 'center',
        },
    },

    inner: {
        display: 'flex',
        justifyContent: 'space-between',

        [theme.fn.smallerThan('sm')]: {
            flexDirection: 'column',
            alignItems: 'center',
        },
    },

    groups: {
        display: 'flex',
        flexWrap: 'wrap',
    },

    wrapper: {
        width: 160,
    },

    link: {
        display: 'block',
        color: theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[6],
        fontSize: theme.fontSizes.md,
        paddingTop: 3,
        paddingBottom: 3,

        '&:hover': {
            textDecoration: 'underline',
        },
    },
    linkFeedback: {
        background: `-webkit-linear-gradient(45deg, ${colors.sandTan} 30%,  lightblue 90%)`,
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent", 
        '&:hover': {
            //   backgroundImage: theme.fn.gradient({ from: `${colors.sandTan}`, to: `${colors.sandTan}` }),
            cursor:"pointer"
        },
    },

    title: {
        fontSize: theme.fontSizes.xl,
        fontWeight: 700,
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
        marginBottom: theme.spacing.xs / 2,
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    },

    afterFooter: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: theme.spacing.xl,
        paddingTop: theme.spacing.xl,
        paddingBottom: theme.spacing.xl,
        borderTop: `1px solid ${theme.colors.dark[4]}`,

        [theme.fn.smallerThan('sm')]: {
            flexDirection: 'column',
        },
    },

    social: {
        [theme.fn.smallerThan('sm')]: {
            marginTop: theme.spacing.xs,
        },

    },

    linkedIcon: {
        WebkitBoxShadow: `0 0 18px ${colors.sandTanShadow}`,
        '&:hover': {
            backgroundImage: theme.fn.gradient({ from: `${colors.sandTan}`, to: `${colors.sandTan}` }),
        },
    },
    icons: {
        '&:hover': {
            backgroundColor: theme.colors.dark[4],
        },
    },
}));



const Footer = () => {
    const { classes } = useStyles();

    const [opened, setOpened] = useState(false)

    const groups = data.map((group) => {
        const links = group.links.map((link, index) => (
            <Text<'a'>
                key={index}
                className={link.label === "Send Feedback"
                    ? classes.linkFeedback
                    : classes.link
                }
                /* component={link.label === "Send Feedback"
                ? undefined
                : "a"
            } */
            
                href={link.link}
                onClick={() =>
                    link.label === "Send Feedback"
                        ? setOpened(true)
                        : console.log("clicked")
                }
            >
                {link.label}
            </Text>
        ));


        return (
            <div className={classes.wrapper} key={group.title}>
                <Text className={classes.title}>{group.title}</Text>
                {links}
            </div>
        );
    });


    return (
        <div className={classes.footer}>
            <Container className={classes.inner}>
                <div className={classes.logo}>
                    <HomeIcon
                        width="200px"
                    />
                    <Text size="md" color="dimmed" className={classes.description}>
                        Rate Your Favourite Movie or Show !
                    </Text>
                    <Text size="md" color="dimmed" className={classes.description}>
                        All Media Data Provided by <a href="https://www.themoviedb.org/"
                            style={{
                                color: "lightblue"
                            }}
                        >TMDB</a> Api
                    </Text>
                </div>
                <div className={classes.groups}>{groups}</div>
            </Container>
            <Container className={classes.afterFooter}>
                <Text color="dimmed" size="sm">
                    © 2023 Rate All rights reserved.
                </Text>

                <Group spacing={0} className={classes.social} position="right" noWrap>
                    <ActionIcon size="lg" className={classes.icons} >
                        <BrandLinkedin size={40} strokeWidth={1.5} />
                    </ActionIcon>
                    <ActionIcon size="lg" className={classes.icons}>
                        <BrandTwitter size={40} strokeWidth={1.5} />
                    </ActionIcon>
                    <ActionIcon size="lg" className={classes.icons} >
                        <BrandYoutube size={40} strokeWidth={1.5} />
                    </ActionIcon>
                    <ActionIcon size="lg" className={classes.icons}>
                        <BrandFacebook size={40} strokeWidth={1.5} />
                    </ActionIcon>
                </Group>
            </Container>
            <FeedBack
                opened={opened}
                setOpened={setOpened}
            />

            {/* <D /> */}
          {/*   {D} */}

        </div>
    )
}

export default Footer
