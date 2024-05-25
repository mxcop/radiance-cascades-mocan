import {makeProject} from '@motion-canvas/core';

import opening from './scenes/opening?scene';
import penumbra from './scenes/penumbra?scene';
import basicRadiance from './scenes/basic-radiance?scene';
import giWhat from './scenes/gi/what?scene';
import giHow from './scenes/gi/how?scene';
import penumbraAngular from './scenes/penumbra/angular?scene';
import penumbraSpatial from './scenes/penumbra/spatial?scene';

import {Code, LezerHighlighter} from '@motion-canvas/2d';
import {parser} from '@lezer/javascript';

Code.defaultHighlighter = new LezerHighlighter(parser);

export default makeProject({
  scenes: [opening, giWhat, giHow, basicRadiance, penumbraAngular, penumbraSpatial, penumbra],
});
