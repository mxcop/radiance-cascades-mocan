import { Circle, Layout, Line, QuadBezier, Rect, Spline, Txt, makeScene2D } from '@motion-canvas/2d';
import { Direction, beginSlide, createComputed, createRef, createSignal, slideTransition } from '@motion-canvas/core';
import { SlideTitle } from '../../components/title';
import * as layers from '../../three/spatial';
import { Three } from '../../components/three';

export default makeScene2D(function* (view) {
    view.fill('#141414');

    const sf: number = 128.0; /* Scale factor */ 

    const spline = createRef<Spline>();
    const progress = createSignal(0.34);
    const sampleOpacity = createSignal(0.0);

    const incline = createComputed(() => {
        return spline().getPointAtPercentage(progress()).normal.flipped.perpendicular;
    });
    const samplePoint = createComputed(() => {
        return spline().getPointAtPercentage(progress()).position;
    });
    const angle = createComputed(() => `${incline().degrees.toFixed()}°`);
    
    const showcase = createSignal(0.0);

    yield layers.setup();
    yield view.add(
        <>
            <SlideTitle title={"Spatial Observation"} chapter="Penumbra Theorem" />
            {/* <Layout opacity={() => 1.0 - showcase()}> */}
            <Layout opacity={0.0}>
            {/* Axis lines */}
            <Line 
                position={[-sf * 2.0, sf * 2.0]}
                lineWidth={10}
                stroke="#343434"
                lineCap={'round'}
                points={[
                    [0, sf * -4],
                    [0, 0]
                ]}
            />
            <Txt position={[-sf * 2.0 - sf * 0.3, 0]} fill={'#747474'} fontFamily={'IBM Plex Mono'} fontSize={36} fontWeight={700} rotation={90}>Radiance</Txt>
            <Line 
                position={[-sf * 2.0, sf * 2.0]}
                lineWidth={10}
                stroke="#343434"
                lineCap={'round'}
                points={[
                    [0, 0],
                    [sf * 4, 0]
                ]}
            />
            <Txt position={[0, sf * 2.0 + sf * 0.3]} fill={'#747474'} fontFamily={'IBM Plex Mono'} fontSize={36} fontWeight={700}>Distance</Txt>
            <Txt position={[-sf * 2.0 - sf * 0.2, sf * 2.0 + sf * 0.2]} fill={'#747474'} fontFamily={'IBM Plex Mono'} fontSize={36} fontWeight={700}>0</Txt>
            {/* [1,1] */}
            <Line 
                position={[-sf * 2.0, sf * 2.0]}
                lineWidth={10}
                stroke="#343434"
                lineDash={[12, 24]}
                lineCap={'round'}
                points={[
                    [0, -sf],
                    [sf, -sf],
                    [sf, 0]
                ]}
            />
            <Txt position={[-sf * 2.0 + sf * 0.55, sf * 2.0 - sf * 0.75]} fill={'#747474'} fontFamily={'IBM Plex Mono'} fontSize={28} fontWeight={700}>[1,1]</Txt>
            {/* Graph */}
            <Spline
                ref={spline}
                position={[-sf * 2.0, sf * 2.0]}
                lineWidth={10}
                stroke="#57c4fd"
                lineCap={'round'}
                smoothness={0.4}
                points={[
                    [sf * 0.25, sf * -4],
                    [sf * 1,    sf * -1],
                    [sf * 4,    sf * -0.25],
                ]}
            />
            {/* Close sample */}
            <Line 
                opacity={sampleOpacity}
                position={[-sf * 2.0, sf * 2.0]}
                lineWidth={28}
                stroke="#141414"
                lineCap={'round'}
                points={[
                    () => [samplePoint().x, samplePoint().y],
                    () => [samplePoint().x, 0.0]
                ]}
            />
            <Circle
                opacity={sampleOpacity}
                size={26}
                fill="#57c4fd"
                lineWidth={24}
                stroke="#141414"
                strokeFirst={true}
                position={() => [samplePoint().x - sf * 2.0, samplePoint().y + sf * 2.0]}
            >
                <Line 
                    lineWidth={28}
                    stroke="#141414"
                    lineCap={'round'}
                    points={[
                        () => [-64, 0],
                        () => [64, 0]
                    ]}
                    rotation={() =>
                        incline().degrees
                    }
                />
                <Line 
                    lineWidth={10}
                    stroke="#85e04c"
                    lineCap={'round'}
                    points={[
                        () => [-64, 0],
                        () => [64, 0]
                    ]}
                    rotation={() =>
                        incline().degrees
                    }
                />
                <Txt 
                    fill={'#85e04c'} fontFamily={'IBM Plex Mono'} fontSize={36} fontWeight={700} fontStyle={'italic'}
                    text={angle} 
                    position={() => spline().getPointAtPercentage(progress()).normal.mul(52.0)} 
                />
            </Circle>
            <Line 
                opacity={sampleOpacity}
                position={[-sf * 2.0, sf * 2.0]}
                lineWidth={10}
                stroke="#85e04c"
                lineCap={'round'}
                points={[
                    () => [samplePoint().x, samplePoint().y],
                    () => [samplePoint().x, 0.0]
                ]}
            />
            </Layout>
            {/* Showcase */}
            <Rect opacity={showcase} width={1280} height={640} radius={16} clip={true}>
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
            <Layout opacity={() => showcase() - 1.0} direction={'column'} padding={128} width={'100%'} height={'100%'} alignItems={'end'} justifyContent={'center'} layout>
                <Layout direction={'column'} width={512} height={'100%'} gap={16} justifyContent={'center'} layout>
                    <Txt fill={'#747474'} fontFamily={'IBM Plex Mono'} fontSize={28} fontWeight={700} fontStyle={'italic'}>Observation:</Txt>
                    <Txt fill={'#e4e4e4'} fontFamily={'IBM Plex Mono'} fontSize={28} fontWeight={700}>The number of probes we need</Txt>
                    <Txt fill={'#e4e4e4'} fontFamily={'IBM Plex Mono'} fontSize={28} fontWeight={700}>Is proportional to the distance</Txt>
                    <Txt fill={'#e4e4e4'} fontFamily={'IBM Plex Mono'} fontSize={28} fontWeight={700}>From the light we are sampling.</Txt>
                </Layout>
            </Layout>
        </>
    );

    yield* slideTransition(Direction.Bottom, 2.0);

    yield* beginSlide('GI Slide');

    // yield* progress(0.35, 0.0);
    // yield* sampleOpacity(1.0, 1.0);

    // yield* beginSlide('Large incline');

    // yield* progress(0.7, 4.0);
    
    // yield* beginSlide('Small incline');
    
    yield* showcase(1.0, 2.0);
    
    yield* beginSlide('Showcase');

    yield* showcase(2.0, 2.0);
    
    yield* beginSlide('Observation');
});
