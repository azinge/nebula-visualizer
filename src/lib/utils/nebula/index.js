import { compileProgram, analyzeProgram } from 'nebula';

import parser from './parser';
import styles from './styles';
import generator from './generator';

export const runProgram = (programText, params) => {
  const program = compileProgram(programText, params);
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

export const parseConstruct = construct => ({
  pos: locationToUnitCoords(construct.location),
  children: Array.isArray(construct.body)
    ? construct.body.filter(c => c.location).map(parseConstruct)
    : [],
  styles: styles[construct.getClassName()],
  name: construct.getClassName(),
  info: parser(construct),
  id: construct.key,
});

export const parseLink = construct => ({
  from: locationToUnitCoords(construct.from),
  to: locationToUnitCoords(construct.to),
  styles: styles.linkNode,
  id: construct.key,
});

export const generateProgram = (constructs, links, constructMap) => {
  const createConstructText = (con, level) => {
    const children = con.children
      .map(id => constructMap[id])
      .map(con2 => createConstructText(con2, level + 1));
    const init = [con.info.init]
      .filter(x => x !== undefined)
      .map(
        val =>
          `${'  '.repeat(level + 1)}initialize ${con.info.type} ${
            typeof val === 'string' ? `"${val}"` : val
          }`,
      );
    const access = [con.info.access]
      .filter(x => x !== undefined)
      .map(val => `${'  '.repeat(level + 1)}access ${con.info.type} "${val}"`);
    return [`${'  '.repeat(level)}${generator(con)}`, ...init, ...access, ...children].join('\n');
  };

  const textConstructs = constructs
    .map(id => constructMap[id])
    .map(con => createConstructText(con, 0));
  const textLinks = links
    .map(id => constructMap[id])
    .map(link => `Link (${link.from.x}, ${link.from.y}) (${link.to.x}, ${link.to.y})`);
  return `${textConstructs.join('\n\n')}\n\n${textLinks.join('\n')}`;
};
