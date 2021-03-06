// Global variables - constants
let startedGame = false;
const BOARD_SIZE = 8;
const WHITE_PLAYER = 'white';
const BLACK_PLAYER = 'black';
const PAWN = 'pawn';
const ROOK = 'rook';
const KNIGHT = 'knight';
const BISHOP = 'bishop';
const KING = 'king';
const QUEEN = 'queen';

const CHESS_BOARD_ID = 'chess-board';

let startButton, tableContainer, header, playingNow, winnerText = "", endContainer;
dangerText = "";
let currentStatus = "Playing";

//Global variables - non-constants
let game;
let table;
let selectedPiece;
let gameStatus;

/* Creates an img element according to the parameters
it received, appends it to the cell */
function addImage(cell, player, name) {
  const image = document.createElement('img');
  image.src = 'images/' + player + '/' + name + '.png';
  cell.appendChild(image);
}


// When cells are clicked - this function starts
function onCellClick(row, col) {
  gameStatus.innerHTML = "Game Status: " + currentStatus;
  // first case click scenario (for first move)
  if (selectedPiece === undefined) {
    console.log("onCellClick, instance 1");
    game.showMovesForPiece(row, col);
  } else { // a piece is already selected
    if (game.tryMove(selectedPiece, row, col)) { // this represents MOVEMENT of piece
      selectedPiece = undefined; // going back to first case scenario
      createChessBoard(game.boardData); // Recreate board - doesn't affect UX
      console.log("onCellClick, instance 2");
    } else { // this represents clicking on non-'possible-move' cell
      game.showMovesForPiece(row, col);
      console.log("onCellClick, instance 3");
    }
  }
}


/* Called upon after the HTML 'load' event
Creates a start button*/
function _init() {
  startButton = document.createElement('button');
  startButton.setAttribute('onClick', 'gameStarter()');
  startButton.classList.add("start-button");
  startButton.innerText = "Let's play chess";
  document.body.appendChild(startButton);

}

// Called upon after start button click
function gameStarter() {
  // HTML manipulation - written text
  gameStatus = document.getElementById("game-status");
  gameStatus.innerHTML = "Game Status: " + currentStatus;
  document.body.removeChild(startButton);
  tableContainer = document.createElement('div');
  document.body.appendChild(tableContainer);
  playingNow = document.createElement('div');
  endContainer = document.createElement('div');
  endContainer.classList.add('end-container');
  document.body.appendChild(endContainer);
  endContainer.appendChild(playingNow);
  playingNow.classList.add("playing-now");

  /* boardData is a data storing object, BoardData() will
  receive the initial chess pieces as an array */
  game = new Game();
  createChessBoard(game.boardData);
}
// Creates table, configures it as Chess board
function createChessBoard(boardData) {
  table = document.getElementById(CHESS_BOARD_ID);
  if (table !== null) {
    table.remove();
  }

  // Create empty chess board inside the HTML file:
  table = document.createElement('table');
  table.id = CHESS_BOARD_ID;
  tableContainer.appendChild(table);
  playingNow.innerHTML = game.currentPlayer.toUpperCase() + " Team's turn";

  for (let row = 0; row < BOARD_SIZE; row++) {
    const rowElement = table.insertRow();
    for (let col = 0; col < BOARD_SIZE; col++) {
      const cell = rowElement.insertCell();
      if ((row + col) % 2 === 0) {
        cell.className = 'light-cell';
      } else {
        cell.className = 'dark-cell';
      }
      // eventListener that calls onCellClick() after clicking on each cell
      cell.addEventListener('click', () => onCellClick(row, col));
    }
  }

  // Add pieces images to board
  for (let piece of boardData.pieces) {
    const cell = table.rows[piece.row].cells[piece.col];
    addImage(cell, piece.player, piece.type);
  }  

  // Creating the "win" popup
  let winnerMsg = document.createElement('div')
  winnerMsg.textContent = winnerText;
  table.appendChild(winnerMsg);
  

  // When a winner is announced, this block is executed
  if (winnerMsg.textContent !== "") {
    gameStatus.innerHTML = "GAME OVER";
    winnerMsg.classList.add('winner-msg');
    playingNow.innerHTML = "";
    /* After winner is declared, no need for onCellClick
    It's now redefined as an empty function*/
    onCellClick = function () { }

    // Refresh button - new game
    let button = document.createElement('button');
    button.setAttribute('onClick', 'location.reload()');
    button.innerHTML = "Restart";
    playingNow.classList.remove('playing-now');
    endContainer.appendChild(button);
  }
}

// After the HTML is loaded, createChessBoard() is called
window.addEventListener('load', _init);