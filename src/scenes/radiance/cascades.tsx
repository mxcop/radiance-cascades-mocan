import { Circle, Layout, Line, QuadBezier, Rect, Spline, Txt, makeScene2D } from '@motion-canvas/2d';
import { Direction, beginSlide, createComputed, createRef, createSignal, loop, slideTransition, waitFor } from '@motion-canvas/core';
import { SlideTitle } from '../../components/title';
import * as layers from '../../three/rc';
import { Three } from '../../components/three';

export default makeScene2D(function* (view) {
    view.fill('#141414');

    const cascadeIdx = createSignal(1);

    const probeSize = createComputed(() => Math.pow(2, cascadeIdx() + 1));

    const dataTxt = createRef<Txt>();
    const radTxt = createRef<Txt>();

    yield layers.setup();
    yield view.add(
        <>
            <SlideTitle title={"Radiance Cascades"} chapter="Cascade Hierarchy" />
            {/* Showcase */}
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
                <Txt ref={dataTxt} x={-320} offsetX={-1} y={-320} offsetY={-1} padding={32} stroke={'#141414'} lineJoin={'round'} lineWidth={16} strokeFirst={true} fill={'#e4e4e4'} fontFamily={'IBM Plex Mono'} fontSize={36} fontWeight={700}>Data Layout</Txt>
                <Txt ref={radTxt} opacity={0} x={-320} offsetX={-1} y={-320} offsetY={-1} padding={32} stroke={'#141414'} lineJoin={'round'} lineWidth={16} strokeFirst={true} fill={'#85e04c'} fontFamily={'IBM Plex Mono'} fontSize={36} fontWeight={700}>Radiance</Txt>
            </Rect>
            <Layout direction={'column'} padding={128} width={'100%'} height={'100%'} alignItems={'center'} justifyContent={'end'} layout>
                <Txt fill={'#e4e4e4'} fontFamily={'IBM Plex Mono'} fontSize={36} fontWeight={700} text={() => `Cascade ${cascadeIdx()}`}>Cascade 0</Txt>
            </Layout>
        </>
    );

    layers.probeSize(probeSize);
    layers.intervalMin(0);
    layers.intervalMax(0);

    yield* cascadeIdx(0, 0);

    yield* slideTransition(Direction.Right, 2.0);

    yield* beginSlide('Cascade 0');
    cascadeIdx(1);
    yield* beginSlide('Cascade 1');
    cascadeIdx(2);
    yield* beginSlide('Cascade 2');
    cascadeIdx(3);
    yield* beginSlide('Cascade 3');
    cascadeIdx(4);

    yield* beginSlide('Cascade 4');

    yield* dataTxt().opacity(0.0, 1.0);

    cascadeIdx(0);
    layers.intervalMin(0.0);
    layers.intervalMax(3.0);
    yield* radTxt().opacity(1.0, 1.0);
    
    yield* beginSlide('Radiance Cascade 0');
    
    cascadeIdx(1);
    layers.intervalMin(3.0);
    layers.intervalMax(3.0 * 4.0);
    yield* beginSlide('Radiance Cascade 1');
    
    cascadeIdx(2);
    layers.intervalMin(3.0 * 4.0);
    layers.intervalMax(3.0 * 4.0 * 4.0);
    yield* beginSlide('Radiance Cascade 2');
    
    cascadeIdx(3);
    layers.intervalMin(3.0 * 4.0 * 4.0);
    layers.intervalMax(3.0 * 4.0 * 4.0 * 4.0);
    yield* beginSlide('Radiance Cascade 3');
});
