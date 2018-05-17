const parseOrigin = con => ({
  default: con.isDefault,
  id: con.id && con.id.value,
});

const parseArgument = con => ({
  id: con.id && con.id.value,
  type: con.type,
});

const parseResult = con => ({
  type: con.type,
});

const parseFunction = con => ({
  id: con.id && con.id.value,
});

const parseParameter = con => ({
  id: con.id && con.id.value,
  type: con.type,
});

const parseReturn = () => ({});

export default con =>
  ({
    Origin: parseOrigin,
    Argument: parseArgument,
    Result: parseResult,
    Function: parseFunction,
    Parameter: parseParameter,
    Return: parseReturn,
  }[con.getClassName()](con));
