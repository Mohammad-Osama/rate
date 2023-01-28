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
            radius="xs"
            size="lg"
            withEdges
            page={page}
            onChange={setPage}
        />
    )
}

export default PaginatioN
