import { TextInput, Button, Group, Slider, Drawer , Text } from '@mantine/core';
import { openModal, closeAllModals } from '@mantine/modals';
import { useState ,useEffect } from 'react';
import { useForm } from '@mantine/form';

const AddRate = () => {

    const [value, setValue] = useState(4);
    const [opened, setOpened] = useState(false);

    const form = useForm({
        initialValues: {
            first: 0,
           
        },
    });

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
                                height:"75vh",
                               // padding:"10vh",
                                width:"75vw",
                                margin:"10vw"
                                 },
                                 title:{color:"white" , fontSize:"20px"}
                                 
                                }}
            >
                <Text color="white">
                    Acting 
                </Text>
                <Slider value={value}
                        onChange={setValue}
                        max={10}
                        step={1}
                        min={0}
                        defaultValue={5}
                        labelAlwaysOn          
                  /> 
            </Drawer>
            <Group position="center">
                <Button onClick={() => setOpened(true)}>Open Drawer</Button>
            </Group>
            </>
    )
}

export default AddRate
