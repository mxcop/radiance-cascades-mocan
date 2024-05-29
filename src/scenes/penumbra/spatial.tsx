import { Line, QuadBezier, Spline, Txt, makeScene2D } from '@motion-canvas/2d';
import { Direction, beginSlide, slideTransition } from '@motion-canvas/core';
import { SlideTitle } from '../../components/title';

export default makeScene2D(function* (view) {
    view.fill('#141414');

    const sf: number = 128.0; /* Scale factor */ 

    yield view.add(
        <>
            <SlideTitle title={"Spatial Observation"} chapter="Penumbra Theorem" />
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
        </>
    );

    yield* slideTransition(Direction.Bottom, 2.0);

    yield* beginSlide('GI Slide');
});
