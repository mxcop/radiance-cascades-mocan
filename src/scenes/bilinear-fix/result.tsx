import { Circle, Img, Layout, Line, QuadBezier, Rect, Spline, Txt, makeScene2D } from '@motion-canvas/2d';
import { Direction, Vector2, all, beginSlide, createComputed, createRef, createSignal, loop, slideTransition, waitFor } from '@motion-canvas/core';
import { SlideTitle } from '../../components/title';
import * as layers from '../../three/rc';
import correct from '../../images/correct-radiance-cascades.png';
import pretty from '../../images/radiance-cascades-pretty.png';

export default makeScene2D(function* (view) {
    view.fill('#141414');

    const prettyImg = createRef<Img>();

    yield layers.setup();
    yield view.add(
        <>
            <SlideTitle title={"Correct Result"} chapter="Bilinear Fix" />
            <Img src={correct} width={1280} height={720} y={32} radius={16} />
            <Img ref={prettyImg} src={pretty} opacity={0} width={1280} height={720} y={32} radius={16} />
            <Layout direction={'column'} padding={64} width={'100%'} height={'100%'} alignItems={'center'} justifyContent={'end'} layout>
                <Txt fill={'#e4e4e4'} fontFamily={'IBM Plex Mono'} fontSize={28} fontWeight={700} fontStyle={'italic'}>No more light ringing!</Txt>
            </Layout>
        </>
    );

    yield* slideTransition(Direction.Bottom, 2.0);

    yield* beginSlide('Result');

    yield* prettyImg().opacity(1.0, 2.0);
    yield* beginSlide('Another Result');
});
