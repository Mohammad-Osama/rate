import { Text } from "@mantine/core"

interface X{
    text :string
}
const SideTitle = ({text}:X) => {
    return (
        <Text
            //  p="xl"
            align="justify"
            weight={300}
            color="yellow"
            style={{ fontFamily: 'Greycliff CF, sans-serif', fontSize: "25px" }}
            mb="lg"
        >
            {text}
        </Text>
    )
}

export default SideTitle
