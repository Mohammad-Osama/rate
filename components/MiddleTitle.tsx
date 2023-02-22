import { Group, Text } from "@mantine/core"

interface X {
    title: string
    content: JSX.Element[] | string | string[] | (string | JSX.Element)[] | JSX.Element | null | undefined
}

const MiddleTitle = ({ title, content }: X) => {
    return (
        <Group  >
            <Text
                align="justify"
                weight={500}
                color="white"
                style={{
                    fontFamily: 'Roboto,Helvetica,Arial,sans-serif',
                    fontSize: "26px",
                    backgroundColor: "#373A40",
                }}>
                {title}:
            </Text>
            <Text
                mt={3}
                color="white"
                style={{
                    fontFamily: 'Roboto,Helvetica,Arial,sans-serif',
                    fontSize: "22px",
                    backgroundColor: "#373A40",
                }}>
                {content}
            </Text>
        </Group>
    )
}

export default MiddleTitle
