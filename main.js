sprites = new Array(128); //this is like the least efficient way of doing it but just stfu please
board = new Array(64);

font = null;

function preload() {
    i = WHITE
    col_name = "white"

    sprites[i + 1 ] = loadImage(GITHUB_URL + col_name + "/king.png")
    sprites[i + 2 ] = loadImage(GITHUB_URL + col_name + "/queen.png")
    sprites[i + 4 ] = loadImage(GITHUB_URL + col_name + "/knight.png")
    sprites[i + 8 ] = loadImage(GITHUB_URL + col_name + "/rook.png")
    sprites[i + 16] = loadImage(GITHUB_URL + col_name + "/bishop.png")
    sprites[i + 32] = loadImage(GITHUB_URL + col_name + "/pawn.png")

    i = BLACK
    col_name = "black"

    sprites[i + 1 ] = loadImage(GITHUB_URL + col_name + "/king.png")
    sprites[i + 2 ] = loadImage(GITHUB_URL + col_name + "/queen.png")
    sprites[i + 4 ] = loadImage(GITHUB_URL + col_name + "/knight.png")
    sprites[i + 8 ] = loadImage(GITHUB_URL + col_name + "/rook.png")
    sprites[i + 16] = loadImage(GITHUB_URL + col_name + "/bishop.png")
    sprites[i + 32] = loadImage(GITHUB_URL + col_name + "/pawn.png")

    font = loadFont(GITHUB_URL + "fonts/RobotoMono_Medium.ttf");
}

function setup() {
    createCanvas(windowWidth, windowHeight);

    for (let i = 0; i < 64; i++) {
        board[i] = new Square(i);
    }

    textFont(font);
    textAlign(CENTER, CENTER)
}

function draw() {
    translate(width / 2 - 4 * SQ_W, height / 2 - 4 * SQ_W)
    for (i of board) {
        i.show();
    }

    fill(SCHEME.dark)
    textSize(SQ_W / 2);

    for (let i = 1; i < 9; i++) {
        text(String.fromCharCode(96 + i), (i - 0.5) * SQ_W, 8.5 * SQ_W);
    }

    for (let i = 1; i < 9; i++) {
        text(i.toString(), -0.5 * SQ_W, (i - 0.5) * SQ_W);
    }
}