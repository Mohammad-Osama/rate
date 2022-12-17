import { Slider, Text } from '@mantine/core';
import { useState, useEffect, Dispatch } from 'react';
import { SetStateAction } from 'react';



interface X {
    field: string
    value:number|undefined
    setValue:Dispatch<SetStateAction<number|undefined>>
    addToForm:(input :string,value:number)=>void
    isRatedUser:boolean|undefined
    opened:boolean
}
const AddSlider = ({ field ,value,setValue,addToForm,isRatedUser,opened}: X) => {
  //  console.log("slider value" , field , value)
    useEffect(() => {
       
    }, [value])
    return (
        <>
            <Text color="white" m={7}>
                {field}
            </Text>

            <Slider value={value}
                  onChange={(value) => {
                    setValue(value)
                    addToForm(field, value)

                }
                }
                max={10}
                step={1}
                min={0}
                defaultValue={value}
                labelAlwaysOn 
            />
        </>
    )
}

export default AddSlider
