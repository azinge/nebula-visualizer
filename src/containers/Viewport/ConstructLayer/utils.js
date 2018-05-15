import { compileProgram, analyzeProgram } from 'nebula';

import styles from './styles';

export const runProgram = () => {
  const programText = `
Origin default "hello" (0,0)
  Result void <0,1>

Function "print" (1,0)
  Parameter "message" <1,0>
    initialize string "Hello, world!"
  Return <2,0>

Link (3,0) (0,1)
`;

  const prgrm = compileProgram(programText);
  console.log(prgrm);
  // eslint-disable-next-line no-eval
  return `result: ${eval(prgrm)}`;
};

export const createConstructs = () => {
  const programText = `
Origin default "hello" (0,0)
  Result void <5,3>

Function "print" (2,3)
  Parameter "message" <1,0>
    initialize string "Hello, world!"
  Return <0,1>

Link (2,4) (5,3)
`;

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
  key,
});

export const parseLink = (construct, key) => ({
  from: locationToUnitCoords(construct.from),
  to: locationToUnitCoords(construct.to),
  key,
});
