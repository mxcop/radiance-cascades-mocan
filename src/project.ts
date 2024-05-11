import {makeProject} from '@motion-canvas/core';

import example from './scenes/example?scene';
import penumbra from './scenes/penumbra?scene';

export default makeProject({
  scenes: [example, penumbra],
});
