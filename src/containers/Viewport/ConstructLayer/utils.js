import { compileProgram, analyzeProgram } from 'nebula';

export const runProgram = () => {
  const programText = `
Origin default "hello" (0,0,0)
  Result void <0,0,1>

Function "print" (0,1,0)
  Parameter "message" <0,1,0>
    initialize string "Hello, world!"
  Return <0,2,0>

Link (0,3,0) (0,0,1)
`;

  const prgrm = compileProgram(programText);
  console.log(prgrm);
  // eslint-disable-next-line no-eval
  return `result: ${eval(prgrm)}`;
};

export const createConstructs = () => {
  const programText = `
Origin default "hello" (0,0,0)
  Result void <0,0,1>

Function "print" (0,1,0)
  Parameter "message" <0,1,0>
    initialize string "Hello, world!"
  Return <0,2,0>

Link (0,3,0) (0,0,1)
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
