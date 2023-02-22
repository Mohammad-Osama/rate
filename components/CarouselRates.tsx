import { Carousel } from '@mantine/carousel';
import {
    Container,
    Image,
    Stack,
} from '@mantine/core';

import { IRate } from '../helpers/types';
import RatingOneItem from './RateOneItem';
import { useMediaQuery } from '@mantine/hooks';

interface X {
    rates: IRate[]
}

const CarouselRates = ({ rates }: X) => {

    const Screen768px = useMediaQuery('(max-width: 768px)');
    const Screen600px = useMediaQuery('(max-width: 600px)');


function slideRatio() {
    if (Screen768px&&!Screen600px)
    return "50%"
    else if (Screen600px &&Screen768px )
    return "100%"
    else return  "33.333333%"
}
function slideNumber() {
    if (Screen768px&&!Screen600px)
    return 2
    else if (Screen600px &&Screen768px )
    return 1
    else return  3
}
console.log(slideNumber() )
    return (
        <Container >

            <Carousel
                //slideSize="170%"
                //  height={900}
                slideGap="sm"
                controlsOffset="xs"
                controlSize={40}
                dragFree
                withIndicators
                slideSize={slideRatio()}
                slidesToScroll={slideNumber()}
                styles={{
                    indicator: {
                        width: 12,
                        height: 4,
                        transition: 'width 250ms ease',
                        '&[data-active]': {
                            width: 40,
                        },
                    },
                }}
            >
                {rates.length > 0
                    ? rates.map((rate) => {
                        return <Carousel.Slide key={rate._id}
                        >
                            <Stack
                                align="center"
                                justify="space-between"
                                spacing="sm"
                                sx={() => ({
                                    backgroundColor: '#212529',
                                })}>
                                <RatingOneItem
                                    rate={rate}
                                />
                            </Stack>
                        </Carousel.Slide>
                    })
                    : <Carousel.Slide >
                        <Image src={`/images/no_media.jpg`}
                            fit="contain"
                            height={400}
                        />
                    </Carousel.Slide>
                }
            </Carousel>
        </Container>
    )
}

export default CarouselRates
