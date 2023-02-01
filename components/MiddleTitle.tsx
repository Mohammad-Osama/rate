import { Group, Text } from "@mantine/core"
interface X {
    title: string
    content: JSX.Element[] | string | string[] | (string | JSX.Element)[] |JSX.Element |null|undefined
}
const MiddleTitle = ({ title, content }: X) => {
    return (
        <Group  >
        <Text
           // m="lg"  <span style={{ fontSize: "22px" }}>{content}</span>
            align="justify"
            weight={500}
            color="white"
            style={{
                fontFamily: 'Roboto,Helvetica,Arial,sans-serif',
                fontSize: "26px",
                backgroundColor: "#373A40",
                // wordWrap:"break-word",
                //  display:"flex",
                //  justifyContent:"flex-start",
                
            }}>
            {title}: 
        </Text>
        <Text mt={3}
           // m="lg"  <span style={{ fontSize: "22px" }}>{content}</span>
          //  align="justify"
          //  weight={500}
            color="white"
            style={{
                fontFamily: 'Roboto,Helvetica,Arial,sans-serif',
                fontSize: "22px",
                backgroundColor: "#373A40",
              //  whiteSpace:"nowrap"
                // wordWrap:"break-word",
                //  display:"flex",
                //  justifyContent:"flex-start",
                
            }}>
            {content}
        </Text>
        </Group>
    )
}

export default MiddleTitle
