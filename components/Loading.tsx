import { Group, Loader } from '@mantine/core';

const Loading = () => {
    return (
        <Group position="center" >
            <Loader
                size={100}
                mt={150}
                variant="dots"
            />
        </Group>
    )
}

export default Loading
