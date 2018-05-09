/*
* This styles file doesn't use spreadsheets,
* but instead destructures properties into the konva components
*/

export default {
  construct: {
    width: 100,
    height: 100,
    fillLinearGradientStartPoint: { x: -50, y: -50 },
    fillLinearGradientEndPoint: { x: 50, y: 50 },
    fillLinearGradientColorStops: [0, 'red', 1, 'yellow'],
    shadowBlur: 5,
  },
  linkNode: {
    width: 50,
    height: 50,
    fill: 'black',
    shadowBlur: 5,
  },
};
