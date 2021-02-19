let sprites = new Array(14); //this is like the least efficient way of doing it but just stfu please
let board = new Array(64);

let font = null;

let selectedSquare = null;

let couldCastle = {
    WHITE: {kingSide: true, queenSide: true},
    BLACK: {kingSide: true, queenSide: true}
}

let sideToMove = WHITE;


function preload() {
    i = WHITE
    col_name = "white"

    sprites[i + KING   ] = loadImage(GITHUB_URL + "pieces/" + col_name + "/king.png")
    sprites[i + QUEEN  ] = loadImage(GITHUB_URL + "pieces/" + col_name + "/queen.png")
    sprites[i + KNIGHT ] = loadImage(GITHUB_URL + "pieces/" + col_name + "/knight.png")
    sprites[i + ROOK   ] = loadImage(GITHUB_URL + "pieces/" + col_name + "/rook.png")
    sprites[i + BISHOP ] = loadImage(GITHUB_URL + "pieces/" + col_name + "/bishop.png")
    sprites[i + PAWN   ] = loadImage(GITHUB_URL + "pieces/" + col_name + "/pawn.png")

    i = BLACK
    col_name = "black"

    sprites[i + KING   ] = loadImage(GITHUB_URL + "pieces/" + col_name + "/king.png")
    sprites[i + QUEEN  ] = loadImage(GITHUB_URL + "pieces/" + col_name + "/queen.png")
    sprites[i + KNIGHT ] = loadImage(GITHUB_URL + "pieces/" + col_name + "/knight.png")
    sprites[i + ROOK   ] = loadImage(GITHUB_URL + "pieces/" + col_name + "/rook.png")
    sprites[i + BISHOP ] = loadImage(GITHUB_URL + "pieces/" + col_name + "/bishop.png")
    sprites[i + PAWN   ] = loadImage(GITHUB_URL + "pieces/" + col_name + "/pawn.png")

    font = loadFont("https://openprocessing-usercontent.s3.amazonaws.com/files/user121056/visual839783/hde1931a99b4a00a9d4382c23c040fb26/RobotoMono-Medium.ttf");
}

let canvas;

function setup() {
    canvas = createCanvas(windowWidth, windowHeight);
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

        board[i] = new Square(i, colour, type);

    }
}

function mousePressed() {
    for (squ of board) { //not using square as a name here since it's an internal p5 function
        /*
        if (squ.mouseHover && selectedSquare == null && squ.populated && squ.piece.colour == sideToMove) {
            selectedSquare = squ
        } else if (squ.mouseHover && selectedSquare == squ ) {
            selectedSquare = null
        } else if (squ.mouseHover && selectedSquare != squ ) {
            if (!squ.populated && selectedSquare.populated && selectedSquare.piece.colour == sideToMove) {
                //TODO: ADD CHECK FOR VALID MOVES
                //get available moves' offsets
                let available_moves = selectedSquare.piece.get_available_moves(board);
                let offsets = available_moves.map(x => x + selectedSquare.idx - squ.idx) //if any of these are zero, it's valid
                
                if (offsets.includes(0)) {
                    squ.piece = selectedSquare.piece;
                    squ.populated = true;
                    squ.piece.set_pos(squ)
                    squ.piece.hasMovedYet = true;
                    
                    selectedSquare.piece = null;
                    selectedSquare.populated = false;
    
                    selectedSquare = null;

                    if (sideToMove == WHITE) {sideToMove = BLACK} else {sideToMove = WHITE};
                }
            }
        }
        */ //OLD, BAD CODE

        if (squ.mouseHover) {
            if (selectedSquare == null && squ.populated && squ.piece.colour == sideToMove) {
                //nothing appropriate is selected, so we select this square
                selectedSquare = squ;
            } else if (selectedSquare != null && squ.populated && squ.piece.colour == sideToMove) {
                //smth was already selected, but it was our colour so just select this one instead
                selectedSquare = squ;
            } else if (selectedSquare.idx == squ.idx) {
                //the user pressed the same square again, so we deselect it
                selectedSquare = null;
            }
        }
    }
}

function draw() {
    canvas.resize(windowWidth, windowHeight);
    
    DARK_MODE ? background(15) : background(230)

    //Draw the colour scheme previews
    for (i = 0; i < Object.keys(COLOUR_SCHEMES).length; i++) {
        scheme = Object.values(COLOUR_SCHEMES)[i];

        let x1 = COL_SCH_DX + i * (COL_SCH_W + COL_SCH_M);
        let x2 = COL_SCH_DX + i * (COL_SCH_W + COL_SCH_M) + COL_SCH_W;
        let y1 = COL_SCH_DY;
        let y2 = COL_SCH_DY + COL_SCH_W;
        
        noStroke();

        //dark part of the square
        fill(scheme.dark)
        triangle(
            x1, y1, //top left corner of the triangle
            x2, y1, //top right
            x1, y2  //bottom left
        );

        //light part
        fill(scheme.light)
        triangle(
            x2, y2, //bottom right corner of the triangle
            x1, y2, //bottom left
            x2, y1 //top right
        );
        
        //line around the selected scheme
        noFill();
        strokeWeight(3);
        DARK_MODE ? stroke(220) : stroke(30);

        if (scheme == SCHEME) {
            rect(x1, y1, COL_SCH_W, COL_SCH_W);
        } else {
            if (mouseIsPressed && mouseX > x1 && mouseX < x2 && mouseY > y1 && mouseY < y2) {
                SCHEME = scheme;
            }
        }
    }

    let shiftFactorX = width / 2 - 4 * SQ_W;
    let shiftFactorY = height / 2 - 4 * SQ_W;

    let cmx = mouseX - shiftFactorX;
    let cmy = mouseY - shiftFactorY;

    translate(shiftFactorX, shiftFactorY);


    for (squ of board) { //not using square as a name here since it's an internal p5 function
        squ.update(cmx, cmy);
        squ.show(cmx, cmy);

        if (squ.populated) {squ.piece.show()} //pieces are always drawn atop
    }

    if (selectedSquare) {
        //redraw so it's on top and so that the line looks like it should
        selectedSquare.show()
        if (selectedSquare.populated) {
            selectedSquare.piece.show() //piece on top

            // //draw indicators for legal moves
            // fill(0, 100);
            // ellipseMode(CENTER);
            // noStroke()

            // let idx = selectedSquare.idx;
            // available_moves = selectedSquare.piece.get_available_moves(board);
            // for (moveOffset of available_moves) {
            //     let moveSquare = board[idx + moveOffset]
            //     let size = MOVING_MOVE_INDICATORS ? SQ_W/3 + Math.sin(frameCount / 15) * SQ_W/12 : SQ_W/3;
            //     circle(moveSquare.x + SQ_W / 2, moveSquare.y + SQ_W / 2, size)
            // }
        }
    }



    //board annotations
    DARK_MODE ? fill(SCHEME.light) : fill(SCHEME.dark)
    noStroke()
    textSize(SQ_W / 2);

    for (let i = 1; i < 9; i++) {
        text(String.fromCharCode(96 + i), (i - 0.5) * SQ_W, 8.5 * SQ_W);
    }

    for (let i = 1; i < 9; i++) {
        text((9-i).toString(), -0.5 * SQ_W, (i - 0.5) * SQ_W);
    }

    // noStroke()
    // for (squ of board) {
    //     if (squ.colour == WHITE) {
    //         fill(SCHEME.dark)
    //     } else {
    //         fill(SCHEME.light)
    //     }
    //     textSize(20)
    
    //     let offset = 0
    //     text((squ.idx - offset).toString(), squ.x + SQ_W/2, squ.y + SQ_W / 2)
    // }
}