import { Circle, Layout, LayoutProps, Rect, Txt } from "@motion-canvas/2d";
import { makeRef, range } from "@motion-canvas/core";
import { Vector } from "./vector";

export function Axis({
    refs,
    ref,
    color,
    label,
    ...props
}: {
    refs: { value: Layout; handle: Circle; range: Vector; text: Txt };
    color: string;
    label: string;
} & LayoutProps) {
    return (
        <Layout ref={makeRef(refs, 'value')} {...props}>
            <Txt
                ref={makeRef(refs, 'text')}
                fill={color}
                x={380}
                y={10}
                offsetY={-1}
            >
                {label}
            </Txt>
            <Vector
                lineWidth={4}
                startArrow
                arrowSize={16}
                fromX={-420}
                toX={420}
                stroke={'#444'}
            >
                {range(5).map(i => (
                    <>
                        <Rect x={(i - 2) * 140} width={4} height={16} fill={'#444'}>
                            <Txt fill={'#444'} offsetY={-1} y={10}>
                                {(i - 2).toFixed()}
                            </Txt>
                        </Rect>
                    </>
                ))}

                <Vector
                    ref={makeRef(refs, 'range')}
                    lineWidth={8}
                    stroke={color}
                    fromX={-140}
                    toX={140}
                    endArrow={false}
                >
                    <Circle
                        ref={makeRef(refs, 'handle')}
                        width={16}
                        height={16}
                        fill={color}
                    />
                </Vector>
            </Vector>
        </Layout>
    );
}