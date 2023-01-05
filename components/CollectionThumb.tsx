import React, { useState, useEffect } from 'react'

import {
  Container,
  SimpleGrid,
  Grid,
  Image,
  Badge,
  Slider,
  Drawer,
  Button,
  Group,
  Progress,
  Text,
  Space,
  Card,
  Stack,
  Flex,
  Divider,
  Accordion
} from '@mantine/core';
import * as tmdb from "../helpers/tmdb"
import { IAllProviders, ICollection, IProvidersList } from '../helpers/types';
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
          align="flex-start"
          //  key={s.provider_id}
          ml="xl"
        >
          <Link
            href={{
              pathname :"/collection/[id]",
              query: {
                  id: data.id,
               //   type:type,
               //   title:title
                },
  }}
          as={`/collection/${data.id}`}
          >
            <Image
              src={`${tmdb.imgUrl}${tmdb.imgSize}${data.poster_path}`}
              //   style={{marginLeft:"20px"}}
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
