import { Circle, Img, Layout, Line, Rect, Txt, makeScene2D } from '@motion-canvas/2d';
import { Direction, beginSlide, createRef, createSignal, slideTransition } from '@motion-canvas/core';
import { SlideTitle } from '../../components/title';
import light from '../../icons/light-white.svg';

export default makeScene2D(function* (view) {
    view.fill('#141414');

    const summary = createRef<Layout>();
    
    const switchT = createSignal<number>(1.0);

    yield view.add(
        <>
            <SlideTitle title={"The Problem"} chapter="(2D) Global Illumination" />
            <Layout direction={'column'} padding={48} width={'100%'} height={'100%'} alignItems={'start'} justifyContent={'end'} layout>
                <Txt fill={'#646464'} stroke={'#141414'} lineJoin={'round'} lineWidth={32} strokeFirst={true} fontFamily={'JetBrains Mono'} fontSize={28} fontStyle={'italic'} fontWeight={800}>We want more!</Txt>
            </Layout>
            <Layout padding={128} width={'100%'} height={'100%'} alignItems={'center'} justifyContent={'center'} layout>
                <Rect width={800} height={640} radius={24} clip={true} alignItems={'start'} justifyContent={'center'}>
                    <Txt marginTop={64} fill={'#e4e4e4'} fontFamily={'IBM Plex Mono'} fontSize={42} fontWeight={600} fontStyle={'italic'}>Area lights</Txt>
                    <Line layout={false}
                        x={48}
                        lineWidth={10}
                        lineDash={[20, 30]}
                        stroke="#646464"
                        lineCap={'round'}
                        points={[[-140, 60], [241, -125]]}
                    />
                    <Line layout={false}
                        lineWidth={10}
                        lineDash={[20, 30]}
                        stroke="#646464"
                        lineCap={'round'}
                        points={[[-131, -95], [289, 118]]}
                    />
                    <Line opacity={() => 1.0 - switchT()} layout={false}
                        lineWidth={10}
                        stroke="#e4e4e4"
                        lineCap={'round'}
                        lineJoin={'round'}
                        points={[[-286, -100], [-185, -69], [-132, -102], [-78, 1], [-99, 69], [-177, 77], [-212, 130], [-273, 40], [-334, -1], [-286, -100]]}
                    />
                    <Circle opacity={switchT} x={-256+48} size={256} lineWidth={8} stroke="#e4e4e4" layout={false}>
                        <Img width={80} height={80} src={light} />
                        <Txt opacity={switchT} x={64} y={128+64} fill={'#57c4fd'} fontFamily={'IBM Plex Mono'} fontSize={28} fontWeight={700} fontStyle={'italic'} rotation={8}>↑ Simple shape</Txt>
                    </Circle>
                    <Circle opacity={() => 1.0 - switchT()} x={-256+48} size={256} lineWidth={8} stroke="#e4e4e400" layout={false}>
                        <Img width={80} height={80} src={light} />
                        <Txt x={64} y={128+64} fill={'#ee5352'} fontFamily={'IBM Plex Mono'} fontSize={28} fontWeight={700} fontStyle={'italic'} rotation={8}>↑ Complex shape</Txt>
                    </Circle>
                    <Rect x={0+48} y={64} size={[32, 128]} radius={6} lineWidth={8} stroke="#e4e4e4" layout={false} />
                    <Rect x={256+48} size={[32, 256]} radius={6} lineWidth={8} stroke="#e4e4e4" layout={false} />
                </Rect>
            </Layout>
            <Layout ref={summary} opacity={0} direction={'column'} padding={64} width={'100%'} height={'100%'} alignItems={'start'} justifyContent={'center'} layout>
                <Layout direction={'column'} width={512} height={'100%'} gap={16} justifyContent={'center'} layout>
                    <Txt fill={'#747474'} fontFamily={'IBM Plex Mono'} fontSize={28} fontWeight={700} fontStyle={'italic'}>Problems</Txt>
                    <Txt fill={'#e4e4e4'} fontFamily={'IBM Plex Mono'} fontSize={28} fontWeight={700}>→ Complex light shapes</Txt>
                    <Txt fill={'#e4e4e4'} fontFamily={'IBM Plex Mono'} fontSize={28} fontWeight={700}>→ Textured light sources</Txt>
                    <Txt fill={'#e4e4e4'} fontFamily={'IBM Plex Mono'} fontSize={28} fontWeight={700}>→ More lights = more cost</Txt>
                </Layout>
            </Layout>
        </>
    );

    yield* slideTransition(Direction.Right, 2.0);

    yield* beginSlide('GI Slide');

    yield* switchT(0, 1);

    yield* beginSlide('Complex Lights');

    yield* summary().opacity(1, 1);

    yield* beginSlide('Summary');
});
