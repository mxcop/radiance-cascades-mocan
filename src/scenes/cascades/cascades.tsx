import { Circle, Layout, Node, Txt, makeScene2D } from '@motion-canvas/2d';
import { Direction, Vector2, all, beginSlide, createRef, createSignal, slideTransition, tween } from '@motion-canvas/core';
import { Probe } from '../../components/probe';
import { SlideTitle } from '../../components/title';
import { Cascade, drawCascade, getCascade } from '../../utils/cascade';

export default makeScene2D(function* (view) {
    view.fill('#141414');

    const cascade0: Cascade = getCascade(4, 8, 2, 0);
    const cascade1: Cascade = getCascade(4, 8, 2, 1);
    const cascade2: Cascade = getCascade(4, 8, 2, 2);
    const bgs = 2;
    const cs2 = drawCascade(view, new Vector2(-384 * bgs, -384 * bgs), new Vector2(768 * bgs, 768 * bgs), new Vector2(1 * bgs, 1 * bgs), cascade2, 'rgb(30, 30, 30)');
    const cs1 = drawCascade(view, new Vector2(-384 * bgs, -384 * bgs), new Vector2(768 * bgs, 768 * bgs), new Vector2(2 * bgs, 2 * bgs), cascade1, 'rgb(35, 35, 35)');
    const cs0 = drawCascade(view, new Vector2(-384 * bgs, -384 * bgs), new Vector2(768 * bgs, 768 * bgs), new Vector2(4 * bgs, 4 * bgs), cascade0, 'rgb(40, 40, 40)');
    const c0 = drawCascade(view, new Vector2(-384, -384), new Vector2(768, 768), new Vector2(4, 4), cascade0, "#85e04c");
    const c1 = drawCascade(view, new Vector2(-384, -384), new Vector2(768, 768), new Vector2(2, 2), cascade1, "#57c4fd");

    view.add(
        <>
        <SlideTitle title={"This.. is a Cascade Hierarchy!"} chapter="Exploiting Observations" />
        <Txt y={400} text={'(naive) 265.420.800 -> 4.017.600 (5c)'} fill={'#e4e4e4'} stroke={'#141414'} lineJoin={'round'} lineWidth={16} strokeFirst={true} fontFamily={'JetBrains Mono'} fontSize={36} fontWeight={800} />
        <Txt y={464} text={'98.48% less rays!'} fill={'#85e04c'} stroke={'#141414'} lineJoin={'round'} lineWidth={16} strokeFirst={true} fontFamily={'JetBrains Mono'} fontSize={42} fontWeight={800} />
        </>
    );

    yield* c0().opacity(0.0, 0.0);
    yield* cs0().opacity(0.0, 0.0);
    yield* c1().opacity(0.0, 0.0);
    yield* cs1().opacity(0.0, 0.0);
    yield* cs2().opacity(0.0, 0.0);

    yield* slideTransition(Direction.Bottom, 2.0);

    yield* all(
        c0().opacity(1.0, 1.0),
        cs0().opacity(1.0, 1.0)
    );

    yield* all(
        c1().opacity(1.0, 1.0),
        cs1().opacity(1.0, 1.0)
    );

    yield* cs2().opacity(1.0, 1.0);

    yield* beginSlide('Exploit Angular');
});
