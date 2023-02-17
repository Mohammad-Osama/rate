import { Title, Text, Container, Button, Tooltip, Overlay, createStyles } from '@mantine/core';
import { useState, useEffect } from 'react';
import { IMediaType, ISearchMulti, ITimeWindnow } from '../helpers/types';
import * as tmdb from "../helpers/tmdb"
import * as colors from "../helpers/colors"


interface D {
  imagePath: string
  delayedNumber: any
}
const useStyles = createStyles((theme, imagePath: string) => ({
  wrapper: {
    position: 'relative',
    paddingTop: 180,
    paddingBottom: 130,
    backgroundImage: `url(${tmdb.imgUrl}${tmdb.imgSizeW1280}${imagePath})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    // height: '700px',
    backgroundAttachment: "fixed",


    marginTop: "-15px",
    '@media (max-width: 520px)': {
      paddingTop: 80,
      paddingBottom: 50,

    },


  },

  inner: {
    position: 'relative',
    zIndex: 1,
  },

  title: {
    fontWeight: 800,
    fontSize: 40,
    letterSpacing: -1,
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    color: theme.white,
    marginBottom: theme.spacing.xs,
    textAlign: 'center',
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,

    '@media (max-width: 520px)': {
      fontSize: 28,
      textAlign: 'left',
    },
  },

  highlight: {
    color: colors.sandTan,
    cursor: 'pointer',

  },

  description: {
    color: theme.colors.gray[0],
    textAlign: 'center',

    '@media (max-width: 520px)': {
      fontSize: theme.fontSizes.md,
      textAlign: 'left',
    },
  },

  controls: {
    marginTop: theme.spacing.xl * 1.5,
    display: 'flex',
    justifyContent: 'center',
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,

    '@media (max-width: 520px)': {
      flexDirection: 'column',
    },
  },

  control: {
    height: 42,
    fontSize: theme.fontSizes.md,

    '&:not(:first-of-type)': {
      marginLeft: theme.spacing.md,
    },

    '@media (max-width: 520px)': {
      '&:not(:first-of-type)': {
        marginTop: theme.spacing.md,
        marginLeft: 0,
      },
    },
  },

  secondaryControl: {
    color: theme.white,
    backgroundColor: 'rgba(255, 255, 255, .4)',

    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, .45) !important',
    },
  },

  loading: {
    position: 'relative',
    paddingTop: 180,
    paddingBottom: 130,
  //  backgroundImage: `url(${tmdb.imgUrl}${tmdb.imgSizeW1280}${imagePath})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    // height: '700px',
    backgroundAttachment: "fixed",


    marginTop: "-15px",
    '@media (max-width: 520px)': {
      paddingTop: 80,
      paddingBottom: 50,

    },


  },
}));

const useStylesHidden = createStyles((theme, stylesData: D) => ({
  wrapper: {
    position: 'relative',
    paddingTop: 180,
    paddingBottom: 130,
    backgroundImage: `url(${tmdb.imgUrl}${tmdb.imgSizeW1280}${stylesData.imagePath})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: "fixed",

    marginTop: "-15px",
    '@media (max-width: 520px)': {
      paddingTop: 80,
      paddingBottom: 50,

    },
    // not  working ???
    display: "none",
    opacity: 0,
    transition: " visibility 0s 2s, opacity 2s linear",
    height: 0

  },

  control: {
    height: 0,

  },
}));
interface X {
  mediaType: IMediaType;
  time_window: ITimeWindnow;
  beginNow: () => void;
}
const HeaderHome = ({ mediaType, time_window, beginNow }: X) => {

  const delayed = setTimeout(() => {
    return 0
  }, 600)
  const delayedNumber = delayed as unknown as number

  const [trending, setTrending] = useState({} as ISearchMulti)
  const [imagePath, setImagePath] = useState("")
  const [loading, setLoading] = useState(true)



  const stylesData = {
    imagePath: imagePath,
    delayedNumber: delayed
  } as D
  const { classes, cx } = useStyles(imagePath);
  const classesHidden = useStylesHidden(stylesData).classes
  async function getTrending(mediaType: string, time_window: string) {
    try {
      const response = await fetch(`/api/trending?mediaType=${mediaType}&time_window=${time_window}`)
      const data = await response.json() 
      setTrending(data.results[0])
      setImagePath(data.results[0].backdrop_path as string)
      setLoading(false)
    } catch (error) {
      alert(error)
    }
  }
  const [hidden, setHidden] = useState(false)



  const handleClick = () => {
    setHidden(!hidden);
  };


  useEffect(() => {

    getTrending(mediaType, time_window)

  }, [mediaType, time_window])


  /* if (!loading)
    return (
      <div className={classes.loading }>
        <Overlay color="#000" opacity={0.65} zIndex={1} />

        <div className={classes.inner}>

          <Container
            h={200}
          >

          </Container>

          <div className={classes.controls}>
            <Title className={classes.title}>
              Rate Your Favourite Movie or Show {' '}
              <Tooltip.Floating  
                label="Click To Hide"
                sx={(theme) => ({
                backgroundImage: theme.fn.gradient({ from: `${colors.sandTan}`, to: `${colors.nightBlue}` }),
                })}
              >
                <Text
                  component="span"
                  inherit
                  className={classes.highlight}
                  onClick={handleClick}
                >
                  Begin Now !
                </Text>
              </Tooltip.Floating>
            </Title>
          </div>
        </div>
      </div>
    )
  else */
    return (
      <div className={
        hidden
          ? classesHidden.wrapper
          : classes.wrapper
      }>
        {loading && <Overlay opacity={0.6} color="#000" blur={2} />}
        <Overlay color="#000" opacity={0.65} zIndex={1} />

        <div className={classes.inner}>

          <Container
            h={200}
          >

          </Container>

          <div className={classes.controls}>
            <Title className={classes.title}>
              Rate Your Favourite Movie or Show {' '}
              <Tooltip.Floating  
                label="Click To Hide"
                sx={(theme) => ({
                backgroundImage: theme.fn.gradient({ from: `${colors.sandTan}`, to: `${colors.nightBlue}` }),
                })}
              >
                <Text
                  component="span"
                  inherit
                  className={classes.highlight}
                  onClick={handleClick}
                >
                  Begin Now !
                </Text>
              </Tooltip.Floating>
            </Title>
          </div>
        </div>
      </div>
    )
}

export default HeaderHome
