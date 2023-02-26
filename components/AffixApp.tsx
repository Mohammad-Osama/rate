import { ArrowNarrowUp } from 'tabler-icons-react';
import { useWindowScroll } from '@mantine/hooks';
import { Affix, Button, Transition, useMantineTheme } from '@mantine/core';
import * as colors from '../helpers/colors'


const AffixApp = () => {
    const [scroll, scrollTo] = useWindowScroll();
    const theme=useMantineTheme()

    return (
        <Affix
            position={{
                bottom: 20,
                right: 20
            }}
        >
            <Transition
                transition="slide-up"
                mounted={scroll.y > 1200}
            >
                {(transitionStyles) => (
                    <Button
                        rightIcon={
                            <ArrowNarrowUp
                                size={22}
                                strokeWidth={3}
                            />
                        }
                        bg={theme.fn.gradient({ from: `${colors.nightBlue}`, to: `${colors.sandTan}` })}
                        style={transitionStyles}
                        onClick={() => scrollTo({ y: 0 })}
                    >
                        Back to top
                    </Button>
                )}
            </Transition>
        </Affix>
    )
}

export default AffixApp
