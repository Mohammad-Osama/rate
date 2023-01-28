import { Button } from '@mantine/core';
import { Dispatch, SetStateAction } from 'react';

interface X {
    page: number;
    setPage: Dispatch<SetStateAction<number>>;
}

const PaginationButtons = ({ page, setPage }: X) => {
    return (
        <Button.Group>
            <Button
                variant="default"
                disabled={page === 1}
                onClick={() => { setPage(page - 1) }}
            >
                Previous
            </Button>
            <Button variant="default">
                {page}
            </Button>
            <Button
                variant="default"
                disabled={page === 500}
                onClick={() => { setPage(page + 1) }}
            >
                Next
            </Button>
        </Button.Group>
    )
}

export default PaginationButtons
