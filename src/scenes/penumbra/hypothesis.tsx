import { Circle, Layout, Line, Rect, Txt, makeScene2D } from '@motion-canvas/2d';
import { Direction, Vector2, beginSlide, createComputed, createRef, createSignal, easeInOutCubic, map, slideTransition, tween, waitFor } from '@motion-canvas/core';
import { Three } from '../../components/three';
import * as layers from '../../three/penumbra';
import { ArcVector } from '../../components/arcvector';
import { SlideTitle } from '../../components/title';

const angleBetween = (ox: number, oy: number, ax: number, ay: number, bx: number, by: number): Vector2 => {
    // const dax = ax - ox;
    // const day = ay - oy;
    // const dbx = bx - ox;
    // const dby = by - oy;

    // const angle_a = Math.atan2(day, dax);
    // const angle_b = Math.atan2(dby, dbx);

    const da = new Vector2(ax - ox, ay - oy);
    const db = new Vector2(bx - ox, by - oy);

    const angle_a = da.degrees;
    const angle_b = db.degrees;

    return new Vector2(angle_a, angle_b);
};

export default makeScene2D(function* (view) {
    view.fill('#141414');

    const exampleT = createSignal<number>(0.65);
    const penuLineA = createRef<Line>();
    const penuLineB = createRef<Line>();
    const widthLine = createRef<Line>();
    const angleLineA = createRef<Line>();
    const angleLineB = createRef<Line>();

    const pointA = createSignal(() => penuLineA().getPointAtPercentage(exampleT()).position);
    const pointB = createSignal(() => penuLineB().getPointAtPercentage(exampleT()).position);

    const arcVector = createRef<ArcVector>();
    const arcAngle = createRef<Txt>();
    const arcLength = createRef<Txt>();

    const angle = createComputed(() => {
        return angleBetween(pointB().x, pointB().y, -240, -64, -240, 64);
    });

    const theta = createComputed(() => 57.2958 * Vector2.angleBetween(new Vector2(-240, 64).sub(pointB()), new Vector2(-240, -64).sub(pointB())));

    const penumbraInd = createRef<Layout>();
    const penumbraAngle = createRef<Layout>();
    const penumbraLinear = createRef<Layout>();
    const penumbraHypo = createRef<Layout>();

    yield layers.setup();
    yield view.add(
        <>
            <Rect width={512} height={512} radius={16} clip={true}>
                <Layout ref={penumbraInd} opacity={0}>
                    {/* Penumbra lines */}
                    <Line ref={penuLineA} points={[[-240, -64], [256, 128+16]]} lineWidth={8} lineDash={[12, 24]} lineCap={'round'} stroke={'#343434'} />
                    <Line ref={penuLineB} points={[[-240, 64], [256, -128-16]]} lineWidth={8} lineDash={[12, 24]} lineCap={'round'} stroke={'#343434'} />
                    {/* Text */}
                    <Txt x={128} y={0} fontFamily={'JetBrains Mono'} fontWeight={800} fontSize={30} fill={'#545454'}>PENUMBRA</Txt>
                    <Txt x={48} y={152} fontFamily={'JetBrains Mono'} fontWeight={800} fontSize={30} fill={'#545454'}>UMBRA</Txt>
                    <Txt x={48} y={-152} fontFamily={'JetBrains Mono'} fontWeight={800} fontSize={30} fill={'#545454'}>LIGHT</Txt>
                </Layout>
                <Layout ref={penumbraAngle} opacity={0}>
                    {/* Angle lines */}
                    <Line ref={angleLineA} points={[[-240, -64], pointB]} lineWidth={8} lineCap={'round'} stroke={'#85e04c'} />
                    <Line ref={angleLineB} points={[[-240, 64], pointB]} lineWidth={8} lineCap={'round'} stroke={'#85e04c'} />
                    <ArcVector ref={arcVector} position={new Vector2(128, -90)} radius={192} from={angle().x} to={angle().y} lineWidth={8} lineDash={[0, 16]} lineDashOffset={4} stroke={'#85e04c'} endArrow={false} counter>
                        <Txt ref={arcAngle} fontFamily={'JetBrains Mono'} fontWeight={800} fontSize={30} fill={'#85e04c'} />
                    </ArcVector>
                </Layout>
                <Layout ref={penumbraLinear} opacity={0}>
                    {/* Thickness line */}
                    <Line ref={widthLine} points={[pointA, pointB]} lineWidth={8} lineCap={'round'} stroke={'#57c4fd'}>
                        <Txt ref={arcLength} fontFamily={'JetBrains Mono'} fontWeight={800} fontSize={30} fill={'#57c4fd'} clip={false} />
                    </Line>
                    <Circle position={pointA} size={24} lineWidth={8} stroke={'#141414'} fill={'#57c4fd'} />
                    <Circle position={pointB} size={24} lineWidth={8} stroke={'#141414'} fill={'#57c4fd'} />
                </Layout>
                {/* Shader */}
                <Three
                    width={512}
                    height={512}
                    resw={64}
                    resh={64}
                    camera={layers.camera}
                    scene={layers.threeScene}
                    layout={false}
                />
            </Rect>
            <SlideTitle title={"The Hypothesis"} chapter="Penumbra Theorem" />
            <Layout ref={penumbraHypo} opacity={0} direction={'column'} padding={96} width={'100%'} height={'100%'} alignItems={'center'} justifyContent={'end'} layout>
                <Layout direction={'column'} width={512} height={'100%'} gap={16} alignItems={'center'} justifyContent={'end'} layout>
                    <Txt fill={'#747474'} fontFamily={'IBM Plex Mono'} fontSize={28} fontWeight={700} fontStyle={'italic'}>Hypothesis:</Txt>
                    <Txt marginTop={16} fill={'#e4e4e4'} fontFamily={'IBM Plex Mono'} fontSize={28} fontWeight={700}>"We need higher spatial resolution with lower angular resolution near a light source</Txt>
                    <Txt fill={'#e4e4e4'} fontFamily={'IBM Plex Mono'} fontSize={28} fontWeight={700}>and lower spatial resolution with higher angular resolution farther away from a light source."</Txt>
                </Layout>
            </Layout>
            <Layout direction={'column'} padding={48} width={'100%'} height={'100%'} alignItems={'start'} justifyContent={'end'} layout>
                <Txt fill={'#646464'} stroke={'#141414'} lineJoin={'round'} lineWidth={32} strokeFirst={true} fontFamily={'JetBrains Mono'} fontSize={28} fontStyle={'italic'} fontWeight={800}>As shown in the paper by Alexander Sannikov.</Txt>
            </Layout>
        </>
    );

    /* Animate the angle of the arc */
    arcAngle().text(() => `${theta().toFixed(0)}°`);
    arcAngle().position(() => arcVector().center().addX(-35).addY(10));
    arcAngle().rotation(() => angle().x - theta() * 0.5 + 180);
    
    arcLength().text(() => `${((pointA().y - pointB().y) * 0.1).toFixed(0)}u`);
    arcLength().position(() => widthLine().getPointAtPercentage(0.5).position.addX(-50));

    /* Animate the arc line */
    arcVector().position(pointB);
    arcVector().from(() => angle().x);
    arcVector().to(() => angle().y);

    yield* slideTransition(Direction.Bottom, 2.0);

    yield* beginSlide('Penumbra Hypothesis Slide');

    yield* penumbraInd().opacity(1.0, 1.0);
    yield* beginSlide('Penumbra');

    yield* penumbraLinear().opacity(1.0, 1.0);
    yield* beginSlide('Penumbra Linear');

    yield*
        tween(2, value => {
            exampleT(map(0.65, 0.9, easeInOutCubic(value)));
        });
    yield*
        tween(2, value => {
            exampleT(map(0.9, 0.65, easeInOutCubic(value)));
        });
    yield* beginSlide('Animate Linear');

    yield* penumbraAngle().opacity(1.0, 1.0);
    yield* beginSlide('Penumbra Angular');

    yield*
        tween(2, value => {
            exampleT(map(0.65, 0.9, easeInOutCubic(value)));
        });
    yield*
        tween(2, value => {
            exampleT(map(0.9, 0.65, easeInOutCubic(value)));
        });
    yield* beginSlide('Animate Angular');
    
    yield* penumbraHypo().opacity(1.0, 2.0);
    yield* beginSlide('Hypothesis');

    yield*
        tween(2, value => {
            exampleT(map(0.65, 0.9, easeInOutCubic(value)));
        });
    yield* beginSlide('Animate To Angular & Linear');

    yield*
        tween(2, value => {
            exampleT(map(0.9, 0.65, easeInOutCubic(value)));
        });
    yield* beginSlide('Animate Back Angular & Linear');
});
