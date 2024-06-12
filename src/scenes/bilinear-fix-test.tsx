import { Circle, Img, Layout, Line, QuadBezier, Rect, Spline, Txt, makeScene2D } from '@motion-canvas/2d';
import { Direction, Vector2, all, beginSlide, createComputed, createRef, createSignal, loop, slideTransition, waitFor } from '@motion-canvas/core';
import { SlideTitle } from '../components/title';
import * as layers from '../three/rc';
import { Probe } from '../components/probe';
import light from '../icons/light.svg';
import { BiProbe } from '../components/biprobe';

export default makeScene2D(function* (view) {
    view.fill('#141414');

    const probeSpacing = 128 - 32;
    const probeTwo = probeSpacing * 2.0;
    const probeLen = 32;

    const probe = createRef<Probe>();
    const biProbe1 = createRef<BiProbe>();
    const biProbe2 = createRef<BiProbe>();
    const biProbe3 = createRef<BiProbe>();
    const biProbe4 = createRef<BiProbe>();

    yield layers.setup();
    yield view.add(
        <>
            <Layout x={probeTwo} y={-probeTwo}>
                <Probe x={-probeSpacing} y={-probeSpacing} color={'#85e04c'} interval={new Vector2(0, probeLen)} directions={4} lineWidth={10} />
                <Probe x={probeSpacing} y={-probeSpacing} color={'#85e04c'} interval={new Vector2(0, probeLen)} directions={4} lineWidth={10} />
                <Probe x={-probeSpacing} y={probeSpacing} color={'#85e04c'} interval={new Vector2(0, probeLen)} directions={4} lineWidth={10} />
                <Probe x={probeSpacing} y={probeSpacing} color={'#85e04c'} interval={new Vector2(0, probeLen)} directions={4} lineWidth={10} />
                <Probe x={0} y={0} color={'#57c4fd'} interval={new Vector2(probeLen, probeLen * 4)} directions={16} lineWidth={10} />
            </Layout>
            <Layout x={-probeTwo} y={probeTwo}>
                <Probe x={-probeSpacing} y={-probeSpacing} color={'#85e04c'} interval={new Vector2(0, probeLen)} directions={4} lineWidth={10} />
                <Probe x={probeSpacing} y={-probeSpacing} color={'#85e04c'} interval={new Vector2(0, probeLen)} directions={4} lineWidth={10} />
                <Probe x={-probeSpacing} y={probeSpacing} color={'#85e04c'} interval={new Vector2(0, probeLen)} directions={4} lineWidth={10} />
                <Probe x={probeSpacing} y={probeSpacing} color={'#85e04c'} interval={new Vector2(0, probeLen)} directions={4} lineWidth={10} />
                <Probe x={0} y={0} color={'#57c4fd'} interval={new Vector2(probeLen, probeLen * 4)} directions={16} lineWidth={10} />
            </Layout>
            <Layout x={probeTwo} y={probeTwo}>
                <Probe x={-probeSpacing} y={-probeSpacing} color={'#85e04c'} interval={new Vector2(0, probeLen)} directions={4} lineWidth={10} />
                <Probe x={probeSpacing} y={-probeSpacing} color={'#85e04c'} interval={new Vector2(0, probeLen)} directions={4} lineWidth={10} />
                <Probe x={-probeSpacing} y={probeSpacing} color={'#85e04c'} interval={new Vector2(0, probeLen)} directions={4} lineWidth={10} />
                <Probe x={probeSpacing} y={probeSpacing} color={'#85e04c'} interval={new Vector2(0, probeLen)} directions={4} lineWidth={10} />
                <Probe x={0} y={0} color={'#57c4fd'} interval={new Vector2(probeLen, probeLen * 4)} directions={16} lineWidth={10} />
            </Layout>
            <Layout x={-probeTwo} y={-probeTwo}>
                <Probe x={-probeSpacing} y={-probeSpacing} color={'#85e04c'} interval={new Vector2(0, probeLen)} directions={4} lineWidth={10} />
                <Probe x={probeSpacing} y={-probeSpacing} color={'#85e04c'} interval={new Vector2(0, probeLen)} directions={4} lineWidth={10} />
                <Probe x={-probeSpacing} y={probeSpacing} color={'#85e04c'} interval={new Vector2(0, probeLen)} directions={4} lineWidth={10} />
                <Probe x={0} y={0} color={'#57c4fd'} interval={new Vector2(probeLen, probeLen * 4)} directions={16} lineWidth={10} />
                <BiProbe ref={biProbe1} x={probeSpacing} y={probeSpacing} color={'#f85789'} interval={new Vector2(0, probeLen)} directions={4} lineWidth={10} branchFactor={4} nextProbePos={new Vector2(-probeSpacing, -probeSpacing)} />
                <BiProbe ref={biProbe2} x={probeSpacing} y={probeSpacing} color={'#f85789'} interval={new Vector2(0, probeLen)} directions={4} lineWidth={10} branchFactor={4} nextProbePos={new Vector2(-probeSpacing + probeTwo * 2.0, -probeSpacing)} />
                <BiProbe ref={biProbe3} x={probeSpacing} y={probeSpacing} color={'#f85789'} interval={new Vector2(0, probeLen)} directions={4} lineWidth={10} branchFactor={4} nextProbePos={new Vector2(-probeSpacing, -probeSpacing + probeTwo * 2.0)} />
                <BiProbe ref={biProbe4} x={probeSpacing} y={probeSpacing} color={'#f85789'} interval={new Vector2(0, probeLen)} directions={4} lineWidth={10} branchFactor={4} nextProbePos={new Vector2(-probeSpacing + probeTwo * 2.0, -probeSpacing + probeTwo * 2.0)} />
                <Probe ref={probe} x={probeSpacing} y={probeSpacing} color={'#85e04c'} interval={new Vector2(0, probeLen)} directions={4} lineWidth={10} />
            </Layout>
            <SlideTitle title={"Alternative Rays"} chapter="Bilinear Fix" />
        </>
    );

    yield biProbe1().animate_out(0.0);
    yield biProbe2().animate_out(0.0);
    yield biProbe3().animate_out(0.0);
    yield* biProbe4().animate_out(0.0);

    yield* slideTransition(Direction.Bottom, 2.0);

    yield* probe().color("#f85789", 1.0);

    yield* beginSlide('Bilinear Fix');

    yield* probe().animate_out(1.0);

    yield biProbe1().animate_in(2.0);
    yield biProbe2().animate_in(2.0);
    yield biProbe3().animate_in(2.0);
    yield* biProbe4().animate_in(2.0);

    yield* beginSlide('Animate In');
});
