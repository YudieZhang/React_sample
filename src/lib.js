
const direction = {
  horizontal: 1,
  vertical: 2,
  leftOblique: 3,
  rightOblique: 4
};

/**
 * judge isornot end
 * @param {Array} arr
 * @param {Number} x
 * @param {Number} y
 * win status
 * The same four pieces are the same
 * Horizontal line, vertical line, left slash, right slash
 */
function judgeIsOrNotWin(arr, x, y) {
  let target = arr[x][y],
    rowLen = arr.length,
    colLen = arr[0].length,
    startNode = { x, y },
    nodeList;

  function check(node) {
    if (node.x >= rowLen || node.x < 0 || node.y >= colLen || node.y < 0) {
      return false;
    }
    if (arr[node.x][node.y] === target) {
      return true;
    }
    return false;
  }

  for (let i = 1; i <= 4; i++) {
    nodeList = [startNode];
    let left = startNode,
      right = startNode,
      leftVal = true,
      rightVal = true;

    // Starting from the current node, detecting left and right or up and down simultaneously
    while (leftVal || rightVal) {
      if (leftVal) {
        left = getCoordinate(i, left, -1);
        leftVal = check(left) && nodeList.push(left);
      }
      if (rightVal) {
        right = getCoordinate(i, right, 1);
        rightVal = check(right) && nodeList.push(right);
      }

      if (nodeList.length === 4) {
        return nodeList;
      }
    }
  }
  return nodeList;
}


function getCoordinate(direct, node, tag) {
  let newNode;
  switch (direct) {
    case direction.horizontal:
      newNode = {
        x: node.x,
        y: node.y + tag
      };
      break;
    case direction.vertical:
      newNode = {
        x: node.x + tag,
        y: node.y
      };
      break;
    case direction.leftOblique:
      newNode = {
        x: node.x + tag,
        y: node.y + tag
      };
      break;
    case direction.rightOblique:
      newNode = {
        x: node.x - tag,
        y: node.y + tag
      };
      break;
    default:
      newNode = {
        x: -1,
        y: -1
      };
  }
  return newNode;
}

export { judgeIsOrNotWin };
