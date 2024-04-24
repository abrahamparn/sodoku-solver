const chai = require("chai");
const assert = chai.assert;
import {
  puzzlesAndSolutions,
  invalidStrings,
  wrongLengthStrings,
} from "../controllers/puzzle-strings";

const Solver = require("../controllers/sudoku-solver.js");
let solver = new Solver();
suite("Unit Tests", () => {
  suite("Validation", () => {
    test("Logic handles a valid puzzle string of 81 characters", () => {
      for (let i in puzzlesAndSolutions) {
        assert.isTrue(solver.validate(puzzlesAndSolutions[i][0]));
      }
    });
    test("Logic handles a puzzle string with invalid characters (not 1-9 or .)", () => {
      for (let i in invalidStrings) {
        assert.equal(
          solver.validate(invalidStrings[i]).error,
          "Invalid characters in puzzle",
          invalidStrings[i]
        );
      }
    });
    test("Logic handles a puzzle string that is not 81 characters in length", () => {
      for (let i in wrongLengthStrings) {
        assert.equal(
          solver.validate(wrongLengthStrings[i]).error,
          "Expected puzzle to be 81 characters long"
        );
      }
    });
  });
  suite("Placement Checks", () => {
    test("Logic handles a valid row placement", () => {
      const checks = [
        solver.checkRowPlacement(puzzlesAndSolutions[0][0], 0, 3, 3),
        solver.checkRowPlacement(puzzlesAndSolutions[1][0], 0, 3, 6),
        solver.checkRowPlacement(puzzlesAndSolutions[2][0], 0, 2, 2),
      ];
      for (let i in checks) {
        assert.isTrue(checks[i]);
      }
    });
    test("Logic handles an invalid row placement", () => {
      const checks = [
        solver.checkRowPlacement(puzzlesAndSolutions[0][0], 0, 3, 5),
        solver.checkRowPlacement(puzzlesAndSolutions[1][0], 0, 3, 1),
        solver.checkRowPlacement(puzzlesAndSolutions[2][0], 0, 2, 3),
      ];
      for (let i in checks) {
        assert.isFalse(checks[i]);
      }
    });
    test("Login handles a valid column placement", () => {
      const checks = [
        solver.checkColPlacement(puzzlesAndSolutions[0][0], 0, 1, 3),
        solver.checkColPlacement(puzzlesAndSolutions[1][0], 0, 1, 6),
        solver.checkColPlacement(puzzlesAndSolutions[2][0], 0, 0, 2),
      ];
      for (let i in checks) {
        assert.isTrue(checks[i]);
      }
    });
    test("Logic handles an invalid column placement", () => {
      const checks = [
        solver.checkColPlacement(puzzlesAndSolutions[0][0], 1, 1, 9),
        solver.checkColPlacement(puzzlesAndSolutions[1][0], 1, 1, 8),
        solver.checkColPlacement(puzzlesAndSolutions[2][0], 2, 2, 2),
      ];
      for (let i in checks) {
        assert.isFalse(checks[i]);
      }
    });
    test("Logic handles a valid region (3x3 grid) placement", () => {
      const checks = [
        solver.checkRegionPlacement(puzzlesAndSolutions[0][0], 0, 1, 3),
        solver.checkRegionPlacement(puzzlesAndSolutions[1][0], 0, 1, 6),
        solver.checkRegionPlacement(puzzlesAndSolutions[2][0], 0, 0, 2),
      ];
      for (let i in checks) {
        assert.isTrue(checks[i]);
      }
    });
    test("Logic handles an invalid region (3x3 grid) placement", () => {
      const checks = [
        solver.checkRegionPlacement(puzzlesAndSolutions[0][0], 2, 2, 5),
        solver.checkRegionPlacement(puzzlesAndSolutions[1][0], 2, 2, 5),
        solver.checkRegionPlacement(puzzlesAndSolutions[2][0], 2, 2, 5),
      ];
      for (let i in checks) {
        assert.isFalse(checks[i]);
      }
    });
  });
  suite("Solver", () => {
    test("Valid puzzle strings pass the solver", () => {
      for (let i in puzzlesAndSolutions) {
        assert.equal(
          solver.solve(puzzlesAndSolutions[i][0]).solution,
          puzzlesAndSolutions[i][1]
        );
      }
    });
    test("Invalid puzzle strings fail the solver", () => {
      for (let i in invalidStrings) {
        assert.equal(
          solver.solve(invalidStrings[i]).error,
          "Invalid characters in puzzle",
          "invalid characters"
        );
      }
    });
    test("Solver returns the expected solution for an incomplete puzzle", () => {
      for (let i in puzzlesAndSolutions) {
        assert.equal(
          solver.solve(puzzlesAndSolutions[i][0]).solution,
          puzzlesAndSolutions[i][1]
        );
      }
    });
  });
});
