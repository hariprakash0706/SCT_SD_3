const gridContainer = document.getElementById("sudoku-grid");

for (let row = 0; row < 9; row++) {
  for (let col = 0; col < 9; col++) {
    const input = document.createElement("input");
    input.setAttribute("type", "number");
    input.setAttribute("min", "1");
    input.setAttribute("max", "9");
    input.setAttribute("id", `cell-${row}-${col}`);
    gridContainer.appendChild(input);
  }
}

function getGrid() {
  let grid = [];
  for (let i = 0; i < 9; i++) {
    let row = [];
    for (let j = 0; j < 9; j++) {
      const val = document.getElementById(`cell-${i}-${j}`).value;
      row.push(val ? parseInt(val) : 0);
    }
    grid.push(row);
  }
  return grid;
}

function setGrid(grid) {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      const cell = document.getElementById(`cell-${i}-${j}`);
      cell.value = grid[i][j] !== 0 ? grid[i][j] : "";
    }
  }
}

function isSafe(grid, row, col, num) {
  for (let x = 0; x < 9; x++) {
    if (grid[row][x] === num || grid[x][col] === num)
      return false;
  }

  const startRow = row - row % 3;
  const startCol = col - col % 3;

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (grid[i + startRow][j + startCol] === num)
        return false;
    }
  }

  return true;
}

function solveSudoku(grid, row = 0, col = 0) {
  if (row === 9) return true;
  if (col === 9) return solveSudoku(grid, row + 1, 0);
  if (grid[row][col] !== 0) return solveSudoku(grid, row, col + 1);

  for (let num = 1; num <= 9; num++) {
    if (isSafe(grid, row, col, num)) {
      grid[row][col] = num;
      if (solveSudoku(grid, row, col + 1)) return true;
      grid[row][col] = 0;
    }
  }

  return false;
}

function solve() {
  let grid = getGrid();
  if (solveSudoku(grid)) {
    setGrid(grid);
    alert("Sudoku Solved!");
  } else {
    alert("No solution found.");
  }
}

function clearGrid() {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      document.getElementById(`cell-${i}-${j}`).value = "";
    }
  }
}
