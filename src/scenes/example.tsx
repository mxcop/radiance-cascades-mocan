import { Circle, Grid, Icon, Layout, Line, PossibleCanvasStyle, Rect, Txt, View2D, makeScene2D } from '@motion-canvas/2d';
import { SignalValue, Vector2, all, cos, createRef, sin } from '@motion-canvas/core';
import { Cascade, getCascade } from '../utils/cascade';
import { drawProbe } from '../utils/probe';

const Object = (config: {children: string}) => (
  <Rect fill={'#eee'} padding={[8, 16]} fontFamily={'JetBrains Mono'} layout>
      <Icon height={'100%'} color={'#111'} icon={'material-symbols:device-hub-rounded'} />
      <Txt>{config.children}</Txt>
  </Rect>
);

export default makeScene2D(function* (view) {

  const colors = ['#57c4fd', '#f85789', '#85e04c'];
  for (let i = 3; i >= 0; i--) {
    const color = colors[i % 3];
    const cascade: Cascade = getCascade(4, 16, 1, i);
    drawProbe(view, new Vector2(0, 0), cascade, color);
  }

  // yield* all(
  //   grid().end(1, 1).to(0.5, 1).wait(1),
  //   grid().start(0, 1).to(0.5, 1).wait(1),
  //   rect().end(0.5, 1).to(1, 1).wait(1),
  //   rect().start(0.5, 1).to(0, 1).wait(1),
  // );
});
