import { Circle, Layout, Line, QuadBezier, Rect, Spline, Txt, makeScene2D } from '@motion-canvas/2d';
import { Direction, Vector2, all, beginSlide, createComputed, createRef, createSignal, loop, slideTransition, waitFor } from '@motion-canvas/core';
import { SlideTitle } from '../../components/title';
import * as layers from '../../three/rc';
import { Three } from '../../components/three';
import { Probe } from '../../components/probe';

export default makeScene2D(function* (view) {
    view.fill('#141414');

    const cascadeIdx = createSignal(1);

    const probeSize = createComputed(() => Math.pow(2, cascadeIdx() + 1));

    const dataTxt = createRef<Txt>();
    const radTxt = createRef<Txt>();
    const probe = createRef<Probe>();
    const showcase = createRef<Rect>();

    yield layers.setup();
    yield view.add(
        <>
            <SlideTitle title={"Radiance Cascades"} chapter="Cascade Hierarchy" />
            {/* Showcase */}
            <Rect ref={showcase} x={-256} width={640} height={640} radius={16} clip={true}>
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
                <Txt ref={dataTxt} x={-320} offsetX={-1} y={-320} offsetY={-1} padding={32} stroke={'#141414'} lineJoin={'round'} lineWidth={16} strokeFirst={true} fill={'#e4e4e4'} fontFamily={'IBM Plex Mono'} fontSize={36} fontWeight={700}>Cascade Layout</Txt>
                <Txt ref={radTxt} opacity={0} x={-320} offsetX={-1} y={-320} offsetY={-1} padding={32} stroke={'#141414'} lineJoin={'round'} lineWidth={16} strokeFirst={true} fill={'#85e04c'} fontFamily={'IBM Plex Mono'} fontSize={36} fontWeight={700}>Radiance</Txt>
            </Rect>
            <Layout direction={'column'} padding={128} width={'100%'} height={'100%'} alignItems={'center'} justifyContent={'end'} layout>
                <Txt fill={'#e4e4e4'} fontFamily={'IBM Plex Mono'} fontSize={36} fontWeight={700} text={() => `Cascade ${cascadeIdx()}`}>Cascade 0</Txt>
            </Layout>
            <Probe x={256+128} ref={probe} color="#85e04c" interval={new Vector2(0, 128+64)} directions={4} />
        </>
    );

    layers.probeSize(probeSize);
    layers.intervalMin(0);
    layers.intervalMax(0);

    yield* cascadeIdx(0, 0);

    yield* slideTransition(Direction.Bottom, 2.0);

    yield* beginSlide('Cascade 0');
    cascadeIdx(1);
    yield* probe().interval(new Vector2(48, 128+64), 0.0);
    probe().set_directions(4 * 4);
    yield* beginSlide('Cascade 1');
    cascadeIdx(2);
    yield* probe().interval(new Vector2(96, 128+64), 0.0);
    probe().set_directions(4 * 4 * 4);
    yield* beginSlide('Cascade 2');
    yield* all(probe().opacity(0.0, 0.5), showcase().x(0, 1.0));
    cascadeIdx(3);
    yield* beginSlide('Cascade 3');
    cascadeIdx(4);

    yield* beginSlide('Cascade 4');

    yield* all(
        dataTxt().opacity(0.0, 1.0),
        showcase().opacity(0, 1)
    );

    cascadeIdx(0);
    layers.intervalMin(0.0);
    layers.intervalMax(3.0);
    
    yield* all(
        radTxt().opacity(1.0, 1.0),
        showcase().opacity(1, 1)
    );

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
