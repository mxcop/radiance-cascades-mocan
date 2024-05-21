import { Layout, Node, Txt, makeScene2D } from '@motion-canvas/2d';
import { Reference, Vector2, beginSlide, createRef } from '@motion-canvas/core';
import { Probe } from '../components/probe';

function* fadeIn(ref: Reference<Txt>, node: Node) {
    ref().add(node);
    yield* node.opacity(1, 0.5);
};

export default makeScene2D(function* (view) {
    view.fill('#141414');

    const aprox_txt = createRef<Txt>();

    view.add(
        <>
        <Layout x={-512}>
            <Probe color={'#242424'} interval={new Vector2(0, 512)} directions={36} lineWidth={12} />
            <Probe color={'#57c4fd'} interval={new Vector2(0, 256)} directions={12} lineWidth={12} />
        </Layout>
        <Layout direction={'column'} padding={64} width={'100%'} height={'100%'} alignItems={'center'} justifyContent={'start'} layout>
            <Txt fill={'#ffffff'} stroke={'#141414'} lineWidth={32} strokeFirst={true} fontFamily={'JetBrains Mono'} fontSize={80} fontWeight={800}>Basic Radiance</Txt>
        </Layout>
        <Layout direction={'column'} padding={64} width={'50%'} height={'100%'} alignItems={'start'} justifyContent={'end'} layout>
            <Txt fill={'#747474'} fontFamily={'IBM Plex Mono'} fontSize={40} fontWeight={700} fontStyle={'italic'} rotation={-8}>A lot of rays!</Txt>
        </Layout>
        <Layout direction={'column'} padding={64} paddingTop={256} width={'100%'} height={'100%'} alignItems={'end'} justifyContent={'center'} layout>
            <Layout ref={aprox_txt} direction={'column'} width={750} height={'100%'} gap={16} layout>
                <Txt fill={'#747474'} fontFamily={'IBM Plex Mono'} fontSize={40} fontWeight={700} fontStyle={'italic'}>Let's aproximate!</Txt>
                <Txt fill={'#e4e4e4'} fontFamily={'IBM Plex Mono'} fontSize={40} fontWeight={700}>Resolution : 1080p</Txt>
                <Txt fill={'#e4e4e4'} fontFamily={'IBM Plex Mono'} fontSize={40} fontWeight={700}>Rays per pixel : 360</Txt>
            </Layout>
        </Layout>
        </>
    );

    yield* beginSlide('Basic Radiance Slide [0]');

    yield* fadeIn(aprox_txt,
        <Txt opacity={0} marginTop={32} fill={'#e4e4e4'} fontFamily={'IBM Plex Mono'} fontSize={40} fontWeight={700}>1920 * 1080 = 2.073.600 pixels</Txt>
    );

    yield* beginSlide('Basic Radiance Slide [1]');

    yield* fadeIn(aprox_txt,
        <Txt opacity={0} fill={'#e4e4e4'} fontFamily={'IBM Plex Mono'} fontSize={40} fontWeight={700}>2.073.600 * 360 = ...</Txt>
    );

    yield* beginSlide('Basic Radiance Slide [2]');

    yield* fadeIn(aprox_txt,
        <Txt opacity={0} marginTop={80} fill={'#ee5352'} fontFamily={'IBM Plex Mono'} fontSize={60} fontWeight={700} alignSelf={'center'}>746.496.000 rays!</Txt>
    );

    yield* beginSlide('Basic Radiance Slide [3]');

    yield* fadeIn(aprox_txt,
        <Txt opacity={0} fill={'#ee5352'} fontFamily={'IBM Plex Mono'} fontSize={80} fontWeight={700} alignSelf={'center'}>per frame!</Txt>
    );

    yield* beginSlide('Basic Radiance Slide [4]');
});
