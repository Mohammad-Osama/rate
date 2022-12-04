import { TextInput, Button, Group, Drawer , Text } from '@mantine/core';
import { openModal, closeAllModals } from '@mantine/modals';
import { useState ,useEffect } from 'react';
import { useForm } from '@mantine/form';
import AddSlider from './AddSlider';
import axios from "axios"

interface X {
    tmdb_id: number
    title:string
    
}


const AddRate = ({tmdb_id,title}:X) => {
 
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
            acting : actingValue,
            story :storyValue,
            dialogue:dialogueValue,
            directing:directingValue,
            cinematography:cinematographyValue,
            visual_effects:visualEffectsValue,
            sound_effects:soundEffectsValue,
            tmdb_id:tmdb_id,
            title:title

        },
    });

    const handelSubmit = () => {
		const values = form.values;
		console.log("vvvv" , values)
        axios.post('/api/rate/movies/addrate',
					 values)
			.then((response) => {
				console.log("resssssssssssss", response)		
				
			})
	}


useEffect(() => {
   
}, [])
    return (
        <>
        <Drawer
                opened={opened}
                onClose={() => setOpened(false)}
                title="Add your rate "
                padding="xl"
                size="xl"
                styles={{drawer:{backgroundColor:"#373A40" ,
                                height:"80vh",
                                width:"60vw",
                                marginLeft:"20vw",
                                marginTop:"5vh",         
                                 },
                                 title:{color:"white" , fontSize:"20px"}
                                 
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

                  <form onSubmit={form.onSubmit(handelSubmit)}>
                  <Group position="center" m={15}>
                      <Button type="submit"> 
                            Submit your rate 
                      </Button>
                      </Group>
                  </form>
            </Drawer>
            <Group position="center">
                <Button onClick={() => setOpened(true)}>Open Drawer</Button>
            </Group>
            </>
    )
}

export default AddRate
