import { Layout, Txt, makeScene2D } from '@motion-canvas/2d';
import { Direction, beginSlide, slideTransition } from '@motion-canvas/core';

export default makeScene2D(function* (view) {
  view.fill('#141414');

    view.add(
        <>
        <Layout direction={'column'} width={1000} height={800} alignItems={'center'} gap={16} layout>
            <Layout gap={48} layout>
            <Txt fill={'#ffc66c'} fontFamily={'JetBrains Mono'} fontSize={80} fontWeight={800} shadowColor={'#ffc66c'} shadowOffset={[0, 0]} shadowBlur={48}>Thank you</Txt>
            <Txt fill={'#fff'} fontFamily={'JetBrains Mono'} fontSize={80} fontWeight={800}>for listening!</Txt>
            </Layout>
            <Txt fill={'#9a9a9a'} fontFamily={'IBM Plex Mono'} fontSize={40} fontWeight={700} fontStyle={'italic'} rotation={-6} alignSelf={'end'}>Any questions?</Txt>
        </Layout>
        <Layout direction={'column'} width={1400} height={300} y={100} alignItems={'center'} justifyContent={'center'} gap={16} layout>
            <Txt fill={'#747474'} fontFamily={'IBM Plex Mono'} fontSize={40} fontWeight={700} fontStyle={'italic'}>Credits</Txt>
            <Layout width={1400} height={800} alignItems={'center'} justifyContent={'center'} layout>
                <Layout padding={32} direction={'column'} width={700} alignItems={'end'} justifyContent={'center'} gap={16} layout>
                <Txt fill={'#9a9a9a'} fontFamily={'IBM Plex Mono'} fontSize={40} fontWeight={700} fontStyle={'italic'}>Radiance Cascades</Txt>
                <Txt fill={'#9a9a9a'} fontFamily={'IBM Plex Mono'} fontSize={40} fontWeight={700} fontStyle={'italic'}>Interactive Visuals</Txt>
                <Txt fill={'#9a9a9a'} fontFamily={'IBM Plex Mono'} fontSize={40} fontWeight={700} fontStyle={'italic'}>Great Article</Txt>
                <Txt fill={'#9a9a9a'} fontFamily={'IBM Plex Mono'} fontSize={40} fontWeight={700} fontStyle={'italic'}>Shadertoy Example</Txt>
                </Layout>
                <Layout padding={32} direction={'column'} width={700} alignItems={'start'} justifyContent={'center'} gap={16} layout>
                <Txt fill={'#e4e4e4'} fontFamily={'IBM Plex Mono'} fontSize={40} fontWeight={700} fontStyle={'italic'}>Alexander Sannikov</Txt>
                <Txt fill={'#e4e4e4'} fontFamily={'IBM Plex Mono'} fontSize={40} fontWeight={700} fontStyle={'italic'}>Tmpvar</Txt>
                <Txt fill={'#e4e4e4'} fontFamily={'IBM Plex Mono'} fontSize={40} fontWeight={700} fontStyle={'italic'}>XorDev & Yaazarai</Txt>
                <Txt fill={'#e4e4e4'} fontFamily={'IBM Plex Mono'} fontSize={40} fontWeight={700} fontStyle={'italic'}>Fad</Txt>
                </Layout>
            </Layout>
        </Layout>
        <Txt fill={'#434343'} y={500} fontFamily={'IBM Plex Mono'} fontSize={30} fontWeight={700} fontStyle={'italic'}>By Max Coppen</Txt>
        </>
    );

    yield* slideTransition(Direction.Right, 2.0);

    yield* beginSlide('Ending Slide');
});
