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
# Recursive program for Pow

Origin default "_pow" (0,0)
  Argument number "b" <0,2>
  Argument number "p" <0,4>
  Result number <0,6>

Function "ternary" (2,0)
  Parameter "condition" <0,2>
  Parameter "true" <0,4>
    initialize number 1
  Parameter "false" <0,6>
  Return <0,8>

Function "equals" (4,0)
  Parameter "p1" <0,2>
    access number "p"
  Parameter "p2" <0,4>
    initialize number 0
  Return <0,6>

Function "ternary" (6,0)
  Parameter "condition" <0,2>
  Parameter "true" <0,4>
    initialize number 1
  Parameter "false" <0,6>
  Return <0,8>

Function "lessThan" (8,0)
  Parameter "p1" <0,2>
    access number "p"
  Parameter "p2" <0,4>
    initialize number 0
  Return <0,6>

# handle positive case

Function "multiply" (10,0)
  Parameter "p1" <0,2>
  Parameter "p2" <0,4>
    access number "b"
  Return <0,6>

Function "_pow" (12,0)
  Parameter "b" <0,2>
    access number "b"
  Parameter "p" <0,4>
  Return <0,6>

Function "subtract" (14,0)
  Parameter "p1" <0,2>
    access number "p"
  Parameter "p2" <0,4>
    initialize number 1
  Return <0,6>

# handle negative case

Function "divide" (16,0)
  Parameter "p1" <0,2>
  Parameter "p2" <0,4>
    access number "b"
  Return <0,6>

Function "_pow" (18,0)
  Parameter "b" <0,2>
    access number "b"
  Parameter "p" <0,4>
  Return <0,6>

Function "add" (20,0)
  Parameter "p1" <0,2>
    access number "p"
  Parameter "p2" <0,4>
    initialize number 1
  Return <0,6>

Link (2,8) (0,6)
Link (4,6) (2,2)
Link (6,8) (2,6)
Link (8,6) (6,2)

Link (10,6) (6,6)
Link (12,6) (10,2)
Link (14,6) (12,4)

Link (16,6) (6,4)
Link (18,6) (16,2)
Link (20,6) (18,4)
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
