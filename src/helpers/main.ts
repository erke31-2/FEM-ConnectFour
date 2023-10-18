import { numCols, numRows } from "../constants/constants";

export const checkForWin = (board: Array<number[]>, player: number) => {
  //?check for a horizontal win, start from bottom line
  for (let row = numRows - 1; row >= 0; row--) {
    for (let col = 0; col <= numCols - 4; col++) {
      if (
        board[row][col] === player &&
        board[row][col + 1] === player &&
        board[row][col + 2] === player &&
        board[row][col + 3] === player
      ) {
        return true;
      }
    }
  }

  //?check for a vertical win, start from bottom line
  for (let row = numRows - 1; row >= 3; row--) {
    for (let col = 0; col < numCols; col++) {
      if (
        board[row][col] === player &&
        board[row - 1][col] === player &&
        board[row - 2][col] === player &&
        board[row - 3][col] === player
      ) {
        return true;
      }
    }
  }

  //?check for diagonal win, from btm-left to top-right
  for (let row = numRows - 1; row >= 3; row--) {
    for (let col = 0; col <= numCols - 4; col++) {
      if (
        board[row][col] === player &&
        board[row - 1][col + 1] === player &&
        board[row - 2][col + 2] === player &&
        board[row - 3][col + 3] === player
      ) {
        return true;
      }
    }
  }

  //?check for diagonal win, from btm-right to top-left
  for (let row = numRows - 1; row >= 3; row--) {
    for (let col = numCols  - 1; col >= 3 ; col--) {
      if (
        board[row][col] === player &&
        board[row - 1][col - 1] === player &&
        board[row - 2][col - 2] === player &&
        board[row - 3][col - 3] === player
      ) {
        return true;
      }
    }
  }

  return false;
};
