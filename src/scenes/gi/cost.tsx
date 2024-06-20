import { Layout, Node, Txt, makeScene2D } from '@motion-canvas/2d';
import { Direction, Reference, Vector2, beginSlide, createRef, slideTransition } from '@motion-canvas/core';
import { Probe } from '../../components/probe';
import { SlideTitle } from '../../components/title';

function* fadeIn(ref: Reference<Txt>, node: Node) {
    ref().add(node);
    yield* node.opacity(1, 0.5);
};

export default makeScene2D(function* (view) {
    view.fill('#141414');

    const aprox_txt = createRef<Txt>();
    const probe_0 = createRef<Probe>();
    const probe_1 = createRef<Probe>();

    view.add(
        <>
        <Layout x={-512 + 64 + 16}>
            <Probe ref={probe_0} hide color={'#242424'} interval={new Vector2(0, 512)} directions={36} lineWidth={12} />
            <Probe ref={probe_1} hide color={'#57c4fd'} interval={new Vector2(0, 256)} directions={12} lineWidth={12} />
        </Layout>
        <Layout direction={'column'} padding={64} width={'60%'} height={'100%'} alignItems={'start'} justifyContent={'end'} layout>
            <Txt fill={'#747474'} stroke={'#141414'} lineJoin={'round'} lineWidth={16} strokeFirst={true} fontFamily={'IBM Plex Mono'} fontSize={28} fontWeight={700} fontStyle={'italic'} rotation={-8}>↑ Visual of a probe</Txt>
        </Layout>
        <SlideTitle title={"The Cost"} chapter="(2D) Global Illumination" />
        <Layout direction={'column'} padding={64} paddingTop={128+64} width={'100%'} height={'100%'} alignItems={'end'} justifyContent={'center'} layout>
            <Layout ref={aprox_txt} direction={'column'} width={750} height={'100%'} gap={16} layout>
                <Txt fill={'#747474'} fontFamily={'IBM Plex Mono'} fontSize={32} fontWeight={700} fontStyle={'italic'}>Let's calculate:</Txt>
                <Txt fill={'#e4e4e4'} fontFamily={'IBM Plex Mono'} fontSize={32} fontWeight={700}>Resolution : 1080p</Txt>
                <Txt fill={'#e4e4e4'} fontFamily={'IBM Plex Mono'} fontSize={32} fontWeight={700}>Rays per probe : 128</Txt>
                <Txt fill={'#e4e4e4'} fontFamily={'IBM Plex Mono'} fontSize={32} fontWeight={700}>Probes per pixel : 1</Txt>
            </Layout>
        </Layout>
        </>
    );

    yield* slideTransition(Direction.Bottom, 2.0);

    yield probe_0().animate_in(1.0);
    yield* probe_1().animate_in(1.0);

    yield* beginSlide('Basic Radiance Slide [0]');

    yield* fadeIn(aprox_txt,
        <Txt opacity={0} marginTop={32} fill={'#e4e4e4'} fontFamily={'IBM Plex Mono'} fontSize={32} fontWeight={700}>
            1920 * 1080 = <Txt fill={'#57c4fd'} fontFamily={'IBM Plex Mono'} fontSize={32} fontWeight={700}>2.073.600</Txt> pixels
        </Txt>
    );

    yield* beginSlide('Basic Radiance Slide [1]');

    yield* fadeIn(aprox_txt,
        <Txt opacity={0} fill={'#e4e4e4'} fontFamily={'IBM Plex Mono'} fontSize={32} fontWeight={700}>
            <Txt fill={'#57c4fd'} fontFamily={'IBM Plex Mono'} fontSize={32} fontWeight={700}>2.073.600</Txt> * 128 = ...
        </Txt>
    );

    yield* beginSlide('Basic Radiance Slide [2]');

    yield* fadeIn(aprox_txt,
        <Txt opacity={0} marginTop={128} fill={'#ee5352'} fontFamily={'IBM Plex Mono'} fontSize={48} fontWeight={700} alignSelf={'center'}>265.420.800 rays!</Txt>
    );

    yield* beginSlide('Basic Radiance Slide [3]');

    yield* fadeIn(aprox_txt,
        <Txt opacity={0} fill={'#ee5352'} fontFamily={'IBM Plex Mono'} fontSize={72} fontWeight={700} alignSelf={'center'}>per frame!</Txt>
    );

    yield* beginSlide('Basic Radiance Slide [4]');
});
