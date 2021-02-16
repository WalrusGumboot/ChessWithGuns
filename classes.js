class Piece {
    constructor(colour, type, pos) {
        this.colour = colour;
        this.type   = type;
        this.pos    = pos;

        this.value = this.colour + this.type;
        this.sprite = sprites[this.value]
    }

    show() {
        image(this.sprite, this.pos.x, this.pos.y, SQ_W, SQ_W)
    }
}

class Square {
    constructor(idx, piece_colour = null, piece_type = null) {
        // idx = (rank * 8 + file);
        this.idx = idx;

        this.file = idx % 8;
        this.fileName = String.fromCharCode(96 + this.file + 1); //96 is the ASCII offset for lowercase letters, add 1 bc. 0-based idx
        
        this.rank = (this.idx - this.file) / 8;

        if (this.rank % 2 == 0) {this.file % 2 == 1 ? this.colour = WHITE : this.colour = BLACK}
        else {this.file % 2 == 0 ? this.colour = WHITE : this.colour = BLACK}

        
        this.x = this.file * SQ_W
        this.y = (7 - this.rank) * SQ_W

        //console.log("INDEX: " + this.idx + " - file: " + this.file + " (" + this.fileName + ") - rank: " + this.rank + " - x, y: " + this.x + ", " + this.y);
        
        this.populated = false;
        
        if (piece_colour != null && piece_type != null) {
            this.piece     = new Piece(piece_colour, piece_type, this);
            this.populated = true;
        }

        this.mouseHover = false;
    }

    show(cmx, cmy) {
        noStroke();
        this.colour == WHITE ? fill(SCHEME.light) : fill(SCHEME.dark)
        if (this.mouseHover) {this.colour == WHITE ? fill(SCHEME.hover_l) : fill(SCHEME.hover_d)}

        rect(this.x, this.y, SQ_W, SQ_W);

        if (this.populated) {this.piece.show()}
    }

    update(cmx, cmy) {
        if (cmx > this.x && cmx < this.x + SQ_W && cmy > this.y && cmy < this.y + SQ_W) {
            this.mouseHover = true;
            if (this.populated) {
                if (mouseIsPressed) {
                    this.piece.pos = {x: cmx, y: cmy};
                } else {
                    this.piece.pos = this;
                }
            }
        }
    }
}