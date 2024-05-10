import { Layout, PossibleCanvasStyle, View2D } from "@motion-canvas/2d";
import { Reference, SignalValue, Vector2, createRef } from "@motion-canvas/core";
import { drawProbe } from "./probe";

class Cascade {
    public index: number;
    public dirCount: number;
    public intervalRadius: Vector2;
    public branchFactor: number;
}

/**
 * Get a cascade configuration and index properties.
 */
const getCascade = (dirCount: number, interval0: number, branchFactor: number, i: number) => {
    let cascade: Cascade = { index: i, dirCount: 0, intervalRadius: new Vector2(), branchFactor: branchFactor };
    cascade.dirCount = (1 << (branchFactor * i)) * dirCount;
    const scale: Vector2 = interval_scale(cascade, i);
    cascade.intervalRadius = new Vector2(scale.x * interval0, scale.y * interval0);
    return cascade;
}

const interval_start = (cascade: Cascade, i: number) => {
    return i == 0 ? 0.0 : (1 << (cascade.branchFactor * i));
}

const interval_scale = (cascade: Cascade, i: number): Vector2 => {
    return new Vector2(interval_start(cascade, i), interval_start(cascade, i + 1));
}

const drawCascade = (view: View2D, draw_pos: Vector2, draw_area: Vector2, probe_count: Vector2, cascade0: Cascade, c: SignalValue<PossibleCanvasStyle>): Reference<Layout> => {
    const probe_scale: Vector2 = new Vector2(draw_area.x / probe_count.x, draw_area.y / probe_count.y);

    let cascade = createRef<Layout>();
    view.add(<Layout ref={cascade} position={draw_pos} width={draw_area.x} height={draw_area.y} />);
    const layout = cascade();

    for (let y = 0; y < probe_count.y; y++) {
        for (let x = 0; x < probe_count.x; x++) {
            const pos: Vector2 = new Vector2((x + 0.5) * probe_scale.x, (y + 0.5) * probe_scale.y);
            drawProbe(layout, pos, cascade0, c);
        }
    }

    return cascade;
};

export { Cascade, getCascade, drawCascade }
