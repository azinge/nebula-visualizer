import { compileProgram, analyzeProgram } from 'nebula';

import parser from './parser';
import styles from './styles';

export const runProgram = programText => {
  const program = compileProgram(programText);
  // eslint-disable-next-line no-eval
  return eval(program);
};

export const createConstructs = programText => {
  const program = analyzeProgram(programText);

  const constructs = [];
  const links = [];

  program.body.forEach(construct => {
    if (construct.getClassName() === 'Link') {
      links.push(construct);
    } else {
      constructs.push(construct);
    }
  });
  return { constructs, links };
};

export const locationToUnitCoords = loc => ({
  x: loc.coordinate.x.value,
  y: loc.coordinate.y.value,
});

export const parseConstruct = (construct, key) => ({
  pos: locationToUnitCoords(construct.location),
  children: Array.isArray(construct.body)
    ? construct.body.filter(c => c.location).map(parseConstruct)
    : [],
  styles: styles[construct.getClassName()],
  name: construct.getClassName(),
  info: parser(construct),
  key,
});

export const parseLink = (construct, key) => ({
  from: locationToUnitCoords(construct.from),
  to: locationToUnitCoords(construct.to),
  key,
});
