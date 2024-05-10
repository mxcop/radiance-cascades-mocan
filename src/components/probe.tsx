import { Circle, Line, Rect, RectProps, colorSignal, initial, signal } from "@motion-canvas/2d";
import { ColorSignal, PossibleColor, SignalValue, SimpleSignal, Vector2 } from "@motion-canvas/core";

const PI: number = 3.1415926535897932384626433832795;
const TAU: number = (PI * 2.0);

export interface ProbeProps extends RectProps {
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

    public constructor(props?: ProbeProps) {
        super({ ...props, width: '100%', height: '100%' });

        this.set_directions(this.directions());
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
