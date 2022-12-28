import { Text } from "@mantine/core"
interface X {
    title: string
    content: string
}
const MiddleTitle = ({ title,content }: X) => {
    return (
        <Text align="justify"
            weight={700}
            color="white"
            style={{
                fontFamily: 'Roboto,Helvetica,Arial,sans-serif',
                fontSize: "20px",
                backgroundColor: "#373A40",
                // wordWrap:"break-word",
                //  display:"flex",
                //  justifyContent:"flex-start",
                wordSpacing: "1px",
            }}>
            {title} : <span style={{fontSize:"18px"}}>{content}</span>
        </Text>
    )
}

export default MiddleTitle
