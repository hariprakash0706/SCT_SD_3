// Create grid
const grid = document.getElementById("grid");
for (let i = 0; i < 81; i++) {
  const input = document.createElement("input");
  input.type = "number";
  input.min = 1;
  input.max = 9;
  input.id = "cell-" + i;
  grid.appendChild(input);

  // Highlight prefilled cells
  input.addEventListener("input", () => {
    input.classList.toggle("prefilled", input.value !== "");
  });
}

// Get grid data
function getGrid() {
  return Array.from({ length: 9 }, (_, i) =>
    Array.from({ length: 9 }, (_, j) => {
      const val = document.getElementById(`cell-${i * 9 + j}`).value;
      return val ? parseInt(val) : 0;
    })
  );
}

// Set grid data
function setGrid(data) {
  data.flat().forEach((val, i) => {
    const cell = document.getElementById(`cell-${i}`);
    if (!cell.classList.contains("prefilled")) cell.value = val || "";
  });
}

// Backtracking Sudoku solver
function isSafe(grid, r, c, n) {
  for (let i = 0; i < 9; i++)
    if (
      grid[r][i] === n ||
      grid[i][c] === n ||
      grid[3 * Math.floor(r / 3) + Math.floor(i / 3)][
        3 * Math.floor(c / 3) + (i % 3)
      ] === n
    )
      return false;
  return true;
}

function solveSudoku(grid, r = 0, c = 0) {
  if (r === 9) return true;
  if (c === 9) return solveSudoku(grid, r + 1, 0);
  if (grid[r][c]) return solveSudoku(grid, r, c + 1);

  for (let n = 1; n <= 9; n++) {
    if (isSafe(grid, r, c, n)) {
      grid[r][c] = n;
      if (solveSudoku(grid, r, c + 1)) return true;
      grid[r][c] = 0;
    }
  }
  return false;
}

function solve() {
  const gridData = getGrid();
  if (solveSudoku(gridData)) {
    setGrid(gridData);
    alert("✅ Sudoku Solved!");
  } else {
    alert("❌ No solution found.");
  }
}

function clearGrid() {
  for (let i = 0; i < 81; i++) {
    const cell = document.getElementById(`cell-${i}`);
    cell.value = "";
    cell.classList.remove("prefilled");
  }
}
