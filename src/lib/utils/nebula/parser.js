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

const parseParameter = con => {
  const result = {
    id: con.id && con.id.value,
    type: con.type,
  };
  if (con.isLeaf) {
    if (con.body.getClassName() === 'Initialize') {
      result.init = con.body.value.value;
    } else if (con.body.getClassName() === 'Access') {
      result.access = con.body.id.value;
    }
  }
  return result;
};

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
