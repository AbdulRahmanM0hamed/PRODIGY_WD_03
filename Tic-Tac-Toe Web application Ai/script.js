// script.js
// Game State
let board = Array(9).fill(null); // Tic-Tac-Toe board
let currentPlayer = "X"; // Current player's symbol
let gameActive = true; // Game state

// Elements
const cells = document.querySelectorAll(".cell");
const resetButton = document.querySelector("#reset-button");
const status = document.querySelector("#status");

// Winning combinations for Tic-Tac-Toe
const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Function to check for a win
function checkWin() {
    for (const combo of winningCombinations) {
        const [a, b, c] = combo;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return board[a]; // Return the winner symbol
        }
    }
    return null; // No winner yet
}

// Function to check for a tie
function checkTie() {
    return board.every(cell => cell !== null); // All cells are filled
}

// Handle cell click
function handleCellClick(event) {
    const index = parseInt(event.target.dataset.index);

    if (board[index] || !gameActive) {
        return; // Cell is occupied or game is over
    }

    board[index] = currentPlayer; // Mark the cell with the current player's symbol
    event.target.textContent = currentPlayer; // Display the symbol in the cell

    const winner = checkWin(); // Check if there's a winner
    const isTie = checkTie(); // Check if there's a tie

    if (winner) {
        status.textContent = `${winner} wins!`;
        gameActive = false; // Game is over
    } else if (isTie) {
        status.textContent = "It's a tie!";
        gameActive = false; // Game is over
    } else {
        // Switch player
        currentPlayer = currentPlayer === "X" ? "O" : "X"; // Toggle between X and O
        status.textContent = `Player ${currentPlayer}'s turn`; // Update status
        if (currentPlayer === "O") {
            setTimeout(aiMove, 500); // Make AI move with a delay
        }
    }
}

// AI move logic (random)
function aiMove() {
    const emptyIndices = board.reduce((acc, val, idx) => {
        if (val === null) acc.push(idx);
        return acc;
    }, []);

    if (emptyIndices.length === 0) return; // No moves left

    const randomIndex = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
    board[randomIndex] = currentPlayer; // Mark the cell with the AI's symbol
    cells[randomIndex].textContent = currentPlayer; // Display the symbol in the cell

    const winner = checkWin(); // Check if there's a winner
    const isTie = checkTie(); // Check if there's a tie

    if (winner) {
        status.textContent = `${winner} wins!`;
        gameActive = false; // Game is over
    } else if (isTie) {
        status.textContent = "It's a tie!";
        gameActive = false; // Game is over
    } else {
        // Switch back to the player
        currentPlayer = "X";
        status.textContent = `Player ${currentPlayer}'s turn`;
    }
}

// Add event listeners to each cell
cells.forEach(cell => cell.addEventListener("click", handleCellClick));

// Reset game
function resetGame() {
    board.fill(null); // Clear the board
    cells.forEach(cell => (cell.textContent = "")); // Clear cell contents
    currentPlayer = "X"; // Reset to starting player
    gameActive = true; // Reactivate the game
    status.textContent = "Player X's turn"; // Reset status
}

resetButton.addEventListener("click", resetGame); // Add event listener for reset

spanmessage.innerText = 'Play With AI'