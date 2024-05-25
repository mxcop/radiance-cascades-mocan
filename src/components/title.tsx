import {
    Layout,
    LayoutProps,
    Txt,
} from '@motion-canvas/2d/lib/components';
import { initial, signal } from '@motion-canvas/2d/lib/decorators';
import { makeRef } from '@motion-canvas/core';
import { SignalValue, SimpleSignal } from '@motion-canvas/core/lib/signals';

export interface SlideTitleProps extends LayoutProps {
    title?: SignalValue<string>;
    chapter?: SignalValue<string>;
}

export class SlideTitle extends Layout {
    @initial('Primary')
    @signal()
    public declare readonly title: SimpleSignal<string, this>;

    @initial('Secondary')
    @signal()
    public declare readonly chapter: SimpleSignal<string, this>;

    public readonly titleTxt: Txt;
    public readonly chapterTxt: Txt;

    public constructor(props?: SlideTitleProps) {
        super({
            layout: true,
            direction: 'column-reverse',
            padding: 48,
            width: '100%',
            height: '100%',
            ...props,
        });

        this.add(
            <>
            <Txt ref={makeRef(this, 'chapterTxt')} text={props.chapter} fill={'#848484'} stroke={'#141414'} lineJoin={'round'} lineWidth={32} strokeFirst={true} fontFamily={'JetBrains Mono'} fontSize={30} fontWeight={800} />
            <Txt ref={makeRef(this, 'titleTxt')} text={props.title} fill={'#e4e4e4'} stroke={'#141414'} lineJoin={'round'} lineWidth={32} strokeFirst={true} fontFamily={'JetBrains Mono'} fontSize={60} fontWeight={800} />
            </>
        );
    }

    protected draw(context: CanvasRenderingContext2D) {
        super.draw(context);
    }
}