import { Circle, Code, Img, Layout, Line, Rect, Txt, makeScene2D } from '@motion-canvas/2d';
import { Direction, all, beginSlide, createRef, createSignal, makeRefs, slideTransition } from '@motion-canvas/core';
import { SlideTitle } from '../../components/title';
import light from '../../icons/light-white.svg';
import * as layers from '../../three/lights';
import { Three } from '../../components/three';

export default makeScene2D(function* (view) {
    view.fill('#141414');

    const drawing = createRef<Layout>();
    const proof = createRef<Rect>();
    const summary = createRef<Layout>();

    yield layers.setup();
    yield view.add(
        <>
            <SlideTitle title={"The Naive Solution"} chapter="(2D) Global Illumination" />
            <Layout direction={'column'} padding={48} width={'100%'} height={'100%'} alignItems={'start'} justifyContent={'end'} layout>
                <Txt fill={'#646464'} stroke={'#141414'} lineJoin={'round'} lineWidth={32} strokeFirst={true} fontFamily={'JetBrains Mono'} fontSize={28} fontStyle={'italic'} fontWeight={800}>Let's probe!</Txt>
            </Layout>
            <Layout ref={drawing} padding={128} width={'100%'} height={'100%'} alignItems={'center'} justifyContent={'center'} layout>
                <Rect width={800} height={640} radius={24} clip={true} alignItems={'start'} justifyContent={'center'}>
                    <Txt marginTop={64} fill={'#e4e4e4'} fontFamily={'IBM Plex Mono'} fontSize={42} fontWeight={600} fontStyle={'italic'}>Light Probes</Txt>
                    <Line layout={false}
                        lineWidth={10}
                        stroke="#e4e4e4"
                        lineCap={'round'}
                        lineJoin={'round'}
                        points={[[-286, -100], [-185, -69], [-132, -102], [-78, 1], [-99, 69], [-177, 77], [-212, 130], [-273, 40], [-334, -1], [-286, -100]]}
                    />
                    <Circle x={-256+48} size={256} lineWidth={8} stroke="#e4e4e400" layout={false}>
                        <Img width={80} height={80} src={light} />
                        <Txt x={64} y={128+64} fill={'#ee5352'} fontFamily={'IBM Plex Mono'} fontSize={28} fontWeight={700} fontStyle={'italic'} rotation={8}>↑ Complex shape</Txt>
                    </Circle>
                    <Line layout={false}
                        lineWidth={10}
                        stroke="#57c4fd"
                        lineCap={'round'}
                        lineJoin={'round'}
                        points={[[286, -39], [-103, -43]]}
                    />
                    <Line layout={false}
                        lineWidth={10}
                        stroke="#545454"
                        lineCap={'round'}
                        lineJoin={'round'}
                        points={[[286, -39], [64, 51]]}
                    />
                    <Line layout={false}
                        lineWidth={10}
                        stroke="#545454"
                        lineCap={'round'}
                        lineJoin={'round'}
                        points={[[286, -39], [163, -184]]}
                    />
                    <Rect x={0+48} y={64} size={[32, 128]} radius={6} lineWidth={8} stroke="#e4e4e4" layout={false} />
                    <Rect x={256+48} size={[32, 256]} radius={6} lineWidth={8} stroke="#e4e4e4" layout={false} />
                    <Circle position={[286, -39]} size={24} lineWidth={24} stroke="#141414" strokeFirst={true} fill="#57c4fd" layout={false} />
                </Rect>
            </Layout>
            <Layout ref={summary} opacity={0} direction={'column'} padding={64} width={'100%'} height={'100%'} alignItems={'start'} justifyContent={'center'} layout>
                <Layout direction={'column'} width={512} height={'100%'} gap={16} justifyContent={'center'} layout>
                    <Txt fill={'#747474'} fontFamily={'IBM Plex Mono'} fontSize={28} fontWeight={700} fontStyle={'italic'}>Solution</Txt>
                    <Txt fill={'#e4e4e4'} fontFamily={'IBM Plex Mono'} fontSize={28} fontWeight={700}>→ Probe light across screen</Txt>
                    <Txt fill={'#e4e4e4'} fontFamily={'IBM Plex Mono'} fontSize={28} fontWeight={700}>→ Shooting rays uniformly</Txt>
                    <Txt marginTop={32} fill={'#747474'} fontFamily={'IBM Plex Mono'} fontSize={28} fontWeight={700} fontStyle={'italic'}>Pros</Txt>
                    <Txt fill={'#e4e4e4'} fontFamily={'IBM Plex Mono'} fontSize={28} fontWeight={700}>→ Constant performance</Txt>
                    <Txt fill={'#e4e4e4'} fontFamily={'IBM Plex Mono'} fontSize={28} fontWeight={700}>→ Emissive materials</Txt>
                    <Txt marginTop={32} fill={'#747474'} fontFamily={'IBM Plex Mono'} fontSize={28} fontWeight={700} fontStyle={'italic'}>Cons</Txt>
                    <Txt fill={'#ee5352'} fontFamily={'IBM Plex Mono'} fontSize={28} fontWeight={700}>→ Very high base cost!!</Txt>
                </Layout>
            </Layout>
            <Layout ref={proof} opacity={0}>
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
                <Txt y={320+64} fill={'#e4e4e4'} fontFamily={'IBM Plex Mono'} fontSize={36} fontWeight={700} text={() => `Rays: ${layers.dirCount().toFixed(0)}`}></Txt>
            </Layout>
        </>
    );

    yield* layers.dirCount(8, 0);
    yield* layers.dirCount(4, 0);
    yield* slideTransition(Direction.Bottom, 2.0);

    yield* beginSlide('GI Slide');

    yield* summary().opacity(1, 1);

    yield* beginSlide('Summary');

    yield* all(proof().opacity(1, 1), drawing().opacity(0, 1));

    yield* beginSlide('Proof 4 rays');

    yield* layers.dirCount(128, 8);

    yield* beginSlide('Proof 128 rays');
});
