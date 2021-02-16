class Square {
    constructor(idx) {
        // idx = (rank * 8 + file);
        this.idx = idx;


        this.rank = idx % 8;
        this.rankName = String.fromCharCode(96 + this.rank); //96 is the ASCII offset for lowercase letters

        this.file = (this.idx - this.rank) / 8;

        this.colour = this.idx % 2 == 0 ? WHITE : BLACK;
    }

    show() {
        if (this.colour == WHITE) {fill(WHITE_COL)} else {fill(BLACK_COL)}
        noStroke();
        square(this.file * SQ_W, this.rank * SQ_W, SQ_W);
    }
}

class Piece {
    constructor(colour, type, pos) {
        this.colour = colour;
        this.type   = type;
        this.pos    = pos;
    }
}