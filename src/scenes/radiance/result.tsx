import { Circle, Img, Layout, Line, QuadBezier, Rect, Spline, Txt, makeScene2D } from '@motion-canvas/2d';
import { Direction, Vector2, all, beginSlide, createComputed, createRef, createSignal, loop, slideTransition, waitFor } from '@motion-canvas/core';
import { SlideTitle } from '../../components/title';
import * as layers from '../../three/rc';
import rc from '../../images/radiance-cascades.png';
import issue from '../../images/radiance-cascades-issue.png';

export default makeScene2D(function* (view) {
    view.fill('#141414');

    const issueImg = createRef<Img>();
    const issueTxt = createRef<Layout>();
    const resultTxt = createRef<Layout>();

    yield layers.setup();
    yield view.add(
        <>
            <SlideTitle title={"Final Result"} chapter="Cascade Hierarchy" />
            <Img src={rc} width={1280} height={720} y={32} radius={16} />
            <Img ref={issueImg} opacity={0} src={issue} width={1280} height={720} y={32} radius={16} />
            <Layout ref={resultTxt} direction={'column'} padding={64} width={'100%'} height={'100%'} alignItems={'center'} justifyContent={'end'} layout>
                <Txt fill={'#e4e4e4'} fontFamily={'IBM Plex Mono'} fontSize={28} fontWeight={700} fontStyle={'italic'}>Let there be light!</Txt>
            </Layout>
            <Layout ref={issueTxt} opacity={0} direction={'column'} padding={64} width={'100%'} height={'100%'} alignItems={'center'} justifyContent={'end'} layout>
                <Txt fill={'#e4e4e4'} fontFamily={'IBM Plex Mono'} fontSize={28} fontWeight={700} fontStyle={'italic'}>Hmmm... something isn't right...</Txt>
            </Layout>
        </>
    );

    yield* slideTransition(Direction.Bottom, 2.0);

    yield* beginSlide('Result');

    yield issueImg().opacity(1.0, 2.0);
    yield* resultTxt().opacity(0.0, 1.0);
    yield* issueTxt().opacity(1.0, 1.0);
    yield* beginSlide('An Issue');
});
