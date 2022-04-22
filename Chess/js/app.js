// Global variables - constants
const BOARD_SIZE = 8;
const WHITE_PLAYER = 'white';
const BLACK_PLAYER = 'black';
const PAWN = 'pawn';
const ROOK = 'rook';
const KNIGHT = 'knight';
const BISHOP = 'bishop';
const KING = 'king';
const QUEEN = 'queen';

//Global variables - non-constants
let selectedCell;
let pieces = [];
let table;
let boardData;

/* 'Piece' is an object that stores information about
every chess piece*/ 
class Piece {
  constructor(row, col, type, player) {
    this.row = row;
    this.col = col;
    this.type = type;
    this.player = player;
  }

  /* Returns an array of possible moves of the piece
  given the limitations of the piece's location*/ 
  getPossibleMoves() {
    // Get relative moves
    let relativeMoves;
    if (this.type === PAWN) {
      relativeMoves = this.getPawnRelativeMoves();
    } else if (this.type === ROOK) {
      relativeMoves = this.getRookRelativeMoves();
    } else if (this.type === KNIGHT) {
      relativeMoves = this.getKnightRelativeMoves();
    } else if (this.type === BISHOP) {
      relativeMoves = this.getBishopRelativeMoves();
    } else if (this.type === KING) {
      relativeMoves = this.getKingRelativeMoves();
    } else if (this.type === QUEEN) {
      relativeMoves = this.getQueenRelativeMoves();
    } else {
      console.log("Unknown type", type)
    }
    console.log('relativeMoves', relativeMoves);

    // Get absolute moves
    let absoluteMoves = [];
    for (let relativeMove of relativeMoves) {
      const absoluteRow = this.row + relativeMove[0];
      const absoluteCol = this.col + relativeMove[1];
      absoluteMoves.push([absoluteRow, absoluteCol]);
    }
    console.log('absoluteMoves', absoluteMoves);

    // Get filtered absolute moves
    let filteredMoves = [];
    for (let absoluteMove of absoluteMoves) {
      const absoluteRow = absoluteMove[0];
      const absoluteCol = absoluteMove[1];
      if (absoluteRow >= 0 && absoluteRow <= 7 && absoluteCol >= 0 && absoluteCol <= 7) {
        filteredMoves.push(absoluteMove);
      }
    }
    console.log('filteredMoves', filteredMoves);
    return filteredMoves;
  }

  getPawnRelativeMoves() {
    if (this.player === WHITE_PLAYER){
      return [[1, 0]];
    } else if (this.player === BLACK_PLAYER) {
      return [[-1, 0]];
    }
  }

  getRookRelativeMoves() {
    let result = [];
    for (let i = 1; i < BOARD_SIZE; i++) {
      result.push([i, 0]);
      result.push([-i, 0]);
      result.push([0, i]);
      result.push([0, -i]);
    }
    return result;
  }

  getKnightRelativeMoves() {
    let result = [];
    result.push([-2,1],[-1,2],[1,2],[-1,-2],[2,1],[2,-1],[1,-2],[-1,2],[-2,-1]);
    return result;
  }

  getBishopRelativeMoves() {
    let result = [];
    for (let i = 1; i<BOARD_SIZE; i++) {
      result.push([i,i],[i,-i],[-i,i],[-i,-i]);
    }
    return result;
  }

  getKingRelativeMoves() {
    return [[0,1],[1,1],[1,0],[1,-1],[0,-1],[-1,-1],[-1,0],[-1,1]];
  }

  getQueenRelativeMoves() {
    let result = [];
    for(let i = 1; i<BOARD_SIZE; i++){
      result.push([i,0]);
      result.push([-i,0]);
      for (let j =1; j<BOARD_SIZE; j++){
        result.push([0,j],[0,-j],[i,j],[-i,j],[i,-j],[-i,-j]);
      }
    }
    return result;
  }
}

/* BoardData is an object that stores information
regarding the chess pieces and the board itself
It will help us access data without using DOM */
class BoardData {
  constructor(pieces) {
    this.pieces = pieces;
  }

  // Returns piece in row, col, or undefined if not exists.
  getPiece(row, col) {
    for (let piece of this.pieces) {
        if (piece.row === row && piece.col === col) {
          return piece;
        }
      }
  }
}

/* Returns an array of pieces, this array will later
be used by BoardData*/
function getInitialPieces() {
  let result = [];
  addFirstRowPieces(result, 0, WHITE_PLAYER);
  addFirstRowPieces(result, 7, BLACK_PLAYER);

  for (let i = 0; i < BOARD_SIZE; i++) {
    result.push(new Piece(1, i, PAWN, WHITE_PLAYER));
    result.push(new Piece(6, i, PAWN, BLACK_PLAYER));
  }
  return result;

  function addFirstRowPieces(result, row, player) {
    result.push(new Piece(row, 0, ROOK, player));
    result.push(new Piece(row, 1, KNIGHT, player));
    result.push(new Piece(row, 2, BISHOP, player));
    result.push(new Piece(row, 3, KING, player));
    result.push(new Piece(row, 4, QUEEN, player));
    result.push(new Piece(row, 5, BISHOP, player));
    result.push(new Piece(row, 6, KNIGHT, player));
    result.push(new Piece(row, 7, ROOK, player));
  }
}


/* Creates an img element according to the parameters
it received, appends it to the cell */
function addImage(cell, player, name) {
  const image = document.createElement('img');
  image.src = 'images/' + player + '/' + name + '.png';
  cell.appendChild(image);
}

/* Clicking on any cell/piece will result in calling this function
The cell wil be 'selected' with a unique color. Also: cells that
the Chess piece can move towards - will be given another color*/
function onCellClick(event, row, col) {
  console.log('row', row); // for testing, will be deleted
  console.log('col', col);  // for testing, will be deleted
  
  // Clear previously selected cell
  if (selectedCell !== undefined) {
    selectedCell.classList.remove('selected');
  }

  // Show selected cell
  selectedCell = event.currentTarget;
  selectedCell.classList.add('selected');
  
  // Clear all previous possible moves
  for (let i = 0; i < BOARD_SIZE; i++) {
    for (let j = 0; j < BOARD_SIZE; j++) {
      table.rows[i].cells[j].classList.remove('possible-move');
    }
  }
  
  // Using boardData to gain information
  const piece = boardData.getPiece(row, col); 
  if (piece !== undefined) {
    let possibleMoves = piece.getPossibleMoves();
    for (let possibleMove of possibleMoves) {
      const cell = table.rows[possibleMove[0]].cells[possibleMove[1]];
      cell.classList.add('possible-move');
    }
  }
  
}

/* Called upon after the HTML 'load' event
Kickstarts creation of the Chess board*/
function createChessBoard() {
  // Create empty chess board HTML:
  table = document.createElement('table');
  document.body.appendChild(table);
  for (let row = 0; row < BOARD_SIZE; row++) {
    const rowElement = table.insertRow();
    for (let col = 0; col < BOARD_SIZE; col++) {
      const cell = rowElement.insertCell();
      // 'if' statements to appoint cell color
      if (row % 2 == 0 && col % 2 == 0) { cell.className = 'light-cell';} 
      else if (row%2 != 0 && col%2 == 0) { cell.className = 'dark-cell';}
      else if (row%2 == 0 && col%2 != 0) { cell.className = 'dark-cell';}
      else {cell.className = 'light-cell'};
      // eventListener that calls onCellClick() after clicking on each cell
      cell.addEventListener('click', (event) => onCellClick(event, row, col));
    }
  }

  /* boardData is a data storing object, BoardData() will
   receive the initial chess pieces as an array */
  boardData = new BoardData(getInitialPieces());

  // Add pieces images to board
  for (let piece of boardData.pieces) {
    const cell = table.rows[piece.row].cells[piece.col];
    addImage(cell, piece.player, piece.type);
  }
}

// After the HTML is loaded, createChessBoard() is called
window.addEventListener('load', createChessBoard);