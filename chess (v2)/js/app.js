// Add all pieces to the board "from js list"
// When user clicks, show possible movements by a different color, without worrying about other pieces (as if the piece was along on the board).

const BOARD_SIZE = 8;
const WHITE_PLAYER = 'white';
const DARK_PLAYER = 'dark';

const PAWN = 'pawn';
const ROOK = 'rook';
const KNIGHT = 'knight';
const BISHOP = 'bishop';
const KING = 'king';
const QUEEN = 'queen';

let selectedCell;
let pieces = [];
let piece;
let table;

class Piece {
  constructor(row, col, type, player) {
    this.row = row;
    this.col = col;
    this.type = type;
    this.player = player;
  }
  getPossibleMoves() {
    let result = [];
    let relativeMoves;
    if (type === PAWN) {
      // TO DO: Get pawn moves
    } else if (this.type === ROOK) {
      relativeMoves = this.getPawnRelativeMoves();
    } else if (this.type === KNIGHT) {
      // TO DO: Get moves
    } else if (type === BISHOP) {
      // TO DO: Get moves
    } else if (type === KING) {
      // TO DO: Get moves
    } else if (type === QUEEN) {
      // TO DO: Get moves
    } else {
      console.log("Unknown type", type)
    }

    let absoluteMoves = []
    // TODO: Make relative moves absolute
    for (let relativeMove of relativeMoves){
      const absoluteRow = relativeMove[0] + this.row;
      const absoluteCol = relativeMove[1] + this.col
      absoluteMoves.push([absoluteRow, absoluteCol]);
    }

    let filteredMoves = [];
    for (let absoluteMove of absoluteMoves){
      if (absoluteMove[0] >= 0 && absoluteMove[0  ] <= 7 && absoluteMove[1] >=0 && absoluteMove[1] <= 7){
        filteredMoves.push(absoluteMove);
      }
    }
    return filteredMoves;
  }
  getPawnRelativeMoves() {
    // TODO: Give different answer to black players
    return [[1, 0]];
  }
  getRookRelativeMoves() {
    let result = [];
    for (let i = 0; i < BOARD_SIZE; i++) {
      result.push([i, 0]);
      result.push([-i, 0]);
      result.push([0, i]);
      result.push([0, -i]);
    }
    return result;
  }
}

function getInitialBoard() {
  let result = [];
  result.push(new Piece(0, 0, ROOK, WHITE_PLAYER));
  result.push(new Piece(0, 1, KNIGHT, WHITE_PLAYER));
  result.push(new Piece(0, 2, BISHOP, WHITE_PLAYER));
  result.push(new Piece(0, 3, QUEEN, WHITE_PLAYER));
  result.push(new Piece(0, 4, KING, WHITE_PLAYER));
  result.push(new Piece(0, 5, BISHOP, WHITE_PLAYER));
  result.push(new Piece(0, 6, KNIGHT, WHITE_PLAYER));
  result.push(new Piece(0, 7, ROOK, WHITE_PLAYER));
  for (let i = 0; i < 8; i++) {
    result.push(new Piece(1, i, PAWN, WHITE_PLAYER))
    result.push(new Piece(6, i, PAWN, DARK_PLAYER))
  }
  result.push(new Piece(7, 0, ROOK, DARK_PLAYER));
  result.push(new Piece(7, 1, KNIGHT, DARK_PLAYER));
  result.push(new Piece(7, 2, BISHOP, DARK_PLAYER));
  result.push(new Piece(7, 3, QUEEN, DARK_PLAYER));
  result.push(new Piece(7, 4, KING, DARK_PLAYER));
  result.push(new Piece(7, 5, BISHOP, DARK_PLAYER));
  result.push(new Piece(7, 6, KNIGHT, DARK_PLAYER));
  result.push(new Piece(7, 7, ROOK, DARK_PLAYER));
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

function onCellClick(event, row, col) {
  console.log(row);
  console.log(col);
  for (piece of pieces) {
    if (piece.row == row && piece.col == col){
      console.log(piece);
      let possibleMoves = piece.getPossibleMoves;
      for (let possibleMove of possibleMoves){
        table.rows[possibleMoves[0]].cells[possibleMoves[1]].classList.add('possible-move');
      }
    }
  }
  if (selectedCell !== undefined) {
    selectedCell.classList.remove('selected');
  }
  selectedCell = event.currentTarget;
  selectedCell.classList.add('selected');
  possibleMoves(selectedCell);
}

// function cleanCells() {
//   console.log("cleanCells activated");
//   for (let piece in pieces) {
//     let list = table1.rows[piece.row].cells[piece.col].classList; 
//     if (list.includes('piece-path')) {
//       list.remove('piece-path');
//     }
//   }
// }


// function possibleMoves(tempCell) {
//   // cleanCells();
//   let tempRow = parseInt(tempCell.id[5]);
//   let tempCol = parseInt(tempCell.id[7]);
//   if (tempRow == 1) { // white pawn check
//     console.log("stage 1");
//     table1.rows[tempRow + 1].cells[tempCol].classList.add('piece-path');
//   } else if (tempRow == 6) { // black pawn check
//     console.log("stage 2");
//     table1.rows[tempRow - 1].cells[tempCol].classList.add('piece-path');
//   } else if (tempRow == 0 && tempCol == 0) {
//       console.log("stage 3");
//       for (let i = 1; i<8; i++){
//         table1.rows[i].cells[0].classList.add('piece-path');
//         table1.rows[0].cells[i].classList.add('piece-path');
//       }
//   }
// }


function createChessBoard() {
  let table1 = document.createElement('table');
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
      cell.addEventListener('click', (event) => onCellClick(event, row, cell));
    }
  }
  pieces = getInitialBoard();

  for (let piece of pieces) {
    addImage(table1.rows[piece.row].cells[piece.col], piece.player, piece.type);
  }
}



window.addEventListener('load', createChessBoard);