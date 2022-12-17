import { TextInput, Button, Group, Drawer, Text } from '@mantine/core';
import { openModal, closeAllModals } from '@mantine/modals';
import { useState, useEffect, SetStateAction } from 'react';
import { useForm } from '@mantine/form';
import AddSlider from './AddSlider';
import axios from "axios"
import { showNotification } from '@mantine/notifications'
import { useModals } from '@mantine/modals';
import { openConfirmModal , openContextModal } from '@mantine/modals';
import { useRouter } from 'next/router';
import { IRate } from '../helpers/types';


interface X {
    tmdb_id: number
    title: string
    media_type: string
    user: string | null
    isRatedUser :boolean|undefined
    movieRateInfoUserProps:IRate|null
}

interface IModalType {
    title: string;
    text: string;
    labelConfirm: string;
    labelCancel: string;
    ConfirmFunc: () => void ;
    CancelFunc:  () => void ;
}
const AddRate = ({ tmdb_id, title, media_type, user , isRatedUser , movieRateInfoUserProps }: X) => {
   // console.log(isRatedUser , movieRateInfoUserProps)
   console.log(movieRateInfoUserProps)
    const [actingValue, setActingValue] = useState<number|undefined>();
    const [storyValue, setStoryValue] = useState<number|undefined>();
    const [dialogueValue, setDialogueValue] = useState<number|undefined>();
    const [directingValue, setDirectingValue] = useState<number|undefined>();
    const [cinematographyValue, setCinematographyValue] = useState<number|undefined>();
    const [visualEffectsValue, setVisualEffectsValue] = useState<number|undefined>();
    const [soundEffectsValue, setSoundEffectsValue] = useState<number|undefined>();

    const [opened, setOpened] = useState(false);

    const [modalType, setModalType] = useState<IModalType>()

    const form = useForm({
        initialValues: {
            acting: actingValue||5,
            story: storyValue||5,
            dialogue: dialogueValue||5,
            directing: directingValue||5,
            cinematography: cinematographyValue||5,
            visual_effects: visualEffectsValue||5,
            sound_effects: soundEffectsValue||5,
            tmdb_id: tmdb_id,
            title: title,
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


    const handelSubmit = () => {
        const values = form.values;
     //   console.log("vvvv", values)
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
console.log(form.values)
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
        console.log("fffffffffff" , form.values)

      //  console.log(user)
      // fix this
      setActingValue(movieRateInfoUserProps ? movieRateInfoUserProps.acting :5 )
      setStoryValue(movieRateInfoUserProps?.story ?movieRateInfoUserProps?.story : 5)
      setDialogueValue(movieRateInfoUserProps?.dialogue ?movieRateInfoUserProps?.dialogue : 5)
      setDirectingValue(movieRateInfoUserProps?.directing ?movieRateInfoUserProps?.directing : 5)
      setCinematographyValue(movieRateInfoUserProps?.cinematography ?movieRateInfoUserProps?.cinematography : 5)
      setVisualEffectsValue(movieRateInfoUserProps?.visual_effects ?movieRateInfoUserProps?.visual_effects : 5)
      setSoundEffectsValue(movieRateInfoUserProps?.sound_effects ?movieRateInfoUserProps?.sound_effects : 5)

        if (user !== null) {
            setModalType({
                title: "Add a rate",
                text: "Are u sure you want to add this rating ?",
                labelConfirm: "Yes , add this rate",
                labelCancel: "Go back",
                ConfirmFunc: handelSubmit,
                CancelFunc: openDrawer,
            })
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
       //     return () => {
     
      //      }
    }, [opened ])
    
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
                    value={actingValue
                            }
                    setValue={setActingValue}
                    addToForm={form.setFieldValue}
                    isRatedUser={isRatedUser}
                    opened={opened}
                />
                <AddSlider field="story"
                    value={storyValue       
                              }
                    setValue={setStoryValue}
                    addToForm={form.setFieldValue}
                    isRatedUser={isRatedUser}
                    opened={opened}
                />
                <AddSlider field="dialogue"
                    value={dialogueValue
                          }
                    setValue={setDialogueValue}
                    addToForm={form.setFieldValue}
                    isRatedUser={isRatedUser}
                    opened={opened}
                />
                <AddSlider field="directing"
                    value={directingValue
                            }
                    setValue={setDirectingValue}
                    addToForm={form.setFieldValue}
                    isRatedUser={isRatedUser}
                    opened={opened}
                />

                <AddSlider field="cinematography"
                    value={cinematographyValue
                            }
                    setValue={setCinematographyValue}
                    addToForm={form.setFieldValue}
                    isRatedUser={isRatedUser}
                    opened={opened}
                />
                <AddSlider field="visual_effects"
                    value={visualEffectsValue
                            }
                    setValue={setVisualEffectsValue}
                    addToForm={form.setFieldValue}
                    isRatedUser={isRatedUser}
                    opened={opened}
                />
                <AddSlider field="sound_effects"
                    value={soundEffectsValue
                            }
                    setValue={setSoundEffectsValue}
                    addToForm={form.setFieldValue}
                    isRatedUser={isRatedUser}
                    opened={opened}
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
                     ?"Edit your rating"
                     :"Add your rate"
                    }
                    
                </Button>
            </Group>
        </>
    )
}

export default AddRate
