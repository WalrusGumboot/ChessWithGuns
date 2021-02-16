class Square {
    constructor(idx) {
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
    }

    show() {
        if (this.colour == WHITE) {fill(SCHEME.light)} else {fill(SCHEME.dark)}
        noStroke();
        rect(this.x, this.y, SQ_W, SQ_W);
    }
}

class Piece {
    constructor(colour, type, pos) {
        this.colour = colour;
        this.type   = type;
        this.pos    = pos;
    }
}