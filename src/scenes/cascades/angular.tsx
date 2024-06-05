import { Circle, Layout, Node, Txt, makeScene2D } from '@motion-canvas/2d';
import { Direction, Vector2, beginSlide, createRef, createSignal, slideTransition, tween } from '@motion-canvas/core';
import { Probe } from '../../components/probe';
import { SlideTitle } from '../../components/title';

export default makeScene2D(function* (view) {
    view.fill('#141414');

    const naiveProbeSize = createSignal(80 * 3 * 3);
    const naiveProbe = createRef<Probe>();

    const nextRing = createRef<Layout>();
    const branchFactor = createRef<Layout>();

    view.add(
        <>
        {/* Probe sizes */}
        <Layout ref={branchFactor} opacity={0} x={-720 + 64 + 16}>
            <Probe y={-256} color={'#85e04c'} interval={new Vector2(0, 100)} directions={4} lineWidth={10} />
            <Txt x={-152} y={-256} fill={'#85e04c'} fontFamily={'IBM Plex Mono'} fontSize={42} fontWeight={700}>4</Txt>
            <Probe color={'#57c4fd'} interval={new Vector2(0, 100)} directions={4 * 2} lineWidth={10} />
            <Txt x={-152} fill={'#57c4fd'} fontFamily={'IBM Plex Mono'} fontSize={42} fontWeight={700}>8</Txt>
            <Probe y={256} color={'#f85789'} interval={new Vector2(0, 100)} directions={4 * 2 * 2} lineWidth={10} />
            <Txt x={-152} y={256} fill={'#f85789'} fontFamily={'IBM Plex Mono'} fontSize={42} fontWeight={700}>16</Txt>
        </Layout>
        <Layout direction={'column'} padding={128} width={'20%'} height={'100%'} alignItems={'start'} justifyContent={'end'} layout>
            <Txt fill={'#747474'} stroke={'#141414'} lineJoin={'round'} lineWidth={16} strokeFirst={true} fontFamily={'IBM Plex Mono'} fontSize={28} fontWeight={700} fontStyle={'italic'} rotation={-8}>↑ Visual of a probe</Txt>
        </Layout>
        <SlideTitle title={"Rings of rays?"} chapter="Exploiting Observations" />
        <Layout direction={'column'} padding={128} width={'100%'} height={'100%'} alignItems={'end'} justifyContent={'center'} layout>
            <Layout direction={'column'} width={512} height={'100%'} gap={16} justifyContent={'center'} layout>
                <Txt fill={'#747474'} fontFamily={'IBM Plex Mono'} fontSize={28} fontWeight={700} fontStyle={'italic'}>Angular Observation:</Txt>
                <Txt fill={'#e4e4e4'} fontFamily={'IBM Plex Mono'} fontSize={28} fontWeight={700}>The number of <Txt fill={'#57c4fd'} fontFamily={'IBM Plex Mono'} fontSize={28} fontWeight={700}>rays</Txt> we need</Txt>
                <Txt fill={'#e4e4e4'} fontFamily={'IBM Plex Mono'} fontSize={28} fontWeight={700}>Is proportional to the <Txt fill={'#57c4fd'} fontFamily={'IBM Plex Mono'} fontSize={28} fontWeight={700}>distance</Txt></Txt>
                <Txt fill={'#e4e4e4'} fontFamily={'IBM Plex Mono'} fontSize={28} fontWeight={700}>From the light we are sampling.</Txt>
            </Layout>
        </Layout>
        <Layout x={-128}>
            <Circle 
                size={naiveProbeSize} 
                lineWidth={10}
                stroke="#848484"
                lineCap={'round'} 
            />
            <Probe ref={naiveProbe} color="e4e4e4" interval={() => new Vector2(0, naiveProbeSize() * 0.5 - 32.0)} directions={16} lineWidth={10} />
        </Layout>
        <Layout ref={nextRing} opacity={0} x={-128}>
            <Circle 
                size={80 * 8} 
                lineWidth={10}
                stroke="#57c4fd"
                lineCap={'round'} 
            />
            <Probe color="57c4fd" interval={() => new Vector2(80.0 + 32.0, 80.0 * 4.0 - 32.0)} directions={16} lineWidth={10} />
        </Layout>
        {/* Ray rings (Cascades) */}
        <Layout x={-128} opacity={0}>
            <Circle 
                size={80} 
                lineWidth={10}
                stroke="#85e04c"
                lineCap={'round'} 
            />
            <Circle 
                size={80 * 3} 
                lineWidth={10}
                stroke="#57c4fd"
                lineCap={'round'} 
            />
            <Circle 
                size={80 * 3 * 3} 
                lineWidth={10}
                stroke="#f85789"
                lineCap={'round'} 
            />
        </Layout>
        </>
    );

    yield* slideTransition(Direction.Right, 2.0);

    yield* beginSlide('Exploit Angular');

    yield naiveProbeSize(80 * 2, 2.0);
    yield* tween(2.0, (t) => {
        naiveProbe().set_directions(4 + 12 * (1.0 - t));
    });

    yield* beginSlide('Smaller Interval');

    yield* nextRing().opacity(1.0, 2.0);

    yield* beginSlide('Next Ring');

    yield* branchFactor().opacity(1.0, 2.0);

    yield* beginSlide('Branch Factor');
});
