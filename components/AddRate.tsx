import { TextInput, Button, Group, Drawer , Text } from '@mantine/core';
import { openModal, closeAllModals } from '@mantine/modals';
import { useState ,useEffect } from 'react';
import { useForm } from '@mantine/form';
import AddSlider from './AddSlider';

const AddRate = () => {
 
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
            acting : 0,
            story :0,
            dialogue:0,
            directing:0,
            cinematography:0,
            visual_effects:0,
            sound_effects:0,
        },
    });

    const handelSubmit = () => {
		const values = form.values;
		console.log("vvvv" , values)
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
