import { Carousel } from '@mantine/carousel';
import {
    Container,
    Image,
    Stack,
} from '@mantine/core';

import { IRate } from '../helpers/types';
import RatingOneItem from './RateOneItem';

interface X {
    rates: IRate[]
}

const CarouselRates = ({ rates }: X) => {
    

    return (
        <Container >

            <Carousel
                //slideSize="170%"
                //  height={900}
                slideGap="sm"
                controlsOffset="xs"
                controlSize={40}
                // dragFree
                withIndicators
                slideSize="33.333333%"
                slidesToScroll={3}
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
