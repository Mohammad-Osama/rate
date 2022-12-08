import { Slider, Text } from '@mantine/core';
import { useState, useEffect, Dispatch } from 'react';
import { SetStateAction } from 'react';



interface X {
    field: string
    value:number
    setValue:Dispatch<SetStateAction<number>>
    addToForm:(input :string,value:number)=>void
}
const AddSlider = ({ field ,value,setValue,addToForm}: X) => {
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
                defaultValue={5}
                labelAlwaysOn 
            />
        </>
    )
}

export default AddSlider
