import { Text } from "@mantine/core"
interface X {
    title: string
    content: JSX.Element[] | string | string[] | (string | JSX.Element)[]
}
const MiddleTitle = ({ title, content }: X) => {
    return (
        <Text
           // m="lg"
            align="justify"
            weight={500}
            color="white"
            style={{
                fontFamily: 'Roboto,Helvetica,Arial,sans-serif',
                fontSize: "24px",
                backgroundColor: "#373A40",
                // wordWrap:"break-word",
                //  display:"flex",
                //  justifyContent:"flex-start",
                wordSpacing: "1px",
            }}>
            {title}: <span style={{ fontSize: "22px" }}>{content}</span>
        </Text>
    )
}

export default MiddleTitle
