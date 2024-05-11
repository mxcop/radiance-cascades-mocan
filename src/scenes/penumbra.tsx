import { Layout, Rect, Txt, makeScene2D } from '@motion-canvas/2d';
import { beginSlide, easeInOutCubic, map, tween, waitFor } from '@motion-canvas/core';
import { Three } from '../components/three';
import * as layers from '../three/penumbra';

export default makeScene2D(function* (view) {
    view.fill('#141414');

    yield layers.setup();
    yield view.add(
        <Layout>
            <Rect width={512} height={512}
                radius={16} clip={true} layout>
                <Three
                    width={512}
                    height={512}
                    resw={64}
                    resh={64}
                    camera={layers.camera}
                    scene={layers.threeScene}
                />
            </Rect>
            <Txt x={-256} y={-256} offsetX={-1} offsetY={-1} paddingLeft={24} paddingTop={18} fontFamily={'JetBrains Mono'} fontWeight={800} fontSize={30} fill={'#141414'} cache>Penumbra Theorem</Txt>
        </Layout>
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
