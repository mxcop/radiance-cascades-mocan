import {makeProject} from '@motion-canvas/core';

import opening from './scenes/opening?scene';
import penumbra from './scenes/penumbra?scene';
import basicRadiance from './scenes/basic-radiance?scene';
import giWhat from './scenes/gi/what?scene';
import giHow from './scenes/gi/how?scene';

export default makeProject({
  scenes: [opening, giWhat, giHow, penumbra, basicRadiance],
});
