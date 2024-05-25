import { Layout, Rect, Txt, makeScene2D } from '@motion-canvas/2d';
import { Direction, all, beginSlide, createRef, makeRefs, slideTransition } from '@motion-canvas/core';
import { Three } from '../../components/three';
import * as layers from '../../three/lights';
import { Axis } from '../../components/axis';
import { Slider } from '../../components/slider';

export default makeScene2D(function* (view) {
    view.fill('#141414');

    const title = createRef<Txt>();
    const probeText = createRef<Txt>();
    const raysText = createRef<Txt>();
    const rays = createRef<Layout>();

    yield layers.setup();
    yield view.add(
        <>
            <Layout direction={'column'} padding={48} width={'100%'} height={'100%'} alignItems={'start'} justifyContent={'start'} layout>
                <Txt ref={title} fill={'#e4e4e4'} stroke={'#141414'} lineJoin={'round'} lineWidth={32} strokeFirst={true} fontFamily={'JetBrains Mono'} fontSize={60} fontWeight={800}>The What & Why</Txt>
                <Txt fill={'#848484'} stroke={'#141414'} lineJoin={'round'} lineWidth={32} strokeFirst={true} fontFamily={'JetBrains Mono'} fontSize={30} fontWeight={800}>(2D) Global Illumination</Txt>
            </Layout>
            <Layout direction={'column'} padding={48} width={'100%'} height={'100%'} alignItems={'start'} justifyContent={'end'} layout>
                <Txt fill={'#646464'} stroke={'#141414'} lineJoin={'round'} lineWidth={32} strokeFirst={true} fontFamily={'JetBrains Mono'} fontSize={30} fontStyle={'italic'} fontWeight={800}>It's cool...</Txt>
            </Layout>
            <Layout ref={rays} opacity={0} direction={'column'} padding={128} width={'100%'} height={'100%'} alignItems={'end'} justifyContent={'center'} layout>
                <Layout paddingBottom={16} width={416} justifyContent={'space-between'} layout>                
                    <Txt fill={'#949494'} fontFamily={'JetBrains Mono'} fontSize={35} fontWeight={800}>Ray(s) per Probe</Txt>
                    <Txt ref={raysText} fill={'#ffc66c'} fontFamily={'JetBrains Mono'} fontSize={35} fontWeight={800}>00</Txt>
                </Layout>
                <Slider
                    color={'#ffc66c'}
                    value={() => layers.dirCount() / (128.0 + 16.0)}
                    width={416}
                />
            </Layout>
            <Layout direction={'column'} paddingTop={640+128} width={'100%'} height={'100%'} alignItems={'center'} justifyContent={'center'} layout>
                <Txt ref={probeText} opacity={0} fill={'#949494'} fontFamily={'JetBrains Mono'} fontSize={40} fontWeight={800}>Radiance probes (Deterministic)</Txt>
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

    yield* layers.dirCount(128, 0);
    yield* all(
        title().text('How?', 1), 
        probeText().opacity(1, 1), 
        rays().opacity(1, 1)
    );

    yield* beginSlide('GI Slide');

    yield* layers.dirCount(4, 4)

    yield* beginSlide('GI Slide');

    yield* layers.dirCount(128, 4);

    yield* beginSlide('GI Slide');
});
