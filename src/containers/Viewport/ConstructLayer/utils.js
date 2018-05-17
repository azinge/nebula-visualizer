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
    x: x * blockSize,
    y: y * blockSize,
  };
  return {
    x: origin.x + scaledCoords.x,
    y: origin.y - scaledCoords.y,
  };
};

export const rawToUnitCoords = ({ x, y }) => {
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
    x: x - origin.x,
    y: y - origin.y,
  };
  return {
    x: scaledCoords.x / blockSize,
    y: scaledCoords.y / -blockSize,
  };
};
