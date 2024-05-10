import { Circle, Layout, Line, LineSegment, PossibleCanvasStyle, View2D } from "@motion-canvas/2d";
import { Reference, SignalValue, Vector2 } from "@motion-canvas/core";
import { Cascade } from "./cascade";

const PI: number = 3.1415926535897932384626433832795;
const TAU: number = (PI * 2.0);

const drawLine = (view: View2D | Layout, x0: number, y0: number, x1: number, y1: number, c: SignalValue<PossibleCanvasStyle>) => {
    view.add(
        <Line stroke={c} lineWidth={10} lineCap={'round'} points={
            [
                [x0, y0],
                [x1, y1],
            ]} />
    );
};

const drawProbe = (view: View2D | Layout, p0: Vector2, cascade0: Cascade, c: SignalValue<PossibleCanvasStyle>) => {
    let probe: Layout;
    view.add(<Layout ref={instance => {
        probe = instance;
      }} />);

    for (let i = 0; i < cascade0.dirCount; i++) {
        const theta: number = TAU * ((i + 0.5) / cascade0.dirCount);
        const ray_dir: Vector2 = new Vector2(Math.cos(theta), Math.sin(theta));

        drawLine(probe,
            p0.x + ray_dir.x * cascade0.intervalRadius.x,
            p0.y + ray_dir.y * cascade0.intervalRadius.x,
            p0.x + ray_dir.x * cascade0.intervalRadius.y,
            p0.y + ray_dir.y * cascade0.intervalRadius.y,
            c
        );
    }

    // const radius: number = cascade0.intervalRadius.y * 2;
    // view.add(
    //     <Circle stroke={c} lineWidth={10} position={p0} width={radius} height={radius} />
    // )
};

const drawProbeForked = (view: View2D, p0: Vector2, p1: Vector2, cascade0: Cascade, cascade1: Cascade, c: SignalValue<PossibleCanvasStyle>) => {
    for (let i = 0; i < cascade1.dirCount; i++) {
        if (cascade1.index != 0) {
            const prev_theta: number = TAU * ((Math.floor(i / (cascade1.dirCount / cascade0.dirCount)) + 0.5) / cascade0.dirCount);
            const prev_ray_dir: Vector2 = new Vector2(Math.cos(prev_theta), Math.sin(prev_theta));

            const theta: number = TAU * ((i + 0.5) / cascade1.dirCount);
            const ray_dir: Vector2 = new Vector2(Math.cos(theta), Math.sin(theta));

            drawLine(view,
                p0.x + prev_ray_dir.x * cascade1.intervalRadius.x,
                p0.y + prev_ray_dir.y * cascade1.intervalRadius.x,
                p1.x + ray_dir.x * cascade1.intervalRadius.y,
                p1.y + ray_dir.y * cascade1.intervalRadius.y,
                c
            );

            continue;
        }

        const theta: number = TAU * ((i + 0.5) / cascade1.dirCount);
        const ray_dir: Vector2 = new Vector2(Math.cos(theta), Math.sin(theta));

        drawLine(view,
            p1.x + ray_dir.x * cascade1.intervalRadius.x,
            p1.y + ray_dir.y * cascade1.intervalRadius.x,
            p1.x + ray_dir.x * cascade1.intervalRadius.y,
            p1.y + ray_dir.y * cascade1.intervalRadius.y,
            c
        );
    }

    const radius: number = cascade1.intervalRadius.y * 2;
    view.add(
        <Circle stroke={c} lineWidth={10} position={p1} width={radius} height={radius} />
    )
};

export { drawProbe }
