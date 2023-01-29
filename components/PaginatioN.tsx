import { Pagination } from '@mantine/core';
import { Dispatch, SetStateAction } from 'react';

interface X {
    page: number;
    setPage: Dispatch<SetStateAction<number>>;
}
const PaginatioN = ({ page, setPage }: X) => {
    return (
        <Pagination
            total={500}
            radius="sm"
            size="lg"
            withEdges
            page={page}
            onChange={setPage}
            styles={(theme) => ({
                item: {
                    '&[data-active]': {
                        backgroundImage: theme.fn.gradient({ from: 'teal', to: 'cyan' }),
                    },
                    backgroundColor: theme.colors.dark[6],
                    boxShadow: theme.shadows.md,
                    border: `1px solid ${theme.colors.dark[4]
                    }`,
                    color:"white",
                    ':hover': {
                        backgroundImage: theme.fn.gradient({ from: theme.colors.dark[1], to: theme.colors.dark[6] }),
                    },
                },
            })}
        />
    )
}

export default PaginatioN
