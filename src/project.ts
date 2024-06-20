import {makeProject} from '@motion-canvas/core';

import opening from './scenes/opening?scene';
import giIntro from './scenes/gi/intro?scene';
import giProblem from './scenes/gi/problem?scene';
import giSolution from './scenes/gi/solution?scene';
import giCost from './scenes/gi/cost?scene';
import giExplain from './scenes/gi/explain?scene';
import penumbraIntro from './scenes/penumbra/intro?scene';
import penumbraAngular from './scenes/penumbra/angular?scene';
import penumbraSpatial from './scenes/penumbra/spatial?scene';
import penumbraHypothesis from './scenes/penumbra/hypothesis?scene';
import cascadesIntro from './scenes/cascades/intro?scene';
import cascadesAngular from './scenes/cascades/angular?scene';
import cascadesSpatial from './scenes/cascades/spatial?scene';
import cascadesFinal from './scenes/cascades/cascades?scene';
import rcIntro from './scenes/radiance/intro?scene';
import rcData from './scenes/radiance/data?scene';
import rcCascades from './scenes/radiance/cascades?scene';
import rcMerge from './scenes/radiance/merge?scene';
import rcResult from './scenes/radiance/result?scene';
import bilinearFixIntro from './scenes/bilinear-fix/intro?scene';
import bilinearFixProblem from './scenes/bilinear-fix/problem?scene';
import bilinearFixResult from './scenes/bilinear-fix/result?scene';
import theEnd from './scenes/the-end?scene';

import bilinearTest from './scenes/bilinear-fix-test?scene';

import {Code, LezerHighlighter} from '@motion-canvas/2d';
import {parser} from '@lezer/javascript';

Code.defaultHighlighter = new LezerHighlighter(parser);

export default makeProject({
  scenes: [opening, 
    giIntro, giExplain, /* giProblem, */ giSolution, giCost, 
    penumbraIntro, penumbraAngular, penumbraSpatial, penumbraHypothesis, 
    cascadesIntro, cascadesAngular, cascadesSpatial, cascadesFinal, 
    rcIntro, rcData, rcCascades, rcMerge, rcResult,
    bilinearFixIntro, bilinearFixProblem, bilinearFixResult,
    theEnd],
});
