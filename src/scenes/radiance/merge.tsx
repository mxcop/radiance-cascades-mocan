import { Circle, Layout, Line, QuadBezier, Rect, Spline, Txt, makeScene2D } from '@motion-canvas/2d';
import { Direction, Vector2, all, beginSlide, createComputed, createRef, createSignal, loop, slideTransition, waitFor } from '@motion-canvas/core';
import { SlideTitle } from '../../components/title';
import * as layers from '../../three/rc';
import { Probe } from '../../components/probe';

export default makeScene2D(function* (view) {
    view.fill('#141414');

    const probeSpacing = 128 - 32;
    const probeLen = 32;

    const mergeProbe = createRef<Probe>();
    const mergeRay = createRef<Line>();
    const summary = createRef<Layout>();

    const blinkBiProbes = createSignal<number>(0.0);
    const blinkBiRays = createSignal<number>(0.0);
    const lengthBiRays = createSignal<number>(1.0);
    const offset = createSignal<number>(0.0);

    yield layers.setup();
    yield view.add(
        <>
            {/* Top left */}
            <Layout x={() => -probeSpacing * 2.0 + offset()} y={-probeSpacing * 2.0}>
                <Probe x={-probeSpacing} y={-probeSpacing} color={'#85e04c'} interval={new Vector2(0, probeLen)} directions={4} lineWidth={10} />
                <Probe x={probeSpacing} y={-probeSpacing} color={'#85e04c'} interval={new Vector2(0, probeLen)} directions={4} lineWidth={10} />
                <Probe x={-probeSpacing} y={probeSpacing} color={'#85e04c'} interval={new Vector2(0, probeLen)} directions={4} lineWidth={10} />
                <Probe x={probeSpacing} y={probeSpacing} color={'#85e04c'} interval={new Vector2(0, probeLen)} directions={4} lineWidth={10} />
                <Probe x={0} y={0} color={'#57c4fd'} interval={new Vector2(probeLen, probeLen+64)} directions={16} lineWidth={10} />
                <Probe opacity={blinkBiProbes} x={0} y={0} color={'#f85789'} interval={new Vector2(probeLen, probeLen+64)} directions={16} lineWidth={10} />
                <Line opacity={blinkBiRays} points={() => [[6.242890304516106,-31.385128972903374],[18.728670913548317 * lengthBiRays(),-94.15538691871012 * lengthBiRays()]]} lineWidth={10} lineCap={'round'} endArrow stroke="#f85789" />
                <Line opacity={blinkBiRays} points={() => [[17.77824745662726,-26.607027593681455],[53.33474236988178 * lengthBiRays(),-79.82108278104437 * lengthBiRays()]]} lineWidth={10} lineCap={'round'} endArrow stroke="#f85789" />
                <Line opacity={blinkBiRays} points={() => [[26.607027593681448,-17.77824745662727],[79.82108278104434 * lengthBiRays(),-53.33474236988181 * lengthBiRays()]]} lineWidth={10} lineCap={'round'} endArrow stroke="#f85789" />
                <Line opacity={blinkBiRays} points={() => [[31.38512897290337,-6.242890304516119],[94.15538691871011 * lengthBiRays(),-18.728670913548356 * lengthBiRays()]]} lineWidth={10} lineCap={'round'} endArrow stroke="#f85789" />
            </Layout>
            {/* Top right */}
            <Layout x={() => probeSpacing * 2.0 + offset()} y={-probeSpacing * 2.0}>
                <Probe x={-probeSpacing} y={-probeSpacing} color={'#85e04c'} interval={new Vector2(0, probeLen)} directions={4} lineWidth={10} />
                <Probe x={probeSpacing} y={-probeSpacing} color={'#85e04c'} interval={new Vector2(0, probeLen)} directions={4} lineWidth={10} />
                <Probe x={-probeSpacing} y={probeSpacing} color={'#85e04c'} interval={new Vector2(0, probeLen)} directions={4} lineWidth={10} />
                <Probe x={probeSpacing} y={probeSpacing} color={'#85e04c'} interval={new Vector2(0, probeLen)} directions={4} lineWidth={10} />
                <Probe x={0} y={0} color={'#57c4fd'} interval={new Vector2(probeLen, probeLen+64)} directions={16} lineWidth={10} />
                <Probe opacity={blinkBiProbes} x={0} y={0} color={'#f85789'} interval={new Vector2(probeLen, probeLen+64)} directions={16} lineWidth={10} />
                <Line opacity={blinkBiRays} points={() => [[6.242890304516106,-31.385128972903374],[18.728670913548317 * lengthBiRays(),-94.15538691871012 * lengthBiRays()]]} lineWidth={10} lineCap={'round'} endArrow stroke="#f85789" />
                <Line opacity={blinkBiRays} points={() => [[17.77824745662726,-26.607027593681455],[53.33474236988178 * lengthBiRays(),-79.82108278104437 * lengthBiRays()]]} lineWidth={10} lineCap={'round'} endArrow stroke="#f85789" />
                <Line opacity={blinkBiRays} points={() => [[26.607027593681448,-17.77824745662727],[79.82108278104434 * lengthBiRays(),-53.33474236988181 * lengthBiRays()]]} lineWidth={10} lineCap={'round'} endArrow stroke="#f85789" />
                <Line opacity={blinkBiRays} points={() => [[31.38512897290337,-6.242890304516119],[94.15538691871011 * lengthBiRays(),-18.728670913548356 * lengthBiRays()]]} lineWidth={10} lineCap={'round'} endArrow stroke="#f85789" />
            </Layout>
            {/* Bottom left */}
            <Layout x={() => -probeSpacing * 2.0 + offset()} y={probeSpacing * 2.0}>
                <Probe x={-probeSpacing} y={-probeSpacing} color={'#85e04c'} interval={new Vector2(0, probeLen)} directions={4} lineWidth={10} />
                <Probe x={probeSpacing} y={-probeSpacing} color={'#85e04c'} interval={new Vector2(0, probeLen)} directions={4} lineWidth={10} />
                <Probe x={-probeSpacing} y={probeSpacing} color={'#85e04c'} interval={new Vector2(0, probeLen)} directions={4} lineWidth={10} />
                <Probe x={probeSpacing} y={probeSpacing} color={'#85e04c'} interval={new Vector2(0, probeLen)} directions={4} lineWidth={10} />
                <Probe x={0} y={0} color={'#57c4fd'} interval={new Vector2(probeLen, probeLen+64)} directions={16} lineWidth={10} />
                <Probe x={0} y={0} color={'#57c4fd'} interval={new Vector2(probeLen, probeLen+64)} directions={16} lineWidth={10} />
                <Probe opacity={blinkBiProbes} x={0} y={0} color={'#f85789'} interval={new Vector2(probeLen, probeLen+64)} directions={16} lineWidth={10} />
                <Line opacity={blinkBiRays} points={() => [[6.242890304516106,-31.385128972903374],[18.728670913548317 * lengthBiRays(),-94.15538691871012 * lengthBiRays()]]} lineWidth={10} lineCap={'round'} endArrow stroke="#f85789" />
                <Line opacity={blinkBiRays} points={() => [[17.77824745662726,-26.607027593681455],[53.33474236988178 * lengthBiRays(),-79.82108278104437 * lengthBiRays()]]} lineWidth={10} lineCap={'round'} endArrow stroke="#f85789" />
                <Line opacity={blinkBiRays} points={() => [[26.607027593681448,-17.77824745662727],[79.82108278104434 * lengthBiRays(),-53.33474236988181 * lengthBiRays()]]} lineWidth={10} lineCap={'round'} endArrow stroke="#f85789" />
                <Line opacity={blinkBiRays} points={() => [[31.38512897290337,-6.242890304516119],[94.15538691871011 * lengthBiRays(),-18.728670913548356 * lengthBiRays()]]} lineWidth={10} lineCap={'round'} endArrow stroke="#f85789" />
            </Layout>
            {/* Bottom right */}
            <Layout x={() => probeSpacing * 2.0 + offset()} y={probeSpacing * 2.0}>
                <Probe x={-probeSpacing} y={-probeSpacing} color={'#85e04c'} interval={new Vector2(0, probeLen)} directions={4} lineWidth={10} />
                <Probe x={probeSpacing} y={-probeSpacing} color={'#85e04c'} interval={new Vector2(0, probeLen)} directions={4} lineWidth={10} />
                <Probe x={-probeSpacing} y={probeSpacing} color={'#85e04c'} interval={new Vector2(0, probeLen)} directions={4} lineWidth={10} />
                <Probe x={probeSpacing} y={probeSpacing} color={'#85e04c'} interval={new Vector2(0, probeLen)} directions={4} lineWidth={10} />
                <Probe x={0} y={0} color={'#57c4fd'} interval={new Vector2(probeLen, probeLen+64)} directions={16} lineWidth={10} />
                <Probe opacity={blinkBiProbes} x={0} y={0} color={'#f85789'} interval={new Vector2(probeLen, probeLen+64)} directions={16} lineWidth={10} />
                <Line opacity={blinkBiRays} points={() => [[6.242890304516106,-31.385128972903374],[18.728670913548317 * lengthBiRays(),-94.15538691871012 * lengthBiRays()]]} lineWidth={10} lineCap={'round'} endArrow stroke="#f85789" />
                <Line opacity={blinkBiRays} points={() => [[17.77824745662726,-26.607027593681455],[53.33474236988178 * lengthBiRays(),-79.82108278104437 * lengthBiRays()]]} lineWidth={10} lineCap={'round'} endArrow stroke="#f85789" />
                <Line opacity={blinkBiRays} points={() => [[26.607027593681448,-17.77824745662727],[79.82108278104434 * lengthBiRays(),-53.33474236988181 * lengthBiRays()]]} lineWidth={10} lineCap={'round'} endArrow stroke="#f85789" />
                <Line opacity={blinkBiRays} points={() => [[31.38512897290337,-6.242890304516119],[94.15538691871011 * lengthBiRays(),-18.728670913548356 * lengthBiRays()]]} lineWidth={10} lineCap={'round'} endArrow stroke="#f85789" />

                <Probe ref={mergeProbe} opacity={0} x={-probeSpacing} y={-probeSpacing} color={'#f85789'} interval={new Vector2(0, probeLen)} directions={4} lineWidth={10} />
                <Line ref={mergeRay} opacity={0} points={[[-96, -96], [-96, -96]]} lineWidth={10} lineCap={'round'} endArrow stroke="#f85789" />
            </Layout>
            <SlideTitle title={"Cascade Fusion"} chapter="Cascade Hierarchy" />
            <Layout direction={'column'} padding={64} width={'100%'} height={'60%'} alignItems={'start'} justifyContent={'start'} layout>
                <Layout direction={'column'} width={512} height={'100%'} gap={16} justifyContent={'start'} layout>
                    <Layout direction={'row'} gap={16} alignItems={'start'} layout>
                        <Rect fill="#85e04c" radius={6} size={32} />
                        <Txt fill={'#e4e4e4'} fontFamily={'IBM Plex Mono'} fontSize={28} fontWeight={700}>
                            Cascade N
                        </Txt>
                    </Layout>
                    <Layout direction={'row'} gap={16} alignItems={'start'} layout>
                        <Rect fill="#57c4fd" radius={6} size={32} />
                        <Txt fill={'#e4e4e4'} fontFamily={'IBM Plex Mono'} fontSize={28} fontWeight={700}>
                            Cascade N+1
                        </Txt>
                    </Layout>
                </Layout>
            </Layout>
            <Layout ref={summary} opacity={0} direction={'column'} padding={64} width={'100%'} height={'100%'} alignItems={'start'} justifyContent={'center'} layout>
                <Layout direction={'column'} width={512} height={'100%'} gap={16} justifyContent={'center'} layout>
                    <Txt fill={'#747474'} fontFamily={'IBM Plex Mono'} fontSize={28} fontWeight={700} fontStyle={'italic'}>Summary:</Txt>
                    <Txt fill={'#e4e4e4'} fontFamily={'IBM Plex Mono'} fontSize={28} fontWeight={700}>For each ray, find 4 closest N+1 probes.</Txt>
                    <Txt fill={'#e4e4e4'} fontFamily={'IBM Plex Mono'} fontSize={28} fontWeight={700}>Within these probes find 4 closest rays.</Txt>
                    <Txt fill={'#e4e4e4'} fontFamily={'IBM Plex Mono'} fontSize={28} fontWeight={700}>Rays are <Txt fill={'#57c4fd'} fontFamily={'IBM Plex Mono'} fontSize={28} fontWeight={700}>averaged</Txt> within their probe.</Txt>
                    <Txt fill={'#e4e4e4'} fontFamily={'IBM Plex Mono'} fontSize={28} fontWeight={700}>Merge using <Txt fill={'#57c4fd'} fontFamily={'IBM Plex Mono'} fontSize={28} fontWeight={700}>bilinear weights</Txt> for probes.</Txt>
                </Layout>
            </Layout>
        </>
    );

    yield* slideTransition(Direction.Bottom, 2.0);

    yield* beginSlide('Merge');
    
    yield* mergeProbe().opacity(1.0, 1.0);
    yield* beginSlide('Merge Probe');

    yield* blinkBiProbes(1.0, 1.0);
    yield* beginSlide('Bilinear Probes');
    
    yield* all(
        blinkBiProbes(0.0, 1.0),
        mergeProbe().opacity(0.0, 1.0),
        mergeRay().opacity(1.0, 1.0),
        mergeRay().points([[-96, -96], [-96 + 96, -96 - 96]], 1.0)
    );
    yield* beginSlide('Merge Ray');
    
    yield* all(
        blinkBiRays(1.0, 1.0),
        lengthBiRays(2.0, 1.0),
    );
    yield* beginSlide('Bilinear Rays');
    
    yield offset(256, 2.0);
    yield* waitFor(1.0);
    yield* summary().opacity(1.0, 2.0);
    yield* beginSlide('Bilinear Rays');
});
