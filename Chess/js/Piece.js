/* 'Piece' - stores chess piece info*/
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
    //   Get relative moves
      let moves;
      const pieceType = this.type.charAt(0).toUpperCase() + this.type.slice(1);
      moves = "this.get" + pieceType + "Moves(boardData);"
      moves = eval(moves);
    

      // Get filtered absolute moves
      let filteredMoves = [];
      for (let absoluteMove of moves) {
        const absoluteRow = absoluteMove[0];
        const absoluteCol = absoluteMove[1];
        if (absoluteRow >= 0 && absoluteRow <= 7 && absoluteCol >= 0 && absoluteCol <= 7) {
          filteredMoves.push(absoluteMove);
        }
      }
    //   console.log('filteredMoves', filteredMoves);
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
  
      // Shein's method:
      // let position = [this.row + direction, this.col];
      // let firstPos = [this.row + (direction*2), this.col];
      // if (boardData.isEmpty(position[0], position[1]) && this.row !== 1 || boardData.isEmpty(position[0], position[1]) && this.row !== 6) {
      //   result.push(position);
      // }  
      // if (boardData.isEmpty(position[0], position[1]) && this.row === 1 || boardData.isEmpty(position[0], position[1]) && this.row === 6) {
      //   result.push(firstPos);
      // }  
  
  
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
  