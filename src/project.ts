import {makeProject} from '@motion-canvas/core';

import example from './scenes/example?scene';
import penumbra from './scenes/penumbra?scene';
import basicRadiance from './scenes/basic-radiance?scene';

export default makeProject({
  scenes: [example, penumbra, basicRadiance],
});
