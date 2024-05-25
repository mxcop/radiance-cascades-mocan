import { Circle, Icon, Img, Layout, Txt, makeScene2D } from '@motion-canvas/2d';
import { Direction, Vector2, all, beginSlide, createRef, createSignal, loop, slideTransition, waitFor } from '@motion-canvas/core';
import { SlideTitle } from '../../components/title';
import { Probe } from '../../components/probe';
import light from '../../icons/light.svg';

export default makeScene2D(function* (view) {
    view.fill('#141414');

    const spacing = createSignal<number>(48.0);

    const probe = createRef<Probe>();
    const probeBg = createRef<Probe>();
    const probeInner = createRef<Probe>();
    const lightSource = createRef<Circle>();
    const marker = createRef<Txt>();
    const observe = createRef<Layout>();

    yield view.add(
        <>
            <SlideTitle title={"Angular Observation"} chapter="Penumbra Theorem" />
            <Probe ref={probeBg} color="#343434" interval={new Vector2(0, 512)} directions={16} />
            <Probe ref={probe} color="#57c4fd" interval={new Vector2(0, 256)} directions={16} />
            <Circle ref={lightSource} x={() => -spacing() * 2.0} size={64} fill="#ffc66c" clip>
                <Probe ref={probeInner} x={() => spacing() * 2.0} color="#ee5352" interval={new Vector2(0, 512)} directions={16} />
                <Img width={48} height={48} src={light} />
            </Circle>
            <Txt ref={marker} opacity={0} x={() => -spacing() * 2.0 - 48} fill={'#ee5352'} fontFamily={'JetBrains Mono'} fontSize={48} fontWeight={800}>!</Txt>
            <Layout ref={observe} opacity={0} direction={'column'} padding={32} width={'100%'} height={'100%'} alignItems={'end'} justifyContent={'center'} layout>
                <Layout direction={'column'} width={512} height={'100%'} gap={16} justifyContent={'center'} layout>
                    <Txt fill={'#747474'} fontFamily={'IBM Plex Mono'} fontSize={28} fontWeight={700} fontStyle={'italic'}>Observation:</Txt>
                    <Txt fill={'#e4e4e4'} fontFamily={'IBM Plex Mono'} fontSize={28} fontWeight={700}>The number of rays we need</Txt>
                    <Txt fill={'#e4e4e4'} fontFamily={'IBM Plex Mono'} fontSize={28} fontWeight={700}>Is proportional to the distance</Txt>
                    <Txt fill={'#e4e4e4'} fontFamily={'IBM Plex Mono'} fontSize={28} fontWeight={700}>From the light we are sampling.</Txt>
                </Layout>
            </Layout>
        </>
    );

    yield* slideTransition(Direction.Right, 2.0);

    yield* beginSlide('Angular Slide');

    yield spacing(128.0, 2);
    yield* waitFor(1.0);
    yield* all(
        lightSource().fill("#ee5352", 1),
        marker().opacity(1, 1)
    );

    yield* beginSlide('Light Away');

    yield* loop(15, (i) => {
        // probe().interval(new Vector2(0, 256 + 16 * i));
        probe().set_directions(16 + i);
        // probeInner().interval(new Vector2(0, 256 + 16 * i));
        probeInner().set_directions(16 + i);
        // probeBg().interval(new Vector2(0, 256 + 16 * i));
        probeBg().set_directions(16 + i);
        return waitFor(0.1);
    });

    yield* all(
        lightSource().fill("#ffc66c", 1),
        marker().opacity(0, 1)
    );

    yield* beginSlide('Increase Dirs');

    yield spacing(192.0, 2);
    yield* waitFor(1.0);
    yield* all(
        lightSource().fill("#ee5352", 1),
        marker().opacity(1, 1)
    );

    yield* beginSlide('Light Away Again');

    yield* observe().opacity(1, 2);

    yield* beginSlide('Angular Observation');
});
