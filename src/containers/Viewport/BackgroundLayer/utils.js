export const generateColorStops = (length, scale, basePattern) => {
  const ratio = length / scale;
  const applyFunc = f => basePattern.map(x => (typeof x === 'number' ? f(x) : x));
  const colorStops = [];
  for (let i = 0; i < ratio; i += 1) {
    Array.prototype.push.apply(colorStops, applyFunc(x => (x + i) / ratio));
  }
  return colorStops;
};

export const largeBasePattern = [
  0,
  '#3333FF',
  0.01,
  '#3333FF',
  0.01,
  'transparent',
  0.99,
  'transparent',
  0.99,
  '#3333FF',
  1,
  '#3333FF',
];

export const smallBasePattern = [
  0,
  '#9198e5',
  0.01,
  '#9198e5',
  0.01,
  'transparent',
  0.99,
  'transparent',
  0.99,
  '#9198e5',
  1,
  '#9198e5',
];

export const axisBasePattern = [
  0,
  'transparent',
  0.49,
  'transparent',
  0.49,
  'black',
  0.51,
  'black',
  0.51,
  'transparent',
  1,
  'transparent',
]
