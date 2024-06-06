import { Circle, Layout, Line, QuadBezier, Rect, Spline, Txt, makeScene2D } from '@motion-canvas/2d';
import { Direction, beginSlide, createComputed, createRef, createSignal, slideTransition } from '@motion-canvas/core';
import { SlideTitle } from '../../components/title';
import * as layers from '../../three/cascade';
import { Three } from '../../components/three';

export default makeScene2D(function* (view) {
    view.fill('#141414');

    yield layers.setup();
    yield view.add(
        <>
            <SlideTitle title={"Spatial Observation"} chapter="Penumbra Theorem" />
            {/* Showcase */}
            <Rect width={1280} height={640} radius={16} clip={true}>
                {/* Shader */}
                <Three
                    width={1280}
                    height={640}
                    resw={128}
                    resh={64}
                    camera={layers.camera}
                    scene={layers.threeScene}
                    layout={false}
                />
            </Rect>
            {/* Observation */}
            <Layout direction={'column'} padding={128} width={'100%'} height={'100%'} alignItems={'end'} justifyContent={'center'} layout>
                <Layout direction={'column'} width={512} height={'100%'} gap={16} justifyContent={'center'} layout>
                    <Txt fill={'#747474'} fontFamily={'IBM Plex Mono'} fontSize={28} fontWeight={700} fontStyle={'italic'}>Observation:</Txt>
                    <Txt fill={'#e4e4e4'} fontFamily={'IBM Plex Mono'} fontSize={28} fontWeight={700}>The number of probes we need</Txt>
                    <Txt fill={'#e4e4e4'} fontFamily={'IBM Plex Mono'} fontSize={28} fontWeight={700}>Is proportional to the distance</Txt>
                    <Txt fill={'#e4e4e4'} fontFamily={'IBM Plex Mono'} fontSize={28} fontWeight={700}>From the light we are sampling.</Txt>
                </Layout>
            </Layout>
        </>
    );

    yield* slideTransition(Direction.Right, 2.0);

    yield* beginSlide('Radiance Cascades');
});
