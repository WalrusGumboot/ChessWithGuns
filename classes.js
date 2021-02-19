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
        let base_moves = [] 
        //base_moves

        switch (this.type) {
            case PAWN:
                base_moves.push(8)
                if (!this.hasMovedYet) { //double pawn movement
                    base_moves.push(16)
                }
                break;
            case KING:
                //TODO: implement castling
                for (i of [-9, -8, -7, -1, 1, 7, 8, 9]) {
                    base_moves.push(i)
                }
                break;
            case KNIGHT:
                for (i of [-17, -15, -10, -6, 6, 10, 15, 17]) {
                    base_moves.push(i)
                }
            default:
                //we never get to this point
                break;
        }

        let moves = base_moves;
        //first, we filter out all moves that aren't on the board
        moves = moves.filter(x => 0 <= x <= 64)


        //most importantly, we flip all of black's moves
        if (this.colour == BLACK) {
            moves = moves.map(x => x * -1)
        }

        return moves; //TEMPORARY
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

    show(cmx, cmy) {
        stroke(0)

        selectedSquare == this ? strokeWeight(2) : noStroke()
        drawingContext.setLineDash([SQ_W / 3]) //internally turns into [SQ_W, SQ_W]
        drawingContext.lineDashOffset = (frameCount * 1.5)
        drawingContext.lineCap = "butt"

        this.colour == WHITE ? fill(SCHEME.light) : fill(SCHEME.dark)
        if (this.mouseHover) {this.colour == WHITE ? fill(SCHEME.hover_l) : fill(SCHEME.hover_d)}

        rect(this.x, this.y, SQ_W, SQ_W);

        //reset the fancy drawing ctx parameters we mucked up earlier
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