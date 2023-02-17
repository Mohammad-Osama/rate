import {  Button, Group, Drawer, Text } from '@mantine/core';
import { useState, useEffect } from 'react';
import { useForm } from '@mantine/form';
import AddSlider from './AddSlider';
import axios from "axios"
import { openConfirmModal  } from '@mantine/modals';
import { useRouter } from 'next/router';
import { IRate } from '../helpers/types';


interface X {
    tmdb_id: number
    title: string
    poster_path:string 
    tmdb_rating:number
    media_type: string
    user: string | null
    isRatedUser:boolean | undefined
    movieRateInfoUserProps:IRate | null
}

interface IModalType {
    title: string;
    text: string;
    labelConfirm: string;
    labelCancel: string;
    ConfirmFunc: () => void ;
    CancelFunc:  () => void ;
}
const AddRate = ({ tmdb_id, title,poster_path,tmdb_rating, media_type, user , movieRateInfoUserProps,isRatedUser }: X) => {

    const [actingValue, setActingValue] = useState(movieRateInfoUserProps===null ? 5 : movieRateInfoUserProps.acting);
    const [storyValue, setStoryValue] = useState(movieRateInfoUserProps===null ? 5 : movieRateInfoUserProps.story);
    const [dialogueValue, setDialogueValue] = useState(movieRateInfoUserProps===null ? 5 : movieRateInfoUserProps.dialogue);
    const [directingValue, setDirectingValue] = useState(movieRateInfoUserProps===null ? 5 : movieRateInfoUserProps.directing);
    const [cinematographyValue, setCinematographyValue] = useState(movieRateInfoUserProps===null ? 5 : movieRateInfoUserProps.cinematography);
    const [visualEffectsValue, setVisualEffectsValue] = useState(movieRateInfoUserProps===null ? 5 : movieRateInfoUserProps.visual_effects);
    const [soundEffectsValue, setSoundEffectsValue] = useState(movieRateInfoUserProps===null ? 5 : movieRateInfoUserProps.sound_effects);

    const [opened, setOpened] = useState(false);

    const [modalType, setModalType] = useState<IModalType>()

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
            poster_path:poster_path,
            tmdb_rating:tmdb_rating,
            media_type: media_type,
            user: user

        },
    });
    const router =useRouter()
    const routeLogin = () => {
        router.push('/login')
    }

    const openDrawer = () => {
        setOpened(true)
    }
    const CloseDrawer = () => {
        setOpened(false)
    }


    const handleSubmit = () => {
        const values = form.values;
      console.log("submit for values", values)
     const token = localStorage.getItem("token")?.replace(/^"(.*)"$/, '$1')
		const config = {
			headers: { Authorization: `Bearer ` + token }
		};
        axios.post(`/api/rate/${media_type}/addrate`,
            values,
            config)
            .then((response) => {
             //   console.log("resssssssssssss", response)
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
                   //  onConfirm: () => window.location.reload()
                 });
			})
    }

    const handleEdit = () => {
        const values = form.values;
     //  console.log("edit form values--->>", values)
      /*  const token = localStorage.getItem("token")?.replace(/^"(.*)"$/, '$1')
		const config = {
			headers: { Authorization: `Bearer ` + token }
		}; */
        axios.post(`/api/rate/${media_type}/editrate`,
            values,
          //  config
            )
            .then((response) => {
             //   console.log("resssssssssssss", response)
                openConfirmModal({
                   title: ' Rate Succesfully Edited  !',
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
                   //  onConfirm: () => window.location.reload()
                 });
			})
    }

   // const modals = useModals();
    const confirmAddModal = () => {
//console.log(form.values)
        openConfirmModal({
            title: modalType?.title,
            centered: true,
            children: (

                <Text size="sm" color="white">
                    {modalType?.text}
                </Text>

            ),
            labels: { confirm: modalType?.labelConfirm, cancel: modalType?.labelCancel },
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
            onCancel:  modalType?.CancelFunc,
            onConfirm:  modalType?.ConfirmFunc
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
      //  console.log(user)
      if (user !== null) {
        if (movieRateInfoUserProps ===null) {
            setModalType({
                title: "Add a rate",
                text: "Are u sure you want to add this rating ?",
                labelConfirm: "Yes , add this rate",
                labelCancel: "Go back",
                ConfirmFunc: handleSubmit,
                CancelFunc: openDrawer,
            })
        }
        else {
            setModalType({
                title: "Edit Your Rate",
                text: "Are u sure you want to edit this rating ?",
                labelConfirm: "Yes , edit this rate",
                labelCancel: "Go back",
                ConfirmFunc: handleEdit,
                CancelFunc: openDrawer,
            })
        }
    }
    else
        setModalType({
            title: "Login required",
            text: "Please login before adding your rate",
            labelConfirm: "Login",
            labelCancel: "Go back",
            ConfirmFunc: routeLogin ,
            CancelFunc: CloseDrawer,
        })
        
    }, [form.values])
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
                {isRatedUser
                     ?"Edit Your Rate"
                     :"Add Your Rate"
                    }
                </Button>
            </Group>
        </>
    )
}

export default AddRate