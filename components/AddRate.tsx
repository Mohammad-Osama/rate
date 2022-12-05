import { TextInput, Button, Group, Drawer, Text } from '@mantine/core';
import { openModal, closeAllModals } from '@mantine/modals';
import { useState, useEffect } from 'react';
import { useForm } from '@mantine/form';
import AddSlider from './AddSlider';
import axios from "axios"
import { showNotification } from '@mantine/notifications'
import { useModals } from '@mantine/modals';
import { openConfirmModal , openContextModal } from '@mantine/modals';

interface X {
    tmdb_id: number
    title: string
    media_type: string
    user: string | null
}


const AddRate = ({ tmdb_id, title, media_type, user }: X) => {

    const [actingValue, setActingValue] = useState(5);
    const [storyValue, setStoryValue] = useState(5);
    const [dialogueValue, setDialogueValue] = useState(5);
    const [directingValue, setDirectingValue] = useState(5);
    const [cinematographyValue, setCinematographyValue] = useState(5);
    const [visualEffectsValue, setVisualEffectsValue] = useState(5);
    const [soundEffectsValue, setSoundEffectsValue] = useState(5);

    const [opened, setOpened] = useState(false);

    const form = useForm({
        initialValues: {
            acting: actingValue,
            story: storyValue,
            dialogue: dialogueValue,
            directing: directingValue,
            cinematography: cinematographyValue,
            visual_effects: visualEffectsValue,
            sound_effects: soundEffectsValue,
            tmdb_id: tmdb_id,
            title: title,
            media_type: media_type,
            user: user

        },
    });

    const handelSubmit = () => {
        const values = form.values;
        console.log("vvvv", values)
        axios.post('/api/rate/movies/addrate',
            values)
            .then((response) => {
                console.log("resssssssssssss", response)
                openConfirmModal({
                   title: ' Rate succesfully added  !',
                    centered: true,
                    /* children: (
        
                        <Text size="sm" color="white">
                            Rate succesfully added  !
                        </Text>
        
                    ), */
                    labels: { confirm: " Go back ", cancel: "" },
                    confirmProps: { color: 'blue' ,fullWidth:true},
                    cancelProps:{hidden:true},
                    styles: {
                        modal: {
                            backgroundColor: "#373A40"
                        } ,
                        title :{
                            color:"white"
                        } 
                    },
                  //  onCancel: () => setOpened(true),
                    onConfirm: () => window.location.reload()
                });
            })
    }

   // const modals = useModals();
    const confirmAddModal = () => {

        openConfirmModal({
            title: 'Add a rate',
            centered: true,
            children: (

                <Text size="sm" color="white">
                    Are u sure you want to add this rating ?
                </Text>

            ),
            labels: { confirm: "Yes , add this rate", cancel: "Go back" },
            confirmProps: { color: 'blue'},
         //   cancelProps:{ color: 'red'}, doesnt work, bug?
             
            styles: {
                modal: {
                    backgroundColor: "#373A40",
                } ,
                title :{
                    color:"white",
                } ,
               
            },
            onCancel: () => setOpened(true),
            onConfirm: () => handelSubmit()
        });

    }

    function addedValues() { //added values in the form,not needed
        for (const [key, value] of Object.entries(form.values)
            .filter(([key]) => key !== 'user' &&
                key !== 'tmdb_id' &&
                key !== 'title' &&
                key !== 'media_type'
            )) {
            console.log(`${key}: ${value}`);
        }
    }
    useEffect(() => {

    }, [])
    return (
        <>
            <Drawer
                opened={opened}
                onClose={() => setOpened(false)}
                title="Add your rate"
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
                    title: { color: "white",
                             fontSize: "20px",
                             },
                    

                }}
            >
                <AddSlider field="acting"
                    value={actingValue}
                    setValue={setActingValue}
                    addToForm={form.setFieldValue}

                />
                <AddSlider field="story"
                    value={storyValue}
                    setValue={setStoryValue}
                    addToForm={form.setFieldValue}

                />
                <AddSlider field="dialogue"
                    value={dialogueValue}
                    setValue={setDialogueValue}
                    addToForm={form.setFieldValue}

                />
                <AddSlider field="directing"
                    value={directingValue}
                    setValue={setDirectingValue}
                    addToForm={form.setFieldValue}

                />

                <AddSlider field="cinematography"
                    value={cinematographyValue}
                    setValue={setCinematographyValue}
                    addToForm={form.setFieldValue}

                />
                <AddSlider field="visual_effects"
                    value={visualEffectsValue}
                    setValue={setVisualEffectsValue}
                    addToForm={form.setFieldValue}

                />
                <AddSlider field="sound_effects"
                    value={soundEffectsValue}
                    setValue={setSoundEffectsValue}
                    addToForm={form.setFieldValue}

                />

                <form onSubmit={form.onSubmit(confirmAddModal)}>
                    <Group position="center" m={15}>
                        <Button type="submit" onClick={() => setOpened(false)}>
                            Submit your rate
                        </Button>
                    </Group>
                </form>
            </Drawer>
            <Group position="center">
                <Button onClick={() => setOpened(true)}>
                    Add your rate
                </Button>
            </Group>
        </>
    )
}

export default AddRate
