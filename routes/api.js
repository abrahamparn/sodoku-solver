"use strict";

const SudokuSolver = require("../controllers/sudoku-solver.js");

module.exports = function (app) {
  let solver = new SudokuSolver();

  app.route("/api/check").post((req, res) => {
    if (!req.body.puzzle || !req.body.coordinate || !req.body.value) {
      return res.json({ error: "Required field(s) missing" });
    }
    if (!(req.body.value > 0) || !(req.body.value < 10)) {
      return res.json({ error: "Invalid value" });
    }
    if (!/^[A-I][1-9]$/.test(req.body.coordinate)) {
      return res.json({ error: "Invalid coordinate" });
    }
    let validString = solver.validate(req.body.puzzle);
    if (validString !== true) {
      return res.json(validString);
    }
    let row = req.body.coordinate[0].charCodeAt(0) - 65;
    let col = req.body.coordinate[1] - 1;
    let conflict = [];
    let valid;
    if (!solver.checkRowPlacement(req.body.puzzle, row, col, req.body.value)) {
      conflict.push("row");
    }
    if (!solver.checkColPlacement(req.body.puzzle, row, col, req.body.value)) {
      conflict.push("column");
    }
    if (
      !solver.checkRegionPlacement(req.body.puzzle, row, col, req.body.value)
    ) {
      conflict.push("region");
    }
    conflict.length > 0 ? (valid = false) : (valid = true);
    res.json({ valid: valid, conflict: conflict });
  });

  app.route("/api/solve").post((req, res) => {
    if (!req.body.puzzle) {
      return res.json({ error: "Required field missing" });
    }
    res.json(solver.solve(req.body.puzzle));
  });
};
