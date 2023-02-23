import {
    Button,
    Group,
    Drawer,
    Text,
    useMantineTheme,
    TextInput,
    Textarea,
    createStyles
} from '@mantine/core';
import { Dispatch, SetStateAction } from 'react';
import { useForm } from '@mantine/form';
import axios from "axios"
import { openConfirmModal } from '@mantine/modals';


const useStyles = createStyles((theme) => ({
    root: {
        marginBottom: '23px',
        position: 'relative',
        width: '100%',

    },

    label: {
        position: 'absolute',
        zIndex: 2,
        //  top: 7,
        left: theme.spacing.sm,
        pointerEvents: 'none',
        color: "white",
        transition: 'transform 150ms ease, color 150ms ease, font-size 150ms ease',
        transform: `translate(-${theme.spacing.sm}px, -28px)`,
        fontSize: theme.fontSizes.sm,
        fontWeight: 400,

    },

    required: {
        transition: 'opacity 150ms ease',
        opacity: 1,
    },

    input: {
        color: "white",
        backgroundColor: theme.colors.dark[3],
        '&::placeholder': {
            transition: 'color 150ms ease',
            color: 'transparent',
        },
    },
    description: {
        color: "red",
        backgroundColor: theme.colors.dark[3],
    },
}));
interface X {
    opened: boolean;
    setOpened: Dispatch<SetStateAction<boolean>>;
}
const FeedBack = ({ opened, setOpened }: X) => {
    const theme = useMantineTheme();
    const { classes } = useStyles();

    const form = useForm({
        initialValues: {
            name: '',
            subject: '',
            message: '',
        },
        validate: {
          name: (value) => value.trim().length < 3,
          subject: (value) =>value.trim().length < 3,
          message: (value) => value.trim().length < 10,
        },
    })
    const clearInput = () => {
        form.setFieldValue('name', "")
        form.setFieldValue('subject', "")
        form.setFieldValue('message', "")
    }
    const handelSubmit = () => {
        setOpened(false)
        const values = form.values;

        axios.post(`/api/feedback/send`,
            values,
            // config
        )
            .then((response) => {
                clearInput()
                openConfirmModal({
                    title: 'Thank you for your feedback !',
                    centered: true,
                    labels: { confirm: " Go back ", cancel: "" },
                    confirmProps: { color: 'blue', fullWidth: true },
                    cancelProps: { hidden: true },
                    styles: {
                        modal: {
                            backgroundColor: "#373A40"
                        },
                        title: {
                            color: "white"
                        }
                    },
                    //  onCancel: () => setOpened(true),
                    // onConfirm: () => window.location.reload()
                });
            })
            .catch(function (error) {
                openConfirmModal({
                    title: ' Something went wrong !',
                    centered: true,
                    children: (

                        <Text size="sm" color="white">
                            {error.response.data}
                        </Text>

                    ),
                    labels: { confirm: " Go back ", cancel: "" },
                    confirmProps: { color: 'blue', fullWidth: true },
                    cancelProps: { hidden: true },
                    styles: {
                        modal: {
                            backgroundColor: "#373A40"
                        },
                        title: {
                            color: "white"
                        }
                    },
                    //  onCancel: () => setOpened(true),
                    //  onConfirm: () => window.location.reload()
                });
            })
    }

    return (
        <>
            <Drawer
                opened={opened}
                onClose={() => setOpened(false)}
                overlayColor={theme.colors.dark[8]}
                overlayOpacity={0.55}
                overlayBlur={3}
                title="Send a Feedback"
                padding="xl"
                size="xl"
                styles={{
                    drawer: {
                        backgroundColor: "#373A40",
                        height: "80vh",
                        width: "60vw",
                        marginLeft: "20vw",
                        marginTop: "5vh",
                    },
                    title: {
                        color: "white",
                        fontSize: "20px",
                    },
                }}
            >
                <form onSubmit={form.onSubmit(handelSubmit)}>
                    <TextInput
                        classNames={classes}
                        w="50%"
                        mt={40}
                        label="Name"
                        placeholder="Your name"
                        name="name"
                        variant="filled"
                        value={form.values.name}
                        onChange={(event) => form.setFieldValue("name", event.currentTarget.value)}
                        error={form.errors.name && 'Short name'}
                    />
                    <TextInput
                        classNames={classes}
                        label="Subject"
                        placeholder="Subject"
                        w="50%"
                        mt={40}
                        name="subject"
                        variant="filled"
                        value={form.values.subject}
                        onChange={(event) => form.setFieldValue("subject", event.currentTarget.value)}
                        error={form.errors.subject && 'Short subject'}
                    />
                    <Textarea
                        classNames={classes}
                        mt={40}
                        label="Message"
                        placeholder="Your message"
                        maxRows={10}
                        minRows={5}
                        autosize
                        name="message"
                        variant="filled"
                        value={form.values.message}
                        onChange={(event) => form.setFieldValue("message", event.currentTarget.value)}
                        error={form.errors.message && 'Short message'}
                    />
                    <Group position="center" mt="xl">
                        <Button type="submit" size="md">
                            Send Feedback
                        </Button>
                    </Group>
                </form>
            </Drawer>
        </>
    )
}

export default FeedBack
