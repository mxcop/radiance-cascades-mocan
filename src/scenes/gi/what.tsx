import { Layout, Rect, Txt, makeScene2D } from '@motion-canvas/2d';
import { Direction, beginSlide, createRef, slideTransition } from '@motion-canvas/core';
import { Three } from '../../components/three';
import * as layers from '../../three/lights';

export default makeScene2D(function* (view) {
    view.fill('#141414');

    yield layers.setup();
    yield view.add(
        <>
            <Layout direction={'column'} padding={48} width={'100%'} height={'100%'} alignItems={'start'} justifyContent={'start'} layout>
                <Txt fill={'#e4e4e4'} stroke={'#141414'} lineJoin={'round'} lineWidth={32} strokeFirst={true} fontFamily={'JetBrains Mono'} fontSize={60} fontWeight={800}>The What & Why</Txt>
                <Txt fill={'#848484'} stroke={'#141414'} lineJoin={'round'} lineWidth={32} strokeFirst={true} fontFamily={'JetBrains Mono'} fontSize={30} fontWeight={800}>(2D) Global Illumination</Txt>
            </Layout>
            <Layout direction={'column'} padding={48} width={'100%'} height={'100%'} alignItems={'start'} justifyContent={'end'} layout>
                <Txt fill={'#646464'} stroke={'#141414'} lineJoin={'round'} lineWidth={32} strokeFirst={true} fontFamily={'JetBrains Mono'} fontSize={30} fontStyle={'italic'} fontWeight={800}>It's cool...</Txt>
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

    yield* layers.dirCount(128, 0);

    yield* slideTransition(Direction.Left);

    yield* beginSlide('GI Slide');
});
