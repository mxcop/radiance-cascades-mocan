import { Layout, Rect, Txt, makeScene2D } from '@motion-canvas/2d';
import { Direction, beginSlide, createRef, slideTransition } from '@motion-canvas/core';
import { Three } from '../../components/three';
import * as layers from '../../three/lights';
import { SlideTitle } from '../../components/title';

export default makeScene2D(function* (view) {
    view.fill('#141414');

    const what = createRef<Layout>();
    const why = createRef<Layout>();

    yield layers.setup();
    yield view.add(
        <>
            <SlideTitle title={"The What & Why"} chapter="(2D) Global Illumination" />
            <Layout direction={'column'} padding={48} width={'100%'} height={'100%'} alignItems={'start'} justifyContent={'end'} layout>
                <Txt fill={'#646464'} stroke={'#141414'} lineJoin={'round'} lineWidth={32} strokeFirst={true} fontFamily={'JetBrains Mono'} fontSize={28} fontStyle={'italic'} fontWeight={800}>It's cool...</Txt>
            </Layout>
            <Layout ref={what} opacity={0} direction={'column'} padding={64} width={'100%'} height={'100%'} alignItems={'start'} justifyContent={'center'} layout>
                <Layout direction={'column'} width={512} height={'100%'} gap={16} justifyContent={'center'} layout>
                    <Txt fill={'#747474'} fontFamily={'IBM Plex Mono'} fontSize={28} fontWeight={700} fontStyle={'italic'}>What?</Txt>
                    <Txt fill={'#e4e4e4'} fontFamily={'IBM Plex Mono'} fontSize={28} fontWeight={700}>→ No conventional lights</Txt>
                    <Txt fill={'#e4e4e4'} fontFamily={'IBM Plex Mono'} fontSize={28} fontWeight={700}>→ Sampling radiance with probes</Txt>
                </Layout>
            </Layout>
            <Layout ref={why} opacity={0} direction={'column'} padding={64} width={'100%'} height={'100%'} alignItems={'end'} justifyContent={'center'} layout>
                <Layout direction={'column'} width={512} height={'100%'} gap={16} justifyContent={'center'} layout>
                    <Txt fill={'#747474'} fontFamily={'IBM Plex Mono'} fontSize={28} fontWeight={700} fontStyle={'italic'}>Why?</Txt>
                    <Txt fill={'#e4e4e4'} fontFamily={'IBM Plex Mono'} fontSize={28} fontWeight={700}>→ Emmisive surfaces</Txt>
                    <Txt fill={'#e4e4e4'} fontFamily={'IBM Plex Mono'} fontSize={28} fontWeight={700}>→ Stable performance</Txt>
                </Layout>
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

    yield* layers.dirCount(256, 0);

    yield* slideTransition(Direction.Right, 2.0);

    yield* beginSlide('GI Slide');

    yield* what().opacity(1, 1);

    yield* beginSlide('GI What');

    yield* why().opacity(1, 1);

    yield* beginSlide('GI Why');
});
