import { Badge } from '@mantine/core';

interface X {
    x: number
}
const ValueBadge = ({ x }: X) => {
    return (
        <Badge //color="green"
            size="xl"
            variant="filled"
            styles={{
                inner: {
                    color: "white",
                    fontSize: "15px"
                },
            }
            }>
            {x}
        </Badge>
    )
}

export default ValueBadge
