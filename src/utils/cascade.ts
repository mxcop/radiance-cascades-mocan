import { Vector2 } from "@motion-canvas/core";

class Cascade {
    public dirCount: number;
    public intervalRadius: Vector2;
    public branchFactor: number;
}

/**
 * Get a cascade configuration and index properties.
 */
const getCascade = (dirCount: number, interval0: number, branchFactor: number, i: number) => {
    let cascade: Cascade = { dirCount: 0, intervalRadius: new Vector2(), branchFactor: branchFactor };
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

export { Cascade, getCascade }
