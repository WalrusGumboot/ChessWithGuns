sprites = new Array(128); //this is like the least efficient way of doing it but just stfu please

board = new Array(64);

function preload() {
    i = WHITE
    col_name = "white"

    sprites[i + 1 ] = loadImage("./pieces/" + col_name + "/king.png")
    sprites[i + 2 ] = loadImage("./pieces/" + col_name + "/queen.png")
    sprites[i + 4 ] = loadImage("./pieces/" + col_name + "/knight.png")
    sprites[i + 8 ] = loadImage("./pieces/" + col_name + "/rook.png")
    sprites[i + 16] = loadImage("./pieces/" + col_name + "/bishop.png")
    sprites[i + 32] = loadImage("./pieces/" + col_name + "/pawn.png")

    i = BLACK
    col_name = "black"

    sprites[i + 1 ] = loadImage("./pieces/" + col_name + "/king.png")
    sprites[i + 2 ] = loadImage("./pieces/" + col_name + "/queen.png")
    sprites[i + 4 ] = loadImage("./pieces/" + col_name + "/knight.png")
    sprites[i + 8 ] = loadImage("./pieces/" + col_name + "/rook.png")
    sprites[i + 16] = loadImage("./pieces/" + col_name + "/bishop.png")
    sprites[i + 32] = loadImage("./pieces/" + col_name + "/pawn.png")
}

function setup() {
    for (let i = 0; i < 64; i++) {
        board[i] = new Square(i);
    }
}

function draw() {
    for (square of board) {
        square.show();
    }
}