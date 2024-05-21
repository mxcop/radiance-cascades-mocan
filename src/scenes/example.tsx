import { Circle, Grid, Icon, Layout, Line, PossibleCanvasStyle, Rect, Txt, View2D, makeScene2D } from '@motion-canvas/2d';
import { SignalValue, Vector2, all, beginSlide, cos, createRef, createSignal, easeInOutCubic, loop, map, sin, tween, waitFor } from '@motion-canvas/core';
import { Cascade, drawCascade, getCascade } from '../utils/cascade';
import { drawProbe } from '../utils/probe';
import { Probe } from '../components/probe';
import openingSlide from './slides/opening-slide';
import { Three } from '../components/three';
import * as layers from '../three/penumbra';

// const Object = (config: {children: string}) => (
//   <Rect fill={'#eee'} padding={[8, 16]} fontFamily={'JetBrains Mono'} layout>
//       <Icon height={'100%'} color={'#111'} icon={'material-symbols:device-hub-rounded'} />
//       <Txt>{config.children}</Txt>
//   </Rect>
// );

export default makeScene2D(function* (view) {
  view.fill('#141414');

  yield* openingSlide(view);
  // yield* waitFor(1);
  // yield* beginSlide('Next Slide');

  const colors = ['#57c4fd', '#f85789', '#85e04c', '#222'];
  // for (let i = 3; i >= 0; i--) {
  //   const color = colors[i % 3];
  //   const cascade0: Cascade = getCascade(4, 16, 1, i - 1);
  //   const cascade1: Cascade = getCascade(4, 16, 1, i);
  //   drawProbe(view, new Vector2((1 << (i - 1)) * 16, (1 << (i - 1)) * 16), new Vector2((1 << i) * 16, (1 << i) * 16), cascade0, cascade1, color);
  // }

  // yield* layers.probeSize(4, 1);
  // yield* layers.probeSize(16, 1);


  // const directions = createSignal<number>(4);
  // const pre_probe = createRef<Probe>();
  // view.add(
  //   <Rect fill={'#242424'} x={256} width={'30%'} height={'50%'} radius={16} padding={48} direction={'column'} layout>
  //     <Txt marginBottom={48} fontFamily={'JetBrains Mono'} fontWeight={800} fontSize={40} fill={'#9a9a9a'}>CASCADE-0 PROBE</Txt>
  //     <Probe ref={pre_probe} showDot={true} fill={'#141414'} radius={12} color={'#57c4fd'} interval={new Vector2(0, 128)} directions={4} lineWidth={12} />
  //   </Rect>
  // );

  /* Update probe direction count as animation */
  // yield* loop(12, (i) => {
  //   pre_probe().set_directions(4 + i);
  //   return waitFor(0.2);
  // });

  //yield* pre_probe().lineWidth(4, 1).to(16, 1).wait(1);
  // yield* waitFor(1);
  // pre_probe().set_directions(8);
  // yield* waitFor(1);
  // pre_probe().set_directions(16);
  // yield* waitFor(1);

  // const cascade0: Cascade = getCascade(4, 16, 1, 0);
  // const cascade1: Cascade = getCascade(4, 16, 1, 1);
  // const cascade2: Cascade = getCascade(4, 16, 1, 2);
  // const bgs = 4;
  // drawCascade(view, new Vector2(-384 * bgs, -384 * bgs), new Vector2(768 * bgs, 768 * bgs), new Vector2(4 * bgs, 4 * bgs), cascade0, 'rgb(30, 30, 30)');
  // drawCascade(view, new Vector2(-384 * bgs, -384 * bgs), new Vector2(768 * bgs, 768 * bgs), new Vector2(2 * bgs, 2 * bgs), cascade1, 'rgb(35, 35, 35)');
  // drawCascade(view, new Vector2(-384 * bgs, -384 * bgs), new Vector2(768 * bgs, 768 * bgs), new Vector2(1 * bgs, 1 * bgs), cascade2, 'rgb(40, 40, 40)');
  // drawCascade(view, new Vector2(-384, -384), new Vector2(768, 768), new Vector2(4, 4), cascade0, colors[0]);
  // drawCascade(view, new Vector2(-384, -384), new Vector2(768, 768), new Vector2(2, 2), cascade1, colors[1]);
  // const test = drawCascade(view, new Vector2(-384, -384), new Vector2(768, 768), new Vector2(1, 1), cascade2, colors[2]);

  // yield* test().opacity(0, 1);
  // yield* test().opacity(1, 1);

  // yield* all(
  //   grid().end(1, 1).to(0.5, 1).wait(1),
  //   grid().start(0, 1).to(0.5, 1).wait(1),
  //   rect().end(0.5, 1).to(1, 1).wait(1),
  //   rect().start(0.5, 1).to(0, 1).wait(1),
  // );
});
