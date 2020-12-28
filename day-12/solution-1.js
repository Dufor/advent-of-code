const fs = require('fs');
const input = fs
  .readFileSync('input.txt', 'utf-8')
  .trim()
  .split('\n')
  .map(step => ({
    action: step[0],
    value: Number(step.replace(/[a-z]/gi, '')),
  }));

const INITIAL = {
  coordinates: [0, 0],
  rotation: 90,
};

const ROTATION_SIDES = {
  0: 'N',
  90: 'E',
  180: 'S',
  270: 'W',
};

const getNextStep = ({ step, acc }) => {
  let { action, value } = step;
  let { coordinates, rotation } = acc;

  let [longitude, latitude] = coordinates;

  if (action === 'F') { action = ROTATION_SIDES[rotation]; }

  switch (action) {
    case 'N': latitude += value; break;
    case 'S': latitude -= value; break;
    case 'W': longitude -= value; break;
    case 'E': longitude += value; break;
    case 'L': {
      rotation = rotation - value;
      while (rotation < 0) {
        rotation += 360;
      }
      break;
    }
    case 'R': {
      rotation += value;
      while (rotation >= 360) {
        rotation -= 360;
      }
      break;
    }
  }

  return {
    coordinates: [longitude, latitude],
    rotation,
  }
}

const getFirstResult = (array) => {
  const finish = array.reduce((acc, step) => getNextStep({ acc, step }), INITIAL)

  const [y, x] = finish.coordinates;

  return Math.abs(y) + Math.abs(x);
}

console.log('result: ', getFirstResult(input));
