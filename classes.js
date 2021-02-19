class Move {
    constructor(xOff, yOff, currentSquare) {
        this.xOff = xOff;
        this.yOff = yOff;
        this.currentSquare = currentSquare;
    }

    testIfOnBoard() {
        let file = this.currentSquare.file + this.xOff;
        let rank = this.currentSquare.rank + this.yOff;

        return rank > 0 || rank < 7 || file > 0 || file < 7
    }

    getOnBoard(board) {
        let new_file = this.currentSquare.file + this.xOff;
        let new_rank = this.currentSquare.rank + this.yOff;
        let new_idx  = 8 * new_rank + new_file;

        return board[new_idx]
    }
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

    set_pos(new_pos) {this.pos = new_pos;}

    get_available_moves(board) {
        let moves    = []
        let captures = []

        switch (this.type) {
            case PAWN:
                moves.push(new Move(0, 1, this.pos));
                if (!this.hasMovedYet) {moves.push(new Move(0, 2, this.pos))}
                if (board[this.pos.idx + 7].populated && board[this.pos.idx + 7].piece.colour != this.colour) {
                    captures.push(new Move(-1, 1, this.pos)) //takes to the left
                }
                if (board[this.pos.idx + 9].populated && board[this.pos.idx + 9].piece.colour != this.colour) {
                    captures.push(new Move(1, 1, this.pos)) //takes to the right
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
            default:
                //if something's gotten to this point, i done fucked it up right 'n proper
                alert("You done fucked it up right \'n proper, mate");
                break;
        }

        moves    = moves.filter(x => x.testIfOnBoard())
        captures = captures.filter(x => x.testIfOnBoard())

        //at this point, there are still a bunch of invalid moves:
        // * pieces can move onto pieces of the same colour
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