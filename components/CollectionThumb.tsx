import {
  Container,
  Image,
  Text,
  Stack,
} from '@mantine/core';
import * as tmdb from "../helpers/tmdb"
import { ICollection } from '../helpers/types';
import Link from 'next/link';


interface X {
  data: ICollection | null
}

const CollectionThumb = ({ data }: X) => {
  if (data === null)
    return (
      <Text
        align="justify"
        weight={300}
        color="white"
        style={{ fontFamily: 'Greycliff CF, sans-serif', fontSize: "18px" }}
        mb="lg"
        ml="xl"
      >
        Does not belong to a collection
      </Text>)
  else
    return (
      <Container>
        <Stack
          align="center"
          ml="xl"
        >
          <Link
            href={{
              pathname: "/collection/[id]",
              query: {
                id: data.id,
              },
            }}
            as={`/collection/${data.id}`}
          >
            <Image
              src={`${tmdb.imgUrl}${tmdb.imgSize}${data.poster_path}`}
              fit="fill"
              width={250}
              height={350}
            />
          </Link>
          <Text
            align="justify"
            weight={300}
            color="white"
            style={{ fontFamily: 'Greycliff CF, sans-serif', fontSize: "20px" }}>
            {data.name}
          </Text>
        </Stack>
      </Container>
    )
}

export default CollectionThumb
