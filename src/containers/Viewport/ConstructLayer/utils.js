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
