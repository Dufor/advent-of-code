const fs = require('fs');
const input = fs
  .readFileSync('input.txt', 'utf-8')
  .trim()
  .split('\n')
  .map(step => ({
    action: step[0],
    value: Number(step.replace(/[a-z]/gi, '')),
  }));

const INITIAL_COORDINATES = {
  ship: [0, 0],
  waypoint: [10, 1],
};

const ROTATE = {
  0: (x, y) => ({ x, y }),
  90: (x, y) => ({ x: y, y: -x }),
  180: (x, y) => ({ x: -x, y: -y }),
  270: (x, y) => ({ x: -y, y: x }),
};

const getNextStep = ({ step, coordinates }) => {
  let { action, value } = step;
  let { ship, waypoint } = coordinates;

  let [xShip, yShip] = ship;
  let [xWaypoint, yWaypoint] = waypoint;

  switch (action) {
    case 'N': yWaypoint += value; break;
    case 'S': yWaypoint -= value; break;
    case 'E': xWaypoint += value; break;
    case 'W': xWaypoint -= value; break;
    case 'F': {
      xShip += (xWaypoint * value);
      yShip += (yWaypoint * value);
      break;
    }
  }

  if (/[LR]/gi.test(action)) {
    while (value >= 360) {
      value -= 360;
    }

    const valueByAction = action === 'L' ? 360 - value : value;
    const {x, y} = ROTATE[valueByAction](xWaypoint, yWaypoint);

    xWaypoint = x;
    yWaypoint = y;
  }

  return {
    ship: [xShip, yShip],
    waypoint: [xWaypoint, yWaypoint],
  }
};

const getSecondResult = (array) => {
  const finish = array.reduce((coordinates, step) => (
      getNextStep({ coordinates, step })),
    INITIAL_COORDINATES,
  );

  const [x, y] = finish.ship;

  return Math.abs(x) + Math.abs(y)
}

console.log('result: ', getSecondResult(input));
