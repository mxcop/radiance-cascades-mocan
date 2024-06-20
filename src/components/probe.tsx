import { Circle, Line, Rect, RectProps, colorSignal, initial, signal } from "@motion-canvas/2d";
import { ColorSignal, PossibleColor, SignalValue, SimpleSignal, Vector2, waitFor } from "@motion-canvas/core";

const PI: number = 3.1415926535897932384626433832795;
const TAU: number = (PI * 2.0);

export interface ProbeProps extends RectProps {
    hide?: SignalValue<boolean>;
    showDot?: SignalValue<boolean>;
    color?: SignalValue<PossibleColor>;
    lineWidth?: SignalValue<number>;
    interval: SignalValue<Vector2>;
    directions: SignalValue<number>;
}

export class Probe extends Rect {
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
    @initial(false)
    @signal()
    public declare readonly hide: SimpleSignal<boolean, this>;

    public constructor(props?: ProbeProps) {
        super({ ...props, width: '100%', height: '100%' });

        this.set_directions(this.directions());

        if (this.hide()) {
            const nodes = this.getChildren() as Line[];
            for (let i = 0; i < nodes.length; i++) {
                nodes[i].end(0);
                nodes[i].opacity(0);
            }
        }
    }

    public *animate_in(duration: number) {
        const nodes = this.getChildren() as Line[];

        for (let i = 0; i < nodes.length; i++) {
            yield nodes[i].end(1, duration);
            yield nodes[i].opacity(1, 0.5);
        }
        yield* waitFor(duration);
    }

    public *animate_out(duration: number) {
        const nodes = this.getChildren() as Line[];

        for (let i = 0; i < nodes.length; i++) {
            yield nodes[i].end(0, duration);
        }
        yield* waitFor(duration - 0.5);
        for (let i = 0; i < nodes.length; i++) {
            yield nodes[i].opacity(0, 0.5);
        }
        yield* waitFor(0.5);
    }

    public set_directions(directions: number) {
        this.removeChildren();

        const dir_count: number = Math.floor(directions);
        const interval: Vector2 = this.interval();

        for (let i = 0; i < dir_count; i++) {
            const theta: number = TAU * ((i + 0.5) / dir_count);
            const ray_dir: Vector2 = new Vector2(Math.cos(theta), Math.sin(theta));

            this.add(
                <Line stroke={() => this.color()} lineWidth={() => this.lineWidth()} lineCap={'round'} points={
                    [
                        [ray_dir.x * interval.x, ray_dir.y * interval.x],
                        [ray_dir.x * interval.y, ray_dir.y * interval.y],
                    ]} layout={false} />
            );
        }

        if (this.showDot()) {
            this.add(
                <Circle fill={'#fff'} stroke={() => this.fill()} lineWidth={() => this.lineWidth()} size={() => this.lineWidth() * 3} layout={false} />
            );
        }
    }
}
