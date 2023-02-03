import { Text } from "@mantine/core"
import * as colors from '../helpers/colors'

interface X{
    text :string
}

const SideTitle = ({text}:X) => {

    return (
        <Text
            //  p="xl"
            align="justify"
            weight={300}
            color= {`${colors.sandTan}`}
            style={{ fontFamily: 'Greycliff CF, sans-serif', fontSize: "25px" }}
            mb="lg"
        >
            {text}
        </Text>
    )
}

export default SideTitle
