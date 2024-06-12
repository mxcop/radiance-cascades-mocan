import { Circle, Line, Rect, RectProps, colorSignal, initial, signal } from "@motion-canvas/2d";
import { ColorSignal, PossibleColor, SignalValue, SimpleSignal, Vector2, waitFor } from "@motion-canvas/core";

const PI: number = 3.1415926535897932384626433832795;
const TAU: number = (PI * 2.0);

export interface BiProbeProps extends RectProps {
    showDot?: SignalValue<boolean>;
    color?: SignalValue<PossibleColor>;
    lineWidth?: SignalValue<number>;
    interval: SignalValue<Vector2>;
    directions: SignalValue<number>;
    branchFactor: SignalValue<number>;
    nextProbePos: SignalValue<Vector2>;
}

export class BiProbe extends Rect {
    @initial(false)
    @signal()
    public declare readonly showDot: SimpleSignal<boolean, this>;
    @initial('#fff')
    @colorSignal()
    public declare readonly color: ColorSignal<this>;
    @initial(10)
    @signal()
    public declare readonly lineWidth: SimpleSignal<number, this>;
    @signal()
    public declare readonly interval: SimpleSignal<Vector2, this>;
    @signal()
    public declare readonly directions: SimpleSignal<number, this>;
    @signal()
    public declare readonly branchFactor: SimpleSignal<number, this>;
    @signal()
    public declare readonly nextProbePos: SimpleSignal<Vector2, this>;

    public constructor(props?: BiProbeProps) {
        super({ ...props, width: '100%', height: '100%' });

        this.set_directions(this.directions());
    }

    public *animate_in(duration: number) {
        const nodes = this.getChildren() as Line[];

        for (let i = 0; i < nodes.length; i++) {
            yield nodes[i].end(0, 0);
        }

        for (let i = 0; i < nodes.length; i++) {
            yield nodes[i].end(1, duration);
            yield* waitFor(duration / nodes.length);
        }
        yield* waitFor(duration);
    }

    public *animate_out(duration: number) {
        const nodes = this.getChildren() as Line[];

        for (let i = 0; i < nodes.length; i++) {
            yield nodes[i].end(0, duration);
        }
        yield* waitFor(duration);
    }

    public set_directions(directions: number) {
        this.removeChildren();

        const dir_count: number = Math.floor(directions);
        const interval: Vector2 = this.interval();

        for (let i = 0; i < dir_count; i++) {
            const theta: number = TAU * ((i + 0.5) / dir_count);
            const ray_dir: Vector2 = new Vector2(Math.cos(theta), Math.sin(theta));

            for (let j = 0; j < this.branchFactor(); j++) {
                const theta_j: number = TAU * (((i * this.branchFactor() + j) + 0.5) / (dir_count * this.branchFactor()));
                const ray_dir_j: Vector2 = new Vector2(Math.cos(theta_j), Math.sin(theta_j));

                this.add(
                    <Line stroke={() => this.color()} lineWidth={() => this.lineWidth()} lineCap={'round'} points={
                        [
                            [ray_dir.x * interval.x, ray_dir.y * interval.x],
                            [this.nextProbePos().x + ray_dir_j.x * interval.y, this.nextProbePos().y + ray_dir_j.y * interval.y],
                        ]} layout={false} />
                );
            }

            // this.add(
            //     <Line stroke={() => this.color()} lineWidth={() => this.lineWidth()} lineCap={'round'} points={
            //         [
            //             [ray_dir.x * interval.x, ray_dir.y * interval.x],
            //             [ray_dir.x * interval.y, ray_dir.y * interval.y],
            //         ]} layout={false} />
            // );
        }

        if (this.showDot()) {
            this.add(
                <Circle fill={'#fff'} stroke={() => this.fill()} lineWidth={() => this.lineWidth()} size={() => this.lineWidth() * 3} layout={false} />
            );
        }
    }
}
