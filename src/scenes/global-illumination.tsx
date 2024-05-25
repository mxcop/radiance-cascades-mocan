import { Layout, Rect, Txt, makeScene2D } from '@motion-canvas/2d';
import { beginSlide, createRef } from '@motion-canvas/core';
import { Three } from '../components/three';
import * as layers from '../three/lights';

export default makeScene2D(function* (view) {
    view.fill('#141414');

    const rays = createRef<Txt>();

    yield layers.setup();
    yield view.add(
        <>
            <Layout direction={'column'} padding={48} width={'100%'} height={'100%'} alignItems={'start'} justifyContent={'start'} layout>
                <Txt fill={'#e4e4e4'} stroke={'#141414'} lineJoin={'round'} lineWidth={32} strokeFirst={true} fontFamily={'JetBrains Mono'} fontSize={60} fontWeight={800}>What?</Txt>
                <Txt fill={'#848484'} stroke={'#141414'} lineJoin={'round'} lineWidth={32} strokeFirst={true} fontFamily={'JetBrains Mono'} fontSize={30} fontWeight={800}>(2D) Global Illumination</Txt>
            </Layout>
            <Layout direction={'column'} paddingTop={512+128} width={'100%'} height={'100%'} alignItems={'center'} justifyContent={'center'} layout>
                <Txt ref={rays} fill={'#949494'} fontFamily={'JetBrains Mono'} fontSize={45} fontWeight={800}> rays per pixel</Txt>
            </Layout>
            <Rect width={512} height={512} radius={16} clip={true}>
                {/* Shader */}
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
        </>
    );

    rays().text(() => `${layers.dirCount().toFixed(0)} rays per pixel`);

    yield* layers.dirCount(4, 0)

    yield* beginSlide('GI Slide');

    yield* layers.dirCount(128, 4);

    yield* beginSlide('GI Slide');
});
