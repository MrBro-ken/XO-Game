const cells = document.querySelectorAll(".cell");
const restartBtn = document.getElementById("restart");

let board = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

// Marcador
let wins = 0;
let draws = 0;
let losses = 0;

const winningConditions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

function handleCellClick(e) {
    const index = e.target.getAttribute("data-index");

    if (board[index] !== "" || !gameActive) return;

    // Jugador (X)
    board[index] = "X";
    e.target.textContent = "X";

    checkWinner();
    if (!gameActive) return;

    // Bot (O)
    botMove();
}

function checkWinner() {
    for (let condition of winningConditions) {
        const [a, b, c] = condition;

        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            if (board[a] === "X") {
                alert("¡Ganaste!");
                wins++;
            } else {
                alert("Perdiste");
                losses++;
            }
            updateScore();
            gameActive = false;
            return;
        }
    }

    if (!board.includes("")) {
        alert("Empate");
        draws++;
        updateScore();
        gameActive = false;
    }
}

function botMove() {

    // Intentar ganar
    for (let condition of winningConditions) {
        const [a, b, c] = condition;
        const values = [board[a], board[b], board[c]];

        if (values.filter(v => v === "O").length === 2 &&
            values.includes("")) {

            const emptyIndex = condition[values.indexOf("")];
            board[emptyIndex] = "O";
            cells[emptyIndex].textContent = "O";
            checkWinner();
            return;
        }
    }

    // Bloquear jugador
    for (let condition of winningConditions) {
        const [a, b, c] = condition;
        const values = [board[a], board[b], board[c]];

        if (values.filter(v => v === "X").length === 2 &&
            values.includes("")) {

            const emptyIndex = condition[values.indexOf("")];
            board[emptyIndex] = "O";
            cells[emptyIndex].textContent = "O";
            checkWinner();
            return;
        }
    }

    // Movimiento aleatorio
    let emptyCells = [];

    board.forEach((cell, index) => {
        if (cell === "") emptyCells.push(index);
    });

    if (emptyCells.length === 0) return;

    const randomIndex =
        emptyCells[Math.floor(Math.random() * emptyCells.length)];

    board[randomIndex] = "O";
    cells[randomIndex].textContent = "O";

    checkWinner();
}

function updateScore() {
    document.getElementById("wins").textContent = wins;
    document.getElementById("draws").textContent = draws;
    document.getElementById("losses").textContent = losses;
}

function restartGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    gameActive = true;
    cells.forEach(cell => cell.textContent = "");
}

cells.forEach(cell => cell.addEventListener("click", handleCellClick));
restartBtn.addEventListener("click", restartGame);


