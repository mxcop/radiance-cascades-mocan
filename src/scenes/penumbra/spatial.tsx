import { makeScene2D } from '@motion-canvas/2d';
import { Direction, beginSlide, slideTransition } from '@motion-canvas/core';
import { SlideTitle } from '../../components/title';

export default makeScene2D(function* (view) {
    view.fill('#141414');

    yield view.add(
        <>
            <SlideTitle title={"Spatial Observation"} chapter="Penumbra Theorem" />
        </>
    );

    yield* slideTransition(Direction.Bottom, 2.0);

    yield* beginSlide('GI Slide');
});
