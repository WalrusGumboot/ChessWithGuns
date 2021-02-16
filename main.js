sprites = new Array(128); //this is like the least efficient way of doing it but just stfu please

board = new Array(64);

function preload() {
    github_url = "https://raw.githubusercontent.com/WalrusGumboot/Schaken/master/pieces/";
    i = WHITE
    col_name = "white"

    sprites[i + 1 ] = loadImage(github_url + col_name + "/king.png")
    sprites[i + 2 ] = loadImage(github_url + col_name + "/queen.png")
    sprites[i + 4 ] = loadImage(github_url + col_name + "/knight.png")
    sprites[i + 8 ] = loadImage(github_url + col_name + "/rook.png")
    sprites[i + 16] = loadImage(github_url + col_name + "/bishop.png")
    sprites[i + 32] = loadImage(github_url + col_name + "/pawn.png")

    i = BLACK
    col_name = "black"

    sprites[i + 1 ] = loadImage(github_url + col_name + "/king.png")
    sprites[i + 2 ] = loadImage(github_url + col_name + "/queen.png")
    sprites[i + 4 ] = loadImage(github_url + col_name + "/knight.png")
    sprites[i + 8 ] = loadImage(github_url + col_name + "/rook.png")
    sprites[i + 16] = loadImage(github_url + col_name + "/bishop.png")
    sprites[i + 32] = loadImage(github_url + col_name + "/pawn.png")
}

function setup() {
    createCanvas(windowWidth, windowHeight);

    for (let i = 0; i < 64; i++) {
        board[i] = new Square(i);
    }
}

function draw() {
    translate(width / 2 - 4 * SQ_W, height / 2 - 4 * SQ_W)
    for (i of board) {
        i.show();
    }
}