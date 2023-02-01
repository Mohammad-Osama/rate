import { Accordion, createStyles, Stack } from '@mantine/core';
import { IPersonCreditsCastorCrew, IPersonCreditsModified } from '../helpers/types';
import MediaCreditsThumb from './MediaCreditsThumb';


const useStyles = createStyles((theme) => ({
    root: {
        backgroundColor: "red",
        borderRadius: theme.radius.sm,
    },

    item: {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
        border: '1px solid transparent',
        position: 'relative',
        zIndex: 0,
        transition: 'transform 150ms ease',

        '&[data-active]': {
            transform: 'scale(1.03)',
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
            boxShadow: theme.shadows.md,
            borderColor: theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2],
            borderRadius: theme.radius.md,
            zIndex: 1,
        },
    },

    chevron: {
        '&[data-rotate]': {
            transform: 'rotate(-90deg)',
        },
    },
}));


interface X {
    type: string
    data: IPersonCreditsCastorCrew[]
}
const AccordionCreditsPerson = ({ type, data }: X) => {
    const { classes } = useStyles();
    const modified = data.map(x => (
        {
            id: x.id,
            title:
                (x.title
                    ? x.title
                    : x.name)
            ,
            poster_path: x.poster_path,
            release_date:
                (x.release_date
                    ? x.release_date
                    : x.first_air_date
                        ? x.first_air_date
                        : "2050-01-01"
                ),
            media_type: x.media_type,
            vote_average: x.vote_average,
            credit_id: x.credit_id,
            role:
                (x.character
                    ? x.character
                    : x.job
                )
        } as IPersonCreditsModified
    ))

    return (
        <Accordion
            defaultValue="Cast"
            chevronPosition="left"
            variant="separated"
            styles={{
                control: {
                    backgroundColor: "#2C2E33",

                },
                label: {
                    color: 'white',
                    fontSize: "20px"
                },
                panel: {
                    backgroundColor: "#373A40",

                }, chevron: {
                    color: "white",
                }
            }}
            style={{ borderColor: "" }}
            radius="xs"
        //  classNames={classes}
        //   className={classes.root}
        >
            <Accordion.Item value={type}>
                <Accordion.Control>{type}</Accordion.Control>
                <Accordion.Panel>
                    <Stack
                    >
                        {modified.sort((a, b) =>
                            new Date(b.release_date as string).valueOf() - new Date(a.release_date as string).valueOf()
                        )
                            .map((d) => {
                                return <MediaCreditsThumb
                                    key={d.credit_id}
                                    dataMedia={d}
                                />
                            })
                        }
                    </Stack>
                </Accordion.Panel>
            </Accordion.Item>
        </Accordion>
    )
}

export default AccordionCreditsPerson