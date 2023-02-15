import { createStyles, Text, Container, ActionIcon, Group } from '@mantine/core';
import { BrandTwitter, BrandYoutube, BrandInstagram, BrandLinkedin } from 'tabler-icons-react';
import HomeIcon from './navbar/HomeIcon';
import * as colors from "../helpers/colors"



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
                "label": "Join Discord",
                "link": "#"
            },
            {
                "label": "Follow on Twitter",
                "link": "#"
            },
            {
                "label": "Email newsletter",
                "link": "#"
            },
            {
                "label": "GitHub discussions",
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
        maxWidth: 200,

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

        [theme.fn.smallerThan('sm')]: {
            display: 'none',
        },
    },

    wrapper: {
        width: 160,
    },

    link: {
        display: 'block',
        color: theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[6],
        fontSize: theme.fontSizes.sm,
        paddingTop: 3,
        paddingBottom: 3,

        '&:hover': {
            textDecoration: 'underline',
        },
    },

    title: {
        fontSize: theme.fontSizes.lg,
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
        WebkitBoxShadow:`0 0 18px ${colors.sandTanShadow}` ,
        '&:hover': {
            backgroundImage: theme.fn.gradient({ from: `${colors.sandTan}`, to: `${colors.sandTan}` }),
        },
    },
}));

interface FooterLinksProps {
    data: {
        title: string;
        links: { label: string; link: string }[];
    }[];
}

const Footer = () => {
    const { classes } = useStyles();

    const groups = data.map((group) => {
        const links = group.links.map((link, index) => (
            <Text<'a'>
                key={index}
                className={classes.link}
                component="a"
                href={link.link}
                onClick={(event) => event.preventDefault()}
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
                    <HomeIcon />
                    <Text size="xs" color="dimmed" className={classes.description}>
                        Rate your favourite movie or show !
                    </Text>
                </div>
                <div className={classes.groups}>{groups}</div>
            </Container>
            <Container className={classes.afterFooter}>
                <Text color="dimmed" size="sm">
                    © 2023 Rate All rights reserved.
                </Text>

                <Group spacing={0} className={classes.social} position="right" noWrap>
                    <ActionIcon size="lg" className={classes.linkedIcon} >
                        <BrandLinkedin size={40} strokeWidth={1.5} />
                    </ActionIcon>
                    <ActionIcon size="lg">
                        <BrandTwitter size={40} strokeWidth={1.5} />
                    </ActionIcon>
                    <ActionIcon size="lg">
                        <BrandYoutube size={40} strokeWidth={1.5} />
                    </ActionIcon>
                    <ActionIcon size="lg" >
                        <BrandInstagram size={40} strokeWidth={1.5} />
                    </ActionIcon>
                </Group>
            </Container>
        </div>
    )
}

export default Footer
