import { Circle, Line, Rect, Txt, makeScene2D } from '@motion-canvas/2d';
import { beginSlide, easeInOutCubic, map, tween, waitFor } from '@motion-canvas/core';
import { Three } from '../components/three';
import * as layers from '../three/penumbra';

export default makeScene2D(function* (view) {
    view.fill('#141414');

    yield layers.setup();
    yield view.add(
        <Rect width={512} height={512} radius={16} clip={true}>
            <Line points={[[16, -64], [512, 128+16]]} x={-256} lineWidth={8} lineDash={[12, 24]} lineCap={'round'} stroke={'#343434'} />
            <Line points={[[16, 64], [512, -128-16]]} x={-256} lineWidth={8} lineDash={[12, 24]} lineCap={'round'} stroke={'#343434'} />
            <Txt x={128} y={0} fontFamily={'JetBrains Mono'} fontWeight={800} fontSize={30} fill={'#545454'}>PENUMBRA</Txt>
            <Txt x={48} y={152} fontFamily={'JetBrains Mono'} fontWeight={800} fontSize={30} fill={'#545454'}>UMBRA</Txt>
            <Txt x={48} y={-152} fontFamily={'JetBrains Mono'} fontWeight={800} fontSize={30} fill={'#545454'}>LIGHT</Txt>
            <Line points={[[384, 90], [384, -90]]} x={-256} lineWidth={8} lineCap={'round'} stroke={'#57c4fd'} />
            <Circle x={-256+384} y={90} size={24} lineWidth={8} stroke={'#141414'} fill={'#57c4fd'} />
            <Circle x={-256+384} y={-90} size={24} lineWidth={8} stroke={'#141414'} fill={'#57c4fd'} />
            <Three
                width={512}
                height={512}
                resw={64}
                resh={64}
                camera={layers.camera}
                scene={layers.threeScene}
                layout={false}
            />
        </Rect>
    );
    yield* beginSlide('Penumbra Slide');
    yield*
        tween(5, value => {
            layers.dirCount(map(360, 4, easeInOutCubic(value)));
        });
    yield* waitFor(1);
    yield*
        tween(5, value => {
            layers.dirCount(map(4, 360, easeInOutCubic(value)));
        });
    yield* waitFor(1);
});
