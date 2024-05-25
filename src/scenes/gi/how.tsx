import { Code, Layout, Rect, Txt, makeScene2D } from '@motion-canvas/2d';
import { Direction, all, beginSlide, createRef, createSignal, makeRefs, slideTransition } from '@motion-canvas/core';
import { Three } from '../../components/three';
import * as layers from '../../three/lights';
import { Axis } from '../../components/axis';
import { Slider } from '../../components/slider';
import { SlideTitle } from '../../components/title';

export default makeScene2D(function* (view) {
    view.fill('#141414');

    const probeText = createRef<Layout>();
    const raysText = createRef<Txt>();
    const rays = createRef<Layout>();

    yield layers.setup();
    yield view.add(
        <>
            <SlideTitle title={"The How"} chapter="(2D) Global Illumination" />
            <Layout direction={'column'} padding={48} width={'100%'} height={'100%'} alignItems={'start'} justifyContent={'end'} layout>
                <Txt fill={'#646464'} stroke={'#141414'} lineJoin={'round'} lineWidth={32} strokeFirst={true} fontFamily={'JetBrains Mono'} fontSize={28} fontStyle={'italic'} fontWeight={800}>Brute force it!</Txt>
            </Layout>
            <Layout ref={rays} opacity={0} direction={'column'} padding={128} width={'100%'} height={'100%'} alignItems={'end'} justifyContent={'center'} layout>
                <Layout paddingBottom={16} width={416} justifyContent={'space-between'} layout>                
                    <Txt fill={'#e4e4e4'} fontFamily={'JetBrains Mono'} fontSize={28} fontWeight={800}>Ray(s) per Probe</Txt>
                    <Txt ref={raysText} fill={'#57c4fd'} fontFamily={'JetBrains Mono'} fontSize={28} fontWeight={800}>00</Txt>
                </Layout>
                <Slider
                    color={'#57c4fd'}
                    value={() => layers.dirCount() / (256.0 + 10.0)}
                    width={416}
                />
                {/* <Code fontSize={24} marginRight={-48} marginTop={128} code={`\
theta = TAU * ((i + 0.5) / dir_count);
`}
                /> */}
            </Layout>
            <Layout ref={probeText} opacity={0} direction={'column'} paddingTop={640+128} width={'100%'} height={'100%'} gap={16} alignItems={'center'} justifyContent={'center'} layout>
                <Txt fill={'#85e04c'} fontFamily={'JetBrains Mono'} fontSize={32} fontWeight={800}>
                    Radiance probes
                </Txt>
                <Txt fill={'#646464'} fontFamily={'JetBrains Mono'} fontStyle={'italic'} fontSize={28} fontWeight={800}>(Deterministic)</Txt>
            </Layout>
            <Rect width={640} height={640} radius={16} clip={true}>
                {/* Shader */}
                <Three
                    width={640}
                    height={640}
                    resw={64}
                    resh={64}
                    camera={layers.camera}
                    scene={layers.threeScene}
                    layout={false}
                />
            </Rect>
        </>
    );

    raysText().text(() => `${layers.dirCount().toFixed(0)}`);

    yield* layers.dirCount(256, 0);
    yield* layers.animateT(0, 0);

    yield* slideTransition(Direction.Bottom, 2.0);

    yield* beginSlide('GI Slide');

    yield* all(
        probeText().opacity(1, 1), 
        rays().opacity(1, 1)
    );

    yield* beginSlide('Low Dir Count');

    yield* layers.dirCount(4, 4)

    yield* beginSlide('High Dir Count');

    yield* layers.dirCount(256, 4);

    yield* beginSlide('End GI Slide');
});
