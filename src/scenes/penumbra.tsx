import { Circle, Line, Rect, Txt, makeScene2D } from '@motion-canvas/2d';
import { Vector2, beginSlide, createComputed, createRef, createSignal, easeInOutCubic, map, tween, waitFor } from '@motion-canvas/core';
import { Three } from '../components/three';
import * as layers from '../three/penumbra';
import { ArcVector } from '../components/arcvector';

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

    const exampleT = createSignal<number>(0.8);
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

    yield layers.setup();
    yield view.add(
        <Rect width={512} height={512} radius={16} clip={true}>
            {/* Penumbra lines */}
            <Line ref={penuLineA} points={[[-240, -64], [256, 128+16]]} lineWidth={8} lineDash={[12, 24]} lineCap={'round'} stroke={'#343434'} />
            <Line ref={penuLineB} points={[[-240, 64], [256, -128-16]]} lineWidth={8} lineDash={[12, 24]} lineCap={'round'} stroke={'#343434'} />
            {/* Angle lines */}
            <Line ref={angleLineA} points={[[-240, -64], pointB]} lineWidth={8} lineCap={'round'} stroke={'#85e04c'} />
            <Line ref={angleLineB} points={[[-240, 64], pointB]} lineWidth={8} lineCap={'round'} stroke={'#85e04c'} />
            <ArcVector ref={arcVector} position={new Vector2(128, -90)} radius={192} from={angle().x} to={angle().y} lineWidth={8} lineDash={[0, 16]} lineDashOffset={4} stroke={'#85e04c'} endArrow={false} counter>
                <Txt ref={arcAngle} fontFamily={'JetBrains Mono'} fontWeight={800} fontSize={30} fill={'#85e04c'} />
            </ArcVector>
            {/* Text */}
            <Txt x={128} y={0} fontFamily={'JetBrains Mono'} fontWeight={800} fontSize={30} fill={'#545454'}>PENUMBRA</Txt>
            <Txt x={48} y={152} fontFamily={'JetBrains Mono'} fontWeight={800} fontSize={30} fill={'#545454'}>UMBRA</Txt>
            <Txt x={48} y={-152} fontFamily={'JetBrains Mono'} fontWeight={800} fontSize={30} fill={'#545454'}>LIGHT</Txt>
            {/* Thickness line */}
            <Line ref={widthLine} points={[pointA, pointB]} lineWidth={8} lineCap={'round'} stroke={'#57c4fd'}>
                <Txt ref={arcLength} fontFamily={'JetBrains Mono'} fontWeight={800} fontSize={30} fill={'#57c4fd'} clip={false} />
            </Line>
            <Circle position={pointA} size={24} lineWidth={8} stroke={'#141414'} fill={'#57c4fd'} />
            <Circle position={pointB} size={24} lineWidth={8} stroke={'#141414'} fill={'#57c4fd'} />
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

    yield* beginSlide('Penumbra Slide');

    yield*
        tween(2, value => {
            exampleT(map(0.65, 0.9, easeInOutCubic(value)));
        });
    yield*
        tween(2, value => {
            exampleT(map(0.9, 0.65, easeInOutCubic(value)));
        });

    // yield*
    //     tween(5, value => {
    //         layers.dirCount(map(360, 4, easeInOutCubic(value)));
    //     });
    // yield* waitFor(1);
    // yield*
    //     tween(5, value => {
    //         layers.dirCount(map(4, 360, easeInOutCubic(value)));
    //     });
    // yield* waitFor(1);
});
