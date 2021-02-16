let sprites = new Array(128); //this is like the least efficient way of doing it but just stfu please
let board = new Array(64);
let font = null;
let draggedSquare = null;
let draggedOffsetX = null;
let draggedOffsetY = null;

function preload() {
    i = WHITE
    col_name = "white"

    sprites[i + 1 ] = loadImage(GITHUB_URL + "pieces/" + col_name + "/king.png")
    sprites[i + 2 ] = loadImage(GITHUB_URL + "pieces/" + col_name + "/queen.png")
    sprites[i + 4 ] = loadImage(GITHUB_URL + "pieces/" + col_name + "/knight.png")
    sprites[i + 8 ] = loadImage(GITHUB_URL + "pieces/" + col_name + "/rook.png")
    sprites[i + 16] = loadImage(GITHUB_URL + "pieces/" + col_name + "/bishop.png")
    sprites[i + 32] = loadImage(GITHUB_URL + "pieces/" + col_name + "/pawn.png")

    i = BLACK
    col_name = "black"

    sprites[i + 1 ] = loadImage(GITHUB_URL + "pieces/" + col_name + "/king.png")
    sprites[i + 2 ] = loadImage(GITHUB_URL + "pieces/" + col_name + "/queen.png")
    sprites[i + 4 ] = loadImage(GITHUB_URL + "pieces/" + col_name + "/knight.png")
    sprites[i + 8 ] = loadImage(GITHUB_URL + "pieces/" + col_name + "/rook.png")
    sprites[i + 16] = loadImage(GITHUB_URL + "pieces/" + col_name + "/bishop.png")
    sprites[i + 32] = loadImage(GITHUB_URL + "pieces/" + col_name + "/pawn.png")

    font = loadFont("https://openprocessing-usercontent.s3.amazonaws.com/files/user121056/visual839783/hde1931a99b4a00a9d4382c23c040fb26/RobotoMono-Medium.ttf");
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    textFont(font);
    textAlign(CENTER, CENTER)

    for (let i = 0; i < 64; i++) {
        let type, colour;

        if (i < 16) {colour = WHITE} else
        if (i > 47) {colour = BLACK}

        if (i == 0 || i == 7 || i == 56 ||i == 63) {type = ROOK}   else
        if (i == 1 || i == 6 || i == 57 ||i == 62) {type = KNIGHT} else
        if (i == 2 || i == 5 || i == 58 ||i == 61) {type = BISHOP} else

        if (i == 3 || i == 59) {type = QUEEN} else
        if (i == 4 || i == 60) {type = KING}  else

        if ((i >= 8 && i < 16) || (i >= 48 && i < 56)) {type = PAWN}

        board[i] = new Square(i, type, colour);
    }
}

function draw() {
    DARK_MODE ? background(15) : background(230)

    let shiftFactorX = width / 2 - 4 * SQ_W;
    let shiftFactorY = height / 2 - 4 * SQ_W;

    let cmx = mouseX - shiftFactorX;
    let cmy = mouseY - shiftFactorY;

    translate(shiftFactorX, shiftFactorY);

    if (!mouseIsPressed && draggedSquare != null) {
        draggedSquare  = null;
        draggedOffsetX = null;
        draggedOffsetY = null;
    } 

    for (squ of board) { //not using square as a name here since it's an internal p5 function
        result = squ.update(cmx, cmy, draggedSquare, draggedOffsetX, draggedOffsetY)
        if (result.change) {
            draggedSquare = squ;
            draggedOffsetX = result.dx;
            draggedOffsetY = result.dy;
        }

        squ.show(cmx, cmy);
    }

    for (squ of board) {
        if (squ.populated) {squ.piece.show()}
    }

    //console.log(draggedOffsetX, draggedOffsetY)

    DARK_MODE ? fill(SCHEME.light) : fill(SCHEME.dark)
    textSize(SQ_W / 2);

    for (let i = 1; i < 9; i++) {
        text(String.fromCharCode(96 + i), (i - 0.5) * SQ_W, 8.5 * SQ_W);
    }

    for (let i = 1; i < 9; i++) {
        text((9-i).toString(), -0.5 * SQ_W, (i - 0.5) * SQ_W);
    }
}