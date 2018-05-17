import { compileProgram, analyzeProgram } from 'nebula';

import examples from './example-programs';
import parser from './construct-parser';
import styles from './styles';

export const runProgram = () => {
  const programText = examples.helloWorld2D;
  const prgrm = compileProgram(programText);
  console.log(prgrm);
  // eslint-disable-next-line no-eval
  return `result: ${eval(prgrm)}`;
};

export const createConstructs = () => {
  const programText = examples.pow2D;
  const prgm = analyzeProgram(programText);

  const constructs = [];
  const links = [];

  prgm.body.forEach(construct => {
    if (construct.getClassName() === 'Link') {
      links.push(construct);
    } else {
      constructs.push(construct);
    }
  });
  return { constructs, links };
};

export const unitToRawCoords = ({ x, y }) => {
  const blockSize = 50;
  const sizeAdjustment = {
    x: blockSize,
    y: blockSize,
  };
  const origin = {
    x: 2000 - sizeAdjustment.x,
    y: 2000 - sizeAdjustment.y,
  };
  const scaledCoords = {
    x: blockSize * x,
    y: blockSize * y,
  };
  return {
    x: origin.x + scaledCoords.x,
    y: origin.y - scaledCoords.y,
  };
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
