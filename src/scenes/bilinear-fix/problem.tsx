import { Circle, Img, Layout, Line, QuadBezier, Rect, Spline, Txt, makeScene2D } from '@motion-canvas/2d';
import { Direction, Vector2, all, beginSlide, createComputed, createRef, createSignal, loop, slideTransition, waitFor } from '@motion-canvas/core';
import { SlideTitle } from '../../components/title';
import * as layers from '../../three/rc';
import { Probe } from '../../components/probe';
import light from '../../icons/light.svg';
import { BiProbe } from '../../components/biprobe';

export default makeScene2D(function* (view) {
    view.fill('#141414');

    const probeSpacing = 128 - 32;
    const probeLen = 32;

    const mergeProbe = createRef<Probe>();
    const mergeRay = createRef<Line>();
    const occlusionRay = createRef<Line>();
    const summary = createRef<Layout>();

    const biProbe1 = createRef<BiProbe>();
    const biProbe2 = createRef<BiProbe>();
    const biProbe3 = createRef<BiProbe>();
    const biProbe4 = createRef<BiProbe>();

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
            </Layout>
            <Circle x={offset} size={128} fill="#ffc66c" clip>
                <Img width={64} height={64} src={light} />
            </Circle>
            {/* Top right */}
            <Layout x={() => probeSpacing * 2.0 + offset()} y={-probeSpacing * 2.0}>
                <Probe x={-probeSpacing} y={-probeSpacing} color={'#85e04c'} interval={new Vector2(0, probeLen)} directions={4} lineWidth={10} />
                <Probe x={probeSpacing} y={-probeSpacing} color={'#85e04c'} interval={new Vector2(0, probeLen)} directions={4} lineWidth={10} />
                <Probe x={probeSpacing} y={probeSpacing} color={'#85e04c'} interval={new Vector2(0, probeLen)} directions={4} lineWidth={10} />
                <Probe x={0} y={0} color={'#57c4fd'} interval={new Vector2(probeLen, probeLen+64)} directions={16} lineWidth={10} />
                <Probe opacity={blinkBiProbes} x={0} y={0} color={'#f85789'} interval={new Vector2(probeLen, probeLen+64)} directions={16} lineWidth={10} />
            
                <Probe opacity={0} x={-probeSpacing} y={probeSpacing} color={'#f85789'} interval={new Vector2(0, probeLen)} directions={4} lineWidth={10} />
                
                <BiProbe ref={biProbe1} x={-probeSpacing} y={probeSpacing} color={'#f85789'} interval={new Vector2(0, probeLen)} directions={4} lineWidth={10} branchFactor={4} nextProbePos={new Vector2(probeSpacing, -probeSpacing)} />
                <BiProbe ref={biProbe2} x={-probeSpacing} y={probeSpacing} color={'#f85789'} interval={new Vector2(0, probeLen)} directions={4} lineWidth={10} branchFactor={4} nextProbePos={new Vector2(probeSpacing - (probeSpacing * 2.0) * 2.0, -probeSpacing)} />
                <BiProbe ref={biProbe3} x={-probeSpacing} y={probeSpacing} color={'#f85789'} interval={new Vector2(0, probeLen)} directions={4} lineWidth={10} branchFactor={4} nextProbePos={new Vector2(probeSpacing, -probeSpacing + (probeSpacing * 2.0) * 2.0)} />
                <BiProbe ref={biProbe4} x={-probeSpacing} y={probeSpacing} color={'#f85789'} interval={new Vector2(0, probeLen)} directions={4} lineWidth={10} branchFactor={4} nextProbePos={new Vector2(probeSpacing - (probeSpacing * 2.0) * 2.0, -probeSpacing + (probeSpacing * 2.0) * 2.0)} />
                
                <Probe ref={mergeProbe} x={-probeSpacing} y={probeSpacing} color={'#85e04c'} interval={new Vector2(0, probeLen)} directions={4} lineWidth={10} />
                <Line ref={mergeRay} opacity={0} points={[[-96, 96], [-96, 96]]} lineWidth={10} lineCap={'round'} endArrow stroke="#f85789" />
            </Layout>
            <SlideTitle title={"Fundamental Disconnect"} chapter="Bilinear Fix" />
            <Layout direction={'column'} padding={64} width={'100%'} height={'60%'} alignItems={'start'} justifyContent={'start'} layout>
                <Layout direction={'column'} width={512} height={'100%'} gap={16} justifyContent={'start'} layout>
                    <Layout direction={'row'} gap={16} alignItems={'start'} layout>
                        <Rect fill="#85e04c" radius={6} size={32} />
                        <Txt fill={'#e4e4e4'} fontFamily={'IBM Plex Mono'} fontSize={28} fontWeight={700}>
                            Cascade 0
                        </Txt>
                    </Layout>
                    <Layout direction={'row'} gap={16} alignItems={'start'} layout>
                        <Rect fill="#57c4fd" radius={6} size={32} />
                        <Txt fill={'#e4e4e4'} fontFamily={'IBM Plex Mono'} fontSize={28} fontWeight={700}>
                            Cascade 1
                        </Txt>
                    </Layout>
                </Layout>
            </Layout>
            <Layout ref={summary} opacity={0} direction={'column'} padding={64} width={'100%'} height={'100%'} alignItems={'start'} justifyContent={'center'} layout>
                <Layout direction={'column'} paddingTop={128+64} width={512} height={'100%'} gap={16} justifyContent={'center'} layout>
                    <Txt fill={'#747474'} fontFamily={'IBM Plex Mono'} fontSize={28} fontWeight={700} fontStyle={'italic'}>Problem:</Txt>
                    <Txt fill={'#e4e4e4'} fontFamily={'IBM Plex Mono'} fontSize={28} fontWeight={700}>Rays are not connected between cascades.</Txt>
                    <Txt fill={'#e4e4e4'} fontFamily={'IBM Plex Mono'} fontSize={28} fontWeight={700}>This causes artifacts, e.g. ringing.</Txt>
                    <Txt fill={'#e4e4e4'} fontFamily={'IBM Plex Mono'} fontSize={28} fontWeight={700}>We need to connect the <Txt fill={'#f85789'} fontFamily={'IBM Plex Mono'} fontSize={28} fontWeight={700}>rays</Txt>.</Txt>
                    <Txt marginTop={32} fill={'#f85789'} fontFamily={'IBM Plex Mono'} fontSize={28} fontWeight={700}>16x the ray count!</Txt>
                </Layout>
            </Layout>
            <Line x={offset} ref={occlusionRay} opacity={0} points={[[96, -96], [-192, 192]]} lineWidth={10} lineCap={'round'} endArrow stroke="#f85789" />
        </>
    );

    yield biProbe1().animate_out(0.0);
    yield biProbe2().animate_out(0.0);
    yield biProbe3().animate_out(0.0);
    yield* biProbe4().animate_out(0.0);

    yield* slideTransition(Direction.Bottom, 2.0);

    yield* beginSlide('Merge Problem');
    
    yield* all(
        mergeRay().opacity(1.0, 1.0),
        mergeRay().points([[-96, 96], [-96 + 96, 96 - 96]], 1.0)
    );
    yield* beginSlide('Merge Ray');
    
    yield* all(
        blinkBiRays(1.0, 1.0),
        lengthBiRays(2.4, 1.0),
    );
    yield* beginSlide('Bilinear Rays');

    yield* all(
        mergeRay().opacity(0.0, 1.0),
        blinkBiRays(0.0, 1.0),
        mergeProbe().color("#f85789", 1.0)
    );
    yield* beginSlide('Blink');

    yield mergeProbe().animate_out(1.0);

    yield biProbe1().animate_in(2.0);
    yield biProbe2().animate_in(2.0);
    yield biProbe3().animate_in(2.0);
    yield* biProbe4().animate_in(2.0);

    yield* beginSlide('New Ray Layout');
    
    yield offset(256, 2.0);
    yield* waitFor(1.0);
    yield* summary().opacity(1.0, 2.0);
    yield* beginSlide('Summary');
});
