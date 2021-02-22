class Move {
    constructor(xOff, yOff, currentSquare) {
        this.xOff = xOff;
        this.yOff = yOff;
        this.currentSquare = currentSquare;
        
        this.targetFile = this.currentSquare.file + this.xOff;
        this.targetRank = this.currentSquare.rank + this.yOff;

        this.targetSquare = new Square(this.targetRank * 8 + this.targetFile) //this assumes a valid move
    }

    testIfOnBoard() {
        let file = this.targetFile;
        let rank = this.targetRank;

        return rank >= 0 && rank <= 7 && file >= 0 && file <= 7
    }

    getOnBoard(board) {
        return board[this.targetSquare.idx]
    }

    changeStartingSquare(startingSquare) { //Smth is deffo wrong with this fn but i cant fix it rn
        //First, we get the difference between the given square and this.currentSquare
        let dx = this.currentSquare.file - startingSquare.file;
        let dy = this.currentSquare.rank - startingSquare.rank;

        //Then, we subtract the xOff and yOff
        dx -= this.xOff;
        dy -= this.yOff;

        //And there you go, now we have everything we need
        this.currentSquare = startingSquare;
        this.xOff = dx;
        this.yOff = dy;

        return this
    }
}

function getAllInDirection(move, board) {
    //This function is a bit special, in that the move isn't a literal board move.
    //It just signifies a direction (e.g. (-1, 1) is towards the top left)
    //It then returns an ordered list of all moves on the board in that direction,
    //starting from the Move's square
    moves = []
    captures = []
    testMove = move
    for (let i = 0; i < 8; i++) {
        //I'm not smart enough to make this recursive so I'mma do it the hard way
        let testSquare = testMove.getOnBoard(board)
        if (testMove.testIfOnBoard()) {
            if (!testSquare.populated) {
                moves.push(testMove);
            } else if (testSquare.piece.colour != move.getOnBoard(board).piece.colour) {
                captures.push(testMove);
                break;
            }
            testMove = new Move(move.xOff, move.yOff, testSquare);
        } else {
            break;
        }
    }

    
    //of note is that all moves are still the same offset, they just have different starting squares
    //so we run them all through a function that remaps the starting square and adjusts the offsets
    moves    = moves.map(x => x.changeStartingSquare(move.currentSquare))
    console.log(moves)
    captures = captures.map(x => x.changeStartingSquare(move.currentSquare))

    return {moves: moves, captures: captures}
}

class Piece {
    constructor(colour, type, pos) {
        this.colour = colour;
        this.type   = type;
        this.pos    = pos;

        this.value = this.colour + this.type;
        this.sprite = sprites[this.value]

        this.hasMovedYet = false //used for implementing castling and double pawn moves
    }

    show() {
        image(this.sprite, this.pos.x, this.pos.y, SQ_W, SQ_W)
    }

    get_available_moves(board) {
        let moves    = []
        let captures = []
        
        let directions = []

        switch (this.type) {
            case PAWN:
                if (this.colour == WHITE) {
                    moves.push(new Move(0, 1, this.pos));
                    if (!this.hasMovedYet) {moves.push(new Move(0, 2, this.pos))}
                    if (board[this.pos.idx + 7].populated && board[this.pos.idx + 7].piece.colour != this.colour) {
                        captures.push(new Move(-1, 1, this.pos)) //takes to the left
                    }
                    if (board[this.pos.idx + 9].populated && board[this.pos.idx + 9].piece.colour != this.colour) {
                        captures.push(new Move(1, 1, this.pos)) //takes to the right
                    }
                } else {
                    moves.push(new Move(0, -1, this.pos));
                    if (!this.hasMovedYet) {moves.push(new Move(0, -2, this.pos))}
                    if (board[this.pos.idx - 9].populated && board[this.pos.idx - 9].piece.colour != this.colour) {
                        captures.push(new Move(-1, -1, this.pos)) //takes to the left
                    }
                    if (board[this.pos.idx - 7].populated && board[this.pos.idx - 7].piece.colour != this.colour) {
                        captures.push(new Move(1, -1, this.pos)) //takes to the right
                    }
                }
                
                //For now, I really don't feel like dealing with fucking en passant
                //Maybe in the future I'll have less will to live, and I'll attempt it
                break;
            case KNIGHT:
                moves.push(new Move(-2, -1, this.pos))
                moves.push(new Move(-1, -2, this.pos))
                moves.push(new Move( 1, -2, this.pos))
                moves.push(new Move( 2, -1, this.pos))
                moves.push(new Move( 2,  1, this.pos))
                moves.push(new Move( 1,  2, this.pos))
                moves.push(new Move(-1,  2, this.pos))
                moves.push(new Move(-2,  1, this.pos))

                captures = moves //the captures and moves for a knight are always equal
                break;
            case KING:
                moves.push(new Move(-1, -1, this.pos))
                moves.push(new Move(-1,  0, this.pos))
                moves.push(new Move(-1,  1, this.pos))
                moves.push(new Move( 0, -1, this.pos))
                moves.push(new Move( 0,  1, this.pos)) 
                moves.push(new Move( 1, -1, this.pos))
                moves.push(new Move( 1,  0, this.pos))
                moves.push(new Move( 1,  1, this.pos))

                captures = moves;
                break;
            case ROOK:
                //I don't add the captures yet for rook, bishop and queen;
                //they get added in a tricky trick later on
                directions = [
                    new Move(-1,  0, this.pos), 
                    new Move( 1,  0, this.pos), 
                    new Move( 0, -1, this.pos), 
                    new Move( 0,  1, this.pos)
                ]
                for (let m of directions) {
                    let result = getAllInDirection(m, board);
                    moves = moves.concat(result.moves);
                    captures = captures.concat(result.captures);
                }
                break;
            case BISHOP:
                directions = [
                    new Move(-1, -1, this.pos), 
                    new Move(-1,  1, this.pos), 
                    new Move( 1, -1, this.pos), 
                    new Move( 1,  1, this.pos)
                ]
                for (let m of directions) {
                    let result = getAllInDirection(m, board);
                    moves = moves.concat(result.moves);
                    captures = captures.concat(result.captures);
                }
                break;
            case QUEEN:
                //just literally the bishop and rook together
                directions = [
                    new Move(-1,  0, this.pos), 
                    new Move( 1,  0, this.pos), 
                    new Move( 0, -1, this.pos), 
                    new Move( 0,  1, this.pos),
                    new Move(-1, -1, this.pos), 
                    new Move(-1,  1, this.pos), 
                    new Move( 1, -1, this.pos), 
                    new Move( 1,  1, this.pos)
                ]
                for (let m of directions) {
                    let result = getAllInDirection(m, board);
                    moves = moves.concat(result.moves);
                    captures = captures.concat(result.captures);
                }
                break;
            default:
                //if something's gotten to this point, i done fucked it up right 'n proper
                alert("You done fucked it up right \'n proper, mate. \nPlease file an issue at https://github.com/WalrusGumboot/ChessWithGuns/issues/new/choose.");
                break;
        }

        //moves can only happen to unpopulated squares
        moves    = moves.filter(x => !(board[x.targetSquare.idx].populated))
        //captures can only happen on squares populated by the other colour
        captures = captures.filter(x => board[x.targetSquare.idx].populated && board[x.targetSquare.idx].piece.colour != this.colour)
        

        //at this point, there are still a bunch of invalid moves:
        // * pieces can block the paths of e.g. rooks but this system just don't give a fuck
        // * absolute pins aren't accounted for
        // * moves that don't prevent a check when the king is in check are still allowed
        // * and many, many more.
        
        //for now though, we don't care
        return {moves: moves, captures: captures}
    }
}

class Square {
    constructor(idx, piece_colour = null, piece_type = null) {
        // idx = (rank * 8 + file);
        this.idx = idx;

        this.file = idx % 8;
        this.fileName = String.fromCharCode(96 + this.file + 1); //96 is the ASCII offset for lowercase letters, add 1 bc. 0-based idx
        
        this.rank = (this.idx - this.file) / 8;

        (this.rank + this.file) % 2 == 0 ? this.colour = BLACK : this.colour = WHITE; //thank you, Sebastian Lague! 
        
        this.x = this.file * SQ_W
        this.y = (7 - this.rank) * SQ_W

        //console.log("INDEX: " + this.idx + " - file: " + this.file + " (" + this.fileName + ") - rank: " + this.rank + " - x, y: " + this.x + ", " + this.y);
        
        this.populated = false;
        this.piece = null;
        
        if (piece_colour != null && piece_type != null) {
            this.piece     = new Piece(piece_colour, piece_type, this);
            this.populated = true;
        }

        this.mouseHover = false;
    }

    show() {
        stroke(0)

        selectedSquare == this ? strokeWeight(2) : noStroke()
        drawingContext.setLineDash([SQ_W / 1.5]) //internally turns into [SQ_W / 1.5, SQ_W / 1.5]
        drawingContext.lineDashOffset = Math.sin(frameCount / 60) * SQ_W * 4
        drawingContext.lineCap = "butt"

        this.colour == WHITE ? fill(SCHEME.light) : fill(SCHEME.dark)
        if (this.mouseHover) {this.colour == WHITE ? fill(SCHEME.hover_l) : fill(SCHEME.hover_d)}

        rect(this.x, this.y, SQ_W, SQ_W);

        //reset the fancy drawing ctx parameters i fucked up earlier
        drawingContext.setLineDash([])
        drawingContext.lineCap = "round"
    }

    update(cmx, cmy) {
        if (cmx > this.x && cmx < this.x + SQ_W && cmy > this.y && cmy < this.y + SQ_W) {
            this.mouseHover = true;
        } else {
            this.mouseHover = false;
        }
    }
}