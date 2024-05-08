import { Circle, Line, PossibleCanvasStyle, View2D } from "@motion-canvas/2d";
import { SignalValue, Vector2 } from "@motion-canvas/core";
import { Cascade } from "./cascade";

const PI: number = 3.1415926535897932384626433832795;
const TAU: number = (PI * 2.0);

const drawLine = (view: View2D, x0: number, y0: number, x1: number, y1: number, c: SignalValue<PossibleCanvasStyle>) => {
    view.add(
        <Line stroke={c} lineWidth={10} lineCap={'round'} points={
            [
                [x0, y0],
                [x1, y1],
            ]} />
    );
};

const drawProbe = (view: View2D, p: Vector2, cascade: Cascade, c: SignalValue<PossibleCanvasStyle>) => {
    for (let i = 0; i < cascade.dirCount; i++) {
        const theta: number = TAU * ((i + 0.5) / cascade.dirCount);
        const ray_dir: Vector2 = new Vector2(Math.cos(theta), Math.sin(theta));

        drawLine(view,
            p.x + ray_dir.x * cascade.intervalRadius.x,
            p.y + ray_dir.y * cascade.intervalRadius.x,
            p.x + ray_dir.x * cascade.intervalRadius.y,
            p.y + ray_dir.y * cascade.intervalRadius.y,
            c
        );
    }

    const radius: number = cascade.intervalRadius.y * 2;
    view.add(
        <Circle stroke={c} lineWidth={10} position={p} width={radius} height={radius} />
    )
};

export { drawProbe }
