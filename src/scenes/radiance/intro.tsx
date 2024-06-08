import { Circle, Icon, Img, Layout, Txt, makeScene2D } from '@motion-canvas/2d';
import { Direction, Vector2, all, beginSlide, createRef, createSignal, loop, slideTransition, waitFor } from '@motion-canvas/core';

export default makeScene2D(function* (view) {
    view.fill('#141414');

    yield view.add(
        <>
            <Layout direction={'column'} padding={32} width={'100%'} height={'100%'} alignItems={'center'} justifyContent={'center'} layout>
                <Txt text={"Cascade Hierarchy"} fill={'#e4e4e4'} stroke={'#141414'} lineJoin={'round'} lineWidth={32} strokeFirst={true} fontFamily={'JetBrains Mono'} fontSize={60} fontWeight={800} />
                <Txt text={"Fission and Fusion"} marginTop={32} fill={'#848484'} stroke={'#141414'} lineJoin={'round'} lineWidth={32} strokeFirst={true} fontFamily={'JetBrains Mono'} fontSize={30} fontWeight={800} />
            </Layout>
        </>
    );

    yield* slideTransition(Direction.Right, 2.0);

    yield* beginSlide('Intro Slide');
});
