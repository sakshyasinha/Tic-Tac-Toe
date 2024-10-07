const boxes = document.querySelectorAll('.box');
const message = document.getElementById('message');
const resetBtn = document.getElementById('reset-btn');

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

let currentPlayer = 'X';
let gameActive = true;

function handleBoxClick(e) {
    const cellIndex = e.target.dataset.cellIndex;
    if (boxes[cellIndex].textContent === '' && gameActive) {
        boxes[cellIndex].textContent = currentPlayer;
        checkWinner();
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
}

function checkWinner() {
    for (const condition of winningConditions) {
        const [a, b, c] = condition;
        if (boxes[a].textContent === boxes[b].textContent && boxes[b].textContent === boxes[c].textContent && boxes[a].textContent !== '') {
            message.textContent = `${currentPlayer} wins!`;
            highlightWinningBoxes(condition); 
            gameActive = false;
            disableBoxes();
            return;
        }
    }

    if (Array.from(boxes).every(box => box.textContent !== '')) {
        message.textContent = "It's a draw!";
        gameActive = false;
    }
}


function disableBoxes() {
    boxes.forEach(box => box.removeEventListener('click', handleBoxClick));
}

function resetGame() {
    boxes.forEach(box => {
        box.textContent = '';
        box.style.backgroundColor = 'yellow'; 
        box.addEventListener('click', handleBoxClick);
    });
    message.textContent = '';
    currentPlayer = 'X';
    gameActive = true;
}


boxes.forEach(box => box.addEventListener('click', handleBoxClick));
resetBtn.addEventListener('click', resetGame);

function highlightWinningBoxes(condition) {
    condition.forEach(index => {
        boxes[index].style.backgroundColor = 'lightgreen'; 
    });
}

