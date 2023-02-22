import { Carousel } from '@mantine/carousel';
import {
    Container,
    Image,
} from '@mantine/core';
import * as tmdb from "../helpers/tmdb"
import { ISeason } from '../helpers/types';
import Link from 'next/link'
import { useMediaQuery } from '@mantine/hooks';


interface X {
    id: number;
    seasons: ISeason[];
    title: string;
}
const CarouselSeasons = ({ seasons, id, title }: X) => {
    const Screen768px = useMediaQuery('(max-width: 768px)');
    const Screen500px = useMediaQuery('(max-width: 500px)');

    function slideRatio() {
        if (Screen768px && !Screen500px)
            return "50%"
        else if (Screen500px && Screen768px)
            return "100%"
        else return "33.333333%"
    }
    function slideNumber() {
        if (Screen768px && !Screen500px)
            return 2
        else if (Screen500px && Screen768px)
            return 1
        else return 3
    }
    return (
        <Container>
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
                {seasons.length > 0
                    ? seasons.map((i) => {
                        return <Carousel.Slide key={i.id}>
                            <Link
                                href={{
                                    pathname: "/media/tv/season",

                                }}
                                as={`/media/tv/season?id=${id}&title=${title}&season_number=${i.season_number}`}
                            >
                                <Image
                                    src={i.poster_path
                                        ? `${tmdb.imgUrl}${tmdb.imgSizeW1280}${i.poster_path}`
                                        : `/images/no_media.jpg`
                                    }
                                    fit="contain"
                                //  height="100%"
                                />
                            </Link>
                        </Carousel.Slide>
                    })
                    : <Carousel.Slide >
                        <Image
                            src={`/images/no_media.jpg`}
                            fit="contain"
                            height={400}
                        />
                    </Carousel.Slide>
                }
            </Carousel>
        </Container>
    )
}

export default CarouselSeasons
