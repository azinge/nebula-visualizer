const generateOrigin = con =>
  [
    `${con.name}`,
    con.info.default && 'default',
    con.info.id && `"${con.info.id}"`,
    `(${con.pos.x}, ${con.pos.y})`,
  ]
    .filter(x => x)
    .join(' ');

const generateArgument = con =>
  [
    `${con.name}`,
    con.info.type && `${con.info.type}`,
    con.info.id && `"${con.info.id}"`,
    `(${con.pos.x}, ${con.pos.y})`,
  ]
    .filter(x => x)
    .join(' ');

const generateResult = con =>
  [`${con.name}`, con.info.type && `${con.info.type}`, `(${con.pos.x}, ${con.pos.y})`]
    .filter(x => x)
    .join(' ');

const generateFunction = con =>
  [`${con.name}`, con.info.id && `"${con.info.id}"`, `(${con.pos.x}, ${con.pos.y})`]
    .filter(x => x)
    .join(' ');

const generateParameter = con =>
  [`${con.name}`, con.info.id && `"${con.info.id}"`, `(${con.pos.x}, ${con.pos.y})`]
    .filter(x => x)
    .join(' ');

const generateReturn = con =>
  [`${con.name}`, `(${con.pos.x}, ${con.pos.y})`].filter(x => x).join(' ');

const generator = con =>
  ({
    Origin: generateOrigin,
    Argument: generateArgument,
    Result: generateResult,
    Function: generateFunction,
    Parameter: generateParameter,
    Return: generateReturn,
  }[con.name](con));

export default generator;
