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

const CHESS_BOARD_ID = 'chess-board';

//Global variables - non-constants
let table;
let boardData;
let selectedPiece;
let playerTurn = WHITE_PLAYER;

/* 'Piece' - stores information about
every chess piece*/
class Piece {
  constructor(row, col, type, player) {
    this.row = row;
    this.col = col;
    this.type = type;
    this.player = player;
    this.opponent = this.getOpponent();
  }

  // Get the opponent's player type
  getOpponent() {
    if (this.player === WHITE_PLAYER) {
      return BLACK_PLAYER;
    }
    else { return WHITE_PLAYER; }
  }
  /* Get an array of possible moves of the piece
  given the limitations of the piece's location */ 
  getPossibleMoves(boardData) {
    // Get relative moves
    let moves;
    if (this.type === PAWN) {
      moves = this.getPawnMoves(boardData);
    } else if (this.type === ROOK) {
      moves = this.getRookMoves(boardData);
    } else if (this.type === KNIGHT) {
      moves = this.getKnightMoves(boardData);
    } else if (this.type === BISHOP) {
      moves = this.getBishopMoves(boardData);
    } else if (this.type === KING) {
      moves = this.getKingMoves(boardData);
    } else if (this.type === QUEEN) {
      moves = this.getQueenMoves(boardData);
    } else {
      console.log("Unknown type", type)
    }

    // Get filtered absolute moves
    let filteredMoves = [];
    for (let absoluteMove of moves) {
      const absoluteRow = absoluteMove[0];
      const absoluteCol = absoluteMove[1];
      if (absoluteRow >= 0 && absoluteRow <= 7 && absoluteCol >= 0 && absoluteCol <= 7) {
        filteredMoves.push(absoluteMove);
      }
    }
    console.log('filteredMoves', filteredMoves);
    return filteredMoves;
  }

  /* This function will return the available cells to move
  to - in the given direction parameters (x,x) */ 
  getMovesInDirection(rowDir, colDir, boardData) {
    let result = [], opponent = this.opponent, player = this.player;

    for (let i = 1; i < BOARD_SIZE; i++) {
      let row = this.row + rowDir * i;
      let col = this.col + colDir * i;
      if (boardData.isEmpty(row, col)) {
        result.push([row, col]);
      } else if (boardData.isPlayer(row, col, opponent)) {
        result.push([row, col]);
        // console.log("met opponent");
        return result;
      } else if (boardData.isPlayer(row, col, player)) {
        // console.log("met player");
        return result;
      }
    }
    // console.log("all empty cells");
    return result;
  }

  // Get moves of piece (type = "PAWN")
  getPawnMoves(boardData) {
    let result = [];
    let direction = 1;
    if (this.player === BLACK_PLAYER) {direction = -1 }
    
    // Checks if cell "in front" of pawn is available
    let position = [this.row + direction, this.col];
    if (boardData.isEmpty(position[0], position[1])) {
      result.push(position);
    }  

    // Checks if there is an opponent in front of pawn, side 1
    position = [this.row + direction, this.col + direction];
    if(boardData.isPlayer(position[0], position[1], this.opponent)) {
      result.push(position);
    }

    // Checks if there is an opponent in front of pawn, side 2
    position = [this.row + direction, this.col - direction];
    if (boardData.isPlayer(position[0], position[1], this.opponent)) {
      result.push(position);
    }

    // result = every cell that player can move to
    return result;
  }

  // Get moves of piece (type = "ROOK")
  getRookMoves(boardData) {
    let result = [];
    result = result.concat(this.getMovesInDirection(-1, 0, boardData));
    result = result.concat(this.getMovesInDirection(1, 0, boardData));
    result = result.concat(this.getMovesInDirection(0, -1, boardData));
    result = result.concat(this.getMovesInDirection(0, 1, boardData));
    return result;
  }

  // Get moves of piece (type = "KNIGHT")
  getKnightMoves(boardData) {
    let result = [], player = this.player;
    const relativeMoves = [[2, 1], [2, -1], [-2, 1], [-2, -1], [-1, 2], [1, 2], [-1, -2], [1, -2]];
    for (let relativeMove of relativeMoves) {
      let row = this.row + relativeMove[0];
      let col = this.col + relativeMove[1];
      if (boardData.isPlayer(row, col, player) === false) {
        result.push([row, col]);
      }
    }
    return result;
  }

  // Get moves of piece (type = "BISHOP")
  getBishopMoves(boardData) {
    let result = [];
    result = result.concat(this.getMovesInDirection(-1, -1, boardData));
    result = result.concat(this.getMovesInDirection(-1, 1, boardData));
    result = result.concat(this.getMovesInDirection(1, -1, boardData));
    result = result.concat(this.getMovesInDirection(1, 1, boardData));
    return result;
  }

  // Get moves of piece (type = "KING")
  getKingMoves(boardData) {
    let result = [];
    const relativeMoves = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];
    for (let relativeMove of relativeMoves) {
      let row = this.row + relativeMove[0];
      let col = this.col + relativeMove[1];
      if (!boardData.isPlayer(row, col, this.player)) {
        result.push([row, col]);
      }
    }
    return result;
  }

  /* Get moves of piece (type == "PAWN")
  Uses Rook and Bishop methods to acquire Queen moves */
  getQueenMoves(boardData) {
    let result = this.getBishopMoves(boardData);
    return result.concat(this.getRookMoves(boardData));;
  }
}

// BoardData - our local JS database
class BoardData {
  /* The constructor receives the board pieces
  We can use board data to access the pieces, and
  info regarding them */

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

  /* Checks if given parameters appoint to undefined
  cell (no piece in cell) */
  isEmpty(row, col) {
    return this.getPiece(row,col) === undefined;
  }

  // Checks if given parameters appoint to a 
  // piece which is of type 'player'
  isPlayer(row, col, player) {
    return !this.isEmpty(row, col) && this.getPiece(row, col).player === player;
  }

  removePiece(row, col) {
    for (let i = 0; i < this.pieces.length; i++) {
      const piece = this.pieces[i];
      if (piece.row === row && piece.col === col) {
        // Remove piece at index i
        this.pieces.splice(i, 1);
      }
    }
  }
}

// Returns an array of pieces, this function is used by BoardData
function getInitialPieces() {
  let result = [];
  addFirstRowPieces(result, 0, WHITE_PLAYER);
  addFirstRowPieces(result, 7, BLACK_PLAYER);

  for (let i = 0; i < BOARD_SIZE; i++) {
    result.push(new Piece(1, i, PAWN, WHITE_PLAYER));
    result.push(new Piece(6, i, PAWN, BLACK_PLAYER));
  }
  return result;
}

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

/* Creates an img element according to the parameters
it received, appends it to the cell */
function addImage(cell, player, name) {
  const image = document.createElement('img');
  image.src = 'images/' + player + '/' + name + '.png';
  cell.appendChild(image);
}

/* Clicking on any cell/piece will result in calling this function
The cell wil be 'selected' with a unique color. Also: cells that
the Chess piece can move towards/are enemies - will be given another color*/
function showMovesForPiece(row, col) {
   console.log('showMovesForPiece'); // for testing, will be deleted
  // Clear all previous possible moves and selected
  for (let i = 0; i < BOARD_SIZE; i++) {
    for (let j = 0; j < BOARD_SIZE; j++) {
      table.rows[i].cells[j].classList.remove('possible-move');
      table.rows[i].cells[j].classList.remove('selected');
      table.rows[i].cells[j].classList.remove('enemy');
    }
  }
  
  // Using boardData to gain information
  const piece = boardData.getPiece(row, col);
  // Acquiring possible moves and giving them a color
  if (piece !== undefined) {
    let possibleMoves = piece.getPossibleMoves(boardData);
    for (let possibleMove of possibleMoves) {
      console.log(possibleMove);  
      const cell = table.rows[possibleMove[0]].cells[possibleMove[1]];
      // Giving a 'eatable' enemy a color
      if (boardData.isPlayer(possibleMove[0], possibleMove[1], piece.getOpponent())) {
        cell.classList.add('enemy');
      }
      // Giving cells in our path a color
      cell.classList.add('possible-move');
    }
  }
  
  // Giving the selected piece's cell a color
  table.rows[row].cells[col].classList.add('selected');
  selectedPiece = piece;
}

// When cells are clicked - this function starts
function onCellClick(event, row, col) {
    // first case click scenario (for first move)
    if (selectedPiece === undefined) {
      showMovesForPiece(row, col);
      // console.log("case 1"); test
    } else {
      if (tryMove(selectedPiece, row, col)) { // this represents MOVEMENT of piece
        selectedPiece = undefined; // going back to first case scenario

        // Recreate whole board - doesn't affect user experience
        createChessBoard(boardData);
        // console.log("case 2"); test
      } else { // this represents clicking on non-'possible-move' cell
        showMovesForPiece(row, col);
        // console.log("case 3"); test
      }
    }

}

// Tries to actually make a move, returns true if successful.
function tryMove(piece, row, col) {
  const possibleMoves = piece.getPossibleMoves(boardData);
  // possibleMoves looks like this: [[1,2], [3,2]]
  for (const possibleMove of possibleMoves) {
    // possibleMove looks like this: [1,2]
    if (possibleMove[0] === row && possibleMove[1] === col) {
      // There is a legal move
      console.log(boardData.pieces.length);
      // If new (row,col) cell had enemy, enemy piece is removed 
      const removedPiece = boardData.getPiece(row, col);
      boardData.removePiece(row, col);
      if (removedPiece !== undefined && removedPiece.type === KING){
        alert(removedPiece.getOpponent().toUpperCase() + " Team won!");
      } 
      console.log(boardData.pieces.length);
      piece.row = row;
      piece.col = col;
      return true;
    }
  }
  return false;
}

/* Called upon after the HTML 'load' event
Kickstarts creation of the Chess board*/
function _init() {
  /* boardData is a data storing object, BoardData() will
   receive the initial chess pieces as an array */
  boardData = new BoardData(getInitialPieces());
  createChessBoard(boardData);
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
  document.body.appendChild(table);
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
      cell.addEventListener('click', (event) => onCellClick(event, row, col));
    }
  }

  
  // Add pieces images to board
  for (let piece of boardData.pieces) {
    const cell = table.rows[piece.row].cells[piece.col];
    addImage(cell, piece.player, piece.type);
  }
}

// After the HTML is loaded, createChessBoard() is called
window.addEventListener('load', _init);