let currentPuzzle = "";

class SudokuSolver {
  getPuzzleArray(puzzleString) {
    const puzzleArray = [[], [], [], [], [], [], [], [], []];
    for (let i = 0; i <= 80; i++) {
      let value = puzzleString[i];
      value === "." || !value
        ? (puzzleArray[Math.floor(i / 9)][i % 9] = " ")
        : (puzzleArray[Math.floor(i / 9)][i % 9] = value);
    }
    return puzzleArray;
  }
  getRow(puzzle, row) {
    return puzzle[row];
  }

  getColumn(puzzle, row, column) {
    let col = [];
    for (let i in puzzle) {
      col.push(puzzle[i][column]);
    }
    return col;
  }
  getRegion(puzzle, row, column) {
    let region = [];
    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 3; c++) {
        region.push(
          puzzle[Math.floor(row / 3) * 3 + r][Math.floor(column / 3) * 3 + c]
        );
      }
    }
    return region;
  }

  validate(puzzleString) {
    if (puzzleString.length !== 81) {
      return {
        error: "Expected puzzle to be 81 characters long",
      };
    } else if (!/^[1-9.]+$/.test(puzzleString)) {
      return { error: "Invalid characters in puzzle" };
    } else {
      for (let i in puzzleString) {
        let val = puzzleString[i];
        let row = Math.floor(i / 9);
        let column = i % 9;
        if (val !== ".") {
          let temp = puzzleString.split("");
          temp[i] = ".";
          if (
            this.checkRowPlacement(temp, row, column, val) &&
            this.checkColPlacement(temp, row, column, val) &&
            this.checkRegionPlacement(temp, row, column, val)
          ) {
            temp[i] = val;
            puzzleString = temp.join("");
          } else {
            return { error: "Puzzle cannot be solved" };
          }
        }
      }
      return true;
    }
  }
  checkRowPlacement(puzzleString, row, column, value) {
    let puzzle = this.getPuzzleArray(puzzleString);
    let puzzleRow = this.getRow(puzzle, row, column);
    return !(
      puzzleRow.includes(value.toString()) &&
      puzzleRow[column] !== value.toString()
    );
  }

  checkColPlacement(puzzleString, row, column, value) {
    let puzzle = this.getPuzzleArray(puzzleString);
    let puzzleCol = this.getColumn(puzzle, row, column);
    return !(
      puzzleCol.includes(value.toString()) &&
      puzzleCol[row] !== value.toString()
    );
  }
  checkRegionPlacement(puzzleString, row, column, value) {
    let puzzle = this.getPuzzleArray(puzzleString);
    let puzzleRegion = this.getRegion(puzzle, row, column);
    return !(
      puzzleRegion.includes(value.toString()) &&
      puzzle[row][column] !== value.toString()
    );
  }
  solve(puzzleString) {
    if (puzzleString) currentPuzzle = puzzleString;
    let valid = this.validate(currentPuzzle);
    if (valid !== true) {
      return valid;
    }
    let empty = currentPuzzle.indexOf(".");
    let row = Math.floor(empty / 9);
    let column = empty % 9;
    if (empty !== -1) {
      for (let i = 1; i <= 9; i++) {
        if (
          this.checkRowPlacement(currentPuzzle, row, column, i) &&
          this.checkColPlacement(currentPuzzle, row, column, i) &&
          this.checkRegionPlacement(currentPuzzle, row, column, i)
        ) {
          let temp = currentPuzzle.split("");
          temp[empty] = i;
          currentPuzzle = temp.join("");
          this.solve();
        }
      }
    }
    if (currentPuzzle.indexOf(".") !== -1) {
      let temp = currentPuzzle.split("");
      temp[empty] = ".";
      currentPuzzle = temp.join("");
    }
    return { solution: currentPuzzle };
  }
}

module.exports = SudokuSolver;
