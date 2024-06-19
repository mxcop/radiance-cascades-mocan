import { Circle, Img, Layout, Line, QuadBezier, Rect, Spline, Txt, makeScene2D } from '@motion-canvas/2d';
import { Direction, Vector2, all, beginSlide, createComputed, createRef, createSignal, loop, slideTransition, waitFor } from '@motion-canvas/core';
import { SlideTitle } from '../../components/title';
import { Probe } from '../../components/probe';
import probeTex from '../../images/probe-tex.png';

export default makeScene2D(function* (view) {
    view.fill('#141414');

    const cascadeIdx = createSignal(1);

    const probe = createRef<Probe>();
    const showcase = createRef<Rect>();

    yield view.add(
        <>
            <SlideTitle title={"Radiance Storage"} chapter="Cascade Hierarchy" />
            <Rect ref={showcase} x={-256} width={480} height={480} radius={16} clip={true}>
                <Img src={probeTex} width={480} height={480} />
            </Rect>
            <Probe x={256+128} ref={probe} color="#85e04c" interval={new Vector2(64, 128+64)} directions={16} />
        </>
    );

    yield* cascadeIdx(0, 0);

    yield* slideTransition(Direction.Bottom, 2.0);

    yield* beginSlide('Probe Data');
});
