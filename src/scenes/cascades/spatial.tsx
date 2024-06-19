import { Circle, Layout, Node, Txt, makeScene2D } from '@motion-canvas/2d';
import { Direction, Vector2, beginSlide, createRef, createSignal, slideTransition, tween, waitFor } from '@motion-canvas/core';
import { Probe } from '../../components/probe';
import { SlideTitle } from '../../components/title';

export default makeScene2D(function* (view) {
    view.fill('#141414');

    const naiveProbes = createRef<Layout>();
    const betterProbes = createRef<Layout>();
    
    const spatialOb = createRef<Layout>();
    const cascadeOb = createRef<Layout>();

    const probeSpacing = 128 + 32;

    view.add(
        <>
        <Layout direction={'column'} padding={128} width={'25%'} height={'100%'} alignItems={'start'} justifyContent={'end'} layout>
            <Txt fill={'#747474'} stroke={'#141414'} lineJoin={'round'} lineWidth={16} strokeFirst={true} fontFamily={'IBM Plex Mono'} fontSize={28} fontWeight={700} fontStyle={'italic'} rotation={-8}>↑ 2x2 pixels</Txt>
        </Layout>
        <SlideTitle title={"Spatial"} chapter="Exploiting Observations" />
        <Layout direction={'column'} padding={128} width={'100%'} height={'100%'} alignItems={'end'} justifyContent={'center'} layout>
            <Layout ref={spatialOb} direction={'column'} width={512} height={'100%'} gap={16} justifyContent={'center'} layout>
                <Txt fill={'#747474'} fontFamily={'IBM Plex Mono'} fontSize={28} fontWeight={700} fontStyle={'italic'}>Spatial Observation:</Txt>
                <Txt fill={'#e4e4e4'} fontFamily={'IBM Plex Mono'} fontSize={28} fontWeight={700}>The number of <Txt fill={'#57c4fd'} fontFamily={'IBM Plex Mono'} fontSize={28} fontWeight={700}>probes</Txt> we need</Txt>
                <Txt fill={'#e4e4e4'} fontFamily={'IBM Plex Mono'} fontSize={28} fontWeight={700}>Is proportional to the <Txt fill={'#57c4fd'} fontFamily={'IBM Plex Mono'} fontSize={28} fontWeight={700}>distance</Txt></Txt>
                <Txt fill={'#e4e4e4'} fontFamily={'IBM Plex Mono'} fontSize={28} fontWeight={700}>From the light we are sampling.</Txt>
            </Layout>
        </Layout>
        <Layout x={-320}>
            <Probe x={-probeSpacing} y={-probeSpacing} color={'#85e04c'} interval={new Vector2(0, 64)} directions={4} lineWidth={10} />
            <Probe x={probeSpacing} y={-probeSpacing} color={'#85e04c'} interval={new Vector2(0, 64)} directions={4} lineWidth={10} />
            <Probe x={-probeSpacing} y={probeSpacing} color={'#85e04c'} interval={new Vector2(0, 64)} directions={4} lineWidth={10} />
            <Probe x={probeSpacing} y={probeSpacing} color={'#85e04c'} interval={new Vector2(0, 64)} directions={4} lineWidth={10} />
        </Layout>
        <Layout ref={naiveProbes} x={-320}>
            <Probe x={-probeSpacing} y={-probeSpacing} color={'#57c4fd'} interval={new Vector2(64, 64+128)} directions={16} lineWidth={10} />
            <Probe x={probeSpacing} y={-probeSpacing} color={'#57c4fd'} interval={new Vector2(64, 64+128)} directions={16} lineWidth={10} />
            <Probe x={-probeSpacing} y={probeSpacing} color={'#57c4fd'} interval={new Vector2(64, 64+128)} directions={16} lineWidth={10} />
            <Probe x={probeSpacing} y={probeSpacing} color={'#57c4fd'} interval={new Vector2(64, 64+128)} directions={16} lineWidth={10} />
        </Layout>
        <Layout ref={betterProbes} opacity={0} x={-320}>
            <Probe x={0} y={0} color={'#57c4fd'} interval={new Vector2(64, 64+256)} directions={16} lineWidth={10} />
        </Layout>
        <Layout direction={'column'} padding={128} width={'100%'} height={'100%'} alignItems={'end'} justifyContent={'center'} layout>
            <Layout ref={cascadeOb} opacity={0} direction={'column'} marginTop={256+64} width={512} height={'100%'} gap={16} justifyContent={'center'} layout>
                <Txt fill={'#747474'} fontFamily={'IBM Plex Mono'} fontSize={28} fontWeight={700} fontStyle={'italic'}>Cascade Observation:</Txt>
                <Txt fill={'#e4e4e4'} fontFamily={'IBM Plex Mono'} fontSize={28} fontWeight={700}>The number of <Txt fill={'#85e04c'} fontFamily={'IBM Plex Mono'} fontSize={28} fontWeight={700}>rays</Txt> within</Txt>
                <Txt fill={'#e4e4e4'} fontFamily={'IBM Plex Mono'} fontSize={28} fontWeight={700}>Each cascade remains <Txt fill={'#85e04c'} fontFamily={'IBM Plex Mono'} fontSize={28} fontWeight={700}>equal</Txt></Txt>
                <Txt fill={'#e4e4e4'} fontFamily={'IBM Plex Mono'} fontSize={28} fontWeight={700}>Across all cascade levels.</Txt>
                <Txt fill={'#848484'} fontFamily={'IBM Plex Mono'} fontSize={28} fontWeight={700} fontStyle={'italic'}>(With branch factor 2)</Txt>
            </Layout>
        </Layout>
        </>
    );

    yield* slideTransition(Direction.Bottom, 2.0);

    yield* beginSlide('Exploit Spatial');

    yield* naiveProbes().opacity(0.0, 1.0);
    yield* betterProbes().opacity(1.0, 1.0);

    yield* beginSlide('Less Probes!');

    yield spatialOb().margin([0, 0, 256, 0], 2.0);
    yield* waitFor(1.0);
    yield* cascadeOb().opacity(1.0, 1.0);

    yield* beginSlide('Cascade Observation!');
});
