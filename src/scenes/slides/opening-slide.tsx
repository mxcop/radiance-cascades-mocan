import { Layout, Rect, Txt, View2D } from "@motion-canvas/2d";
import { Direction, beginSlide, slideTransition } from "@motion-canvas/core";
import * as layers from '../../three/opening';
import { Three } from "../../components/three";

export default function* (view: View2D) {

    yield layers.setup();
    view.add(
        <>
        <Layout direction={'column'} width={1000} alignItems={'center'} layout>
            <Layout gap={48} layout>
            <Txt fill={'#ffc66c'} fontFamily={'JetBrains Mono'} fontSize={80} fontWeight={800} shadowColor={'#ffc66c'} shadowOffset={[0, 0]} shadowBlur={48}>Radiance</Txt>
            <Txt fill={'#fff'} fontFamily={'JetBrains Mono'} fontSize={80} fontWeight={800}>Cascades</Txt>
            </Layout>
            <Txt fill={'#9a9a9a'} fontFamily={'IBM Plex Mono'} fontSize={40} fontWeight={700} fontStyle={'italic'} rotation={-8} alignSelf={'end'}>In a nutshell!</Txt>
        </Layout>
        <Txt fill={'#434343'} y={500} fontFamily={'IBM Plex Mono'} fontSize={30} fontWeight={700} fontStyle={'italic'}>By Max Coppen</Txt>
        <Three
            width={1920}
            height={1080}
            resw={256}
            resh={128}
            camera={layers.camera}
            scene={layers.threeScene}
            layout={false}
        />
        </>
    );

    yield* beginSlide('Opening Slide');
};
