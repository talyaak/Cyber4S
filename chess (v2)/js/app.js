// Add all pieces to the board "from js list"
// When user clicks, show possible movements by a different color, without worrying about other pieces (as if the piece was along on the board).

const BOARD_SIZE = 8;
const WHITE_PLAYER = 'white';
const DARK_PLAYER = 'dark';

let selectedCell;
let pieces = [];

class Piece {
  constructor(row, col, type, player) {
    this.row = row;
    this.col = col;
    this.type = type;
    this.player = player;
  }
}

function getInitialBoard() {
  let result = [];
  result.push(new Piece(0, 0, "rook", WHITE_PLAYER));
  result.push(new Piece(0, 1, "knight", WHITE_PLAYER));
  result.push(new Piece(0, 2, "bishop", WHITE_PLAYER));
  result.push(new Piece(0, 3, "queen", WHITE_PLAYER));
  result.push(new Piece(0, 4, "king", WHITE_PLAYER));
  result.push(new Piece(0, 5, "bishop", WHITE_PLAYER));
  result.push(new Piece(0, 6, "knight", WHITE_PLAYER));
  result.push(new Piece(0, 7, "rook", WHITE_PLAYER));
  for (let i = 0; i < 8; i++) {
    result.push(new Piece(1, i, "pawn", WHITE_PLAYER))
    result.push(new Piece(6, i, "pawn", DARK_PLAYER))
  }
  result.push(new Piece(7, 0, "rook", DARK_PLAYER));
  result.push(new Piece(7, 1, "knight", DARK_PLAYER));
  result.push(new Piece(7, 2, "bishop", DARK_PLAYER));
  result.push(new Piece(7, 3, "queen", DARK_PLAYER));
  result.push(new Piece(7, 4, "king", DARK_PLAYER));
  result.push(new Piece(7, 5, "bishop", DARK_PLAYER));
  result.push(new Piece(7, 6, "knight", DARK_PLAYER));
  result.push(new Piece(7, 7, "rook", DARK_PLAYER));
  return result;
}

function addImage(cell, player, name) {
  const image = document.createElement('img');
  image.src = 'images/' + player + '/' + name + '.png';
  cell.appendChild(image);
}

function addImageByIndex(cell, player, index) {
  if (index === 0 || index === 7) {
    addImage(cell, player, 'rook');
  } else if (index === 1 || index === 6) {
    addImage(cell, player, 'knight');
  } else if (index === 2 || index === 5) {
    addImage(cell, player, 'bishop');
  } else if (index === 3) {
    addImage(cell, player, 'king');
  } else if (index === 4) {
    addImage(cell, player, 'queen');
  }
}

function onCellClick(event) {

  if (selectedCell !== undefined) {
    selectedCell.classList.remove('selected');
  }
  selectedCell = event.currentTarget;
  selectedCell.classList.add('selected');
  cellPathColor(selectedCell);
}

function cleanCells() {
  console.log("cleanCells activated");
  for (let i = 0; i < table1.rows.length; i++) {
    for (let j = 0; j < table1.rows[i].length; j++) {
      let tempCells = table1.rows[i].cells
      tempCells[j].classList.remove('selected-path');
    }
  }
}


function cellPathColor(tempCell) {
  cleanCells();
  let tempRow = parseInt(tempCell.id[5]);
  let tempCol = parseInt(tempCell.id[7]);
  if (tempRow == 1) { // white pawn check
    console.log("stage 1");
    table1.rows[tempRow + 1].cells[tempCol - 1].classList.add('selected-path');
    table1.rows[tempRow + 1].cells[tempCol + 1].classList.add('selected-path');
  } else if (tempRow == 6) { // black pawn check
    console.log("stage 2");
    table1.rows[tempRow - 1].cells[tempCol + 1].classList.add('selected-path');
    table1.rows[tempRow - 1].cells[tempCol - 1].classList.add('selected-path');
  } else if (tempRow == 0 && tempCol == 0) {
      console.log("stage 3");
      for (let i = 1; i<8; i++){
        table1.rows[i].cells[0].classList.add('selected-path');
        table1.rows[0].cells[i].classList.add('selected-path');
      }
  }
}

let table1 = document.createElement('table');

function createChessBoard() {
  document.body.appendChild(table1);
  for (let i = 0; i < BOARD_SIZE; i++) {
    const row = table1.insertRow();
    for (let j = 0; j < BOARD_SIZE; j++) {
      const cell = row.insertCell();
      cell.id = "cell-" + i.toString() + "_" + j.toString();
      if ((i + j) % 2 === 0) {
        cell.className = 'light-cell';
      } else {
        cell.className = 'dark-cell';
      }
      cell.addEventListener('click', onCellClick);
    }
  }
  pieces = getInitialBoard();

  for (let piece of pieces) {
    addImage(table1.rows[piece.row].cells[piece.col], piece.player, piece.type);
  }
}



window.addEventListener('load', createChessBoard);