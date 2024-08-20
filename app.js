const cells = document.querySelectorAll('.cell');
const statusDiv = document.querySelector('.status');
const resetBtn = document.querySelector('.reset-btn');

let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function checkWin() {
    for (const combo of winningCombos) {
        const [a, b, c] = combo;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return board[a];
        }
    }
    return board.includes('') ? null : 'T'; // T for Tie
}

function handleClick(e) {
    const cell = e.target;
    const index = cell.getAttribute('data-index');

    if (!gameActive || board[index]) return;

    board[index] = currentPlayer;
    cell.textContent = currentPlayer;

    const winner = checkWin();
    if (winner) {
        gameActive = false;
        statusDiv.textContent = winner === 'T' ? "It's a Tie!" : `Player ${winner} Wins!`;
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        statusDiv.textContent = `Player ${currentPlayer}'s turn`;
    }
}

function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameActive = true;
    statusDiv.textContent = "Player X's turn";
    cells.forEach(cell => cell.textContent = '');
}

cells.forEach(cell => cell.addEventListener('click', handleClick));
resetBtn.addEventListener('click', resetGame);