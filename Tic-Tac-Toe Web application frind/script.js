document.addEventListener("DOMContentLoaded", function () {
    const cells = document.querySelectorAll('.cell');
    const resetButton = document.getElementById('reset-button');
    const messageArea = document.getElementById('status');
    const spanmessage = document.getElementById('spanmessage');
    let currentPlayer = 'X';
    let gameState = ['', '', '', '', '', '', '', '', ''];

    // Function to check for winner
    function checkWinner() {
        const winConditions = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        for (let condition of winConditions) {
            const [a, b, c] = condition;
            if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
                return gameState[a];
            }
        }

        return null;
    }

    // Function to handle cell click
    function handleCellClick(index) {
        if (gameState[index] === '' && !checkWinner()) {
            gameState[index] = currentPlayer;
            cells[index].innerText = currentPlayer;

            const winner = checkWinner();
            if (winner) {
                messageArea.innerText = `${winner} wins!`;
            } else if (!gameState.includes('')) {
                messageArea.innerText = "It's a draw!";
            } else {
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            }
        }
    }

    // Event listeners for cell clicks
    cells.forEach((cell, index) => {
        cell.addEventListener('click', () => handleCellClick(index));
    });

    // Event listener for reset button
    resetButton.addEventListener('click', () => {
        currentPlayer = 'X';
        gameState = ['', '', '', '', '', '', '', '', ''];
        cells.forEach(cell => {
            cell.innerText = '';
        });
        messageArea.innerText = '';
    });
});

spanmessage.innerText = 'Play With your friend'