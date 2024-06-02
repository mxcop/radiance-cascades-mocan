import {makeProject} from '@motion-canvas/core';

import opening from './scenes/opening?scene';
import penumbra from './scenes/penumbra?scene';
import giProblem from './scenes/gi/problem?scene';
import giSolution from './scenes/gi/solution?scene';
import giCost from './scenes/gi/cost?scene';
import penumbraAngular from './scenes/penumbra/angular?scene';
import penumbraSpatial from './scenes/penumbra/spatial?scene';

import {Code, LezerHighlighter} from '@motion-canvas/2d';
import {parser} from '@lezer/javascript';

Code.defaultHighlighter = new LezerHighlighter(parser);

export default makeProject({
  scenes: [opening, giProblem, giSolution, giCost, penumbraAngular, penumbraSpatial, penumbra],
});
