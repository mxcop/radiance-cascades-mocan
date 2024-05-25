import { Layout, Rect, Txt, makeScene2D } from '@motion-canvas/2d';
import { Direction, beginSlide, createRef, slideTransition } from '@motion-canvas/core';
import { Three } from '../../components/three';
import * as layers from '../../three/lights';
import { SlideTitle } from '../../components/title';

export default makeScene2D(function* (view) {
    view.fill('#141414');

    yield layers.setup();
    yield view.add(
        <>
            <SlideTitle title={"The What & Why"} chapter="(2D) Global Illumination" />
            <Layout direction={'column'} padding={48} width={'100%'} height={'100%'} alignItems={'start'} justifyContent={'end'} layout>
                <Txt fill={'#646464'} stroke={'#141414'} lineJoin={'round'} lineWidth={32} strokeFirst={true} fontFamily={'JetBrains Mono'} fontSize={28} fontStyle={'italic'} fontWeight={800}>It's cool...</Txt>
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

    yield* slideTransition(Direction.Right);

    yield* beginSlide('GI Slide');
});
