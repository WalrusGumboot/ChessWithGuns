let sprites = new Array(14); //this is like the least efficient way of doing it but just stfu please
let board = new Array(64);

let font = null;

let selectedSquare = null;

let shootingIndicator;

let couldCastle = {
    WHITE: {kingSide: true, queenSide: true},
    BLACK: {kingSide: true, queenSide: true}
}

let capturedMaterial = {
    WHITE: [],
    BLACK: []
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

    shootingIndicator = loadImage(GITHUB_URL + "shooting_indicator.png");
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
    //dark mode switch
    if (mouseIsPressed && mouseX > COL_SCH_DX && mouseX < COL_SCH_W * 3 && mouseY > COL_SCH_DY + COL_SCH_W * 2.25 && mouseY < COL_SCH_DY + COL_SCH_W * 3.25) {
        DARK_MODE = !DARK_MODE;
    }

    for (squ of board) { //not using square as a name here since it's an internal p5 function
        if (squ.mouseHover) {
            if (selectedSquare != null && selectedSquare != squ && !(squ.populated && squ.piece.colour == sideToMove)) { //we want to move
                let moved = false;
                let tookAction = false;
                let moveSet = selectedSquare.piece.get_available_moves(board);
                console.log(moveSet)
                //Check if the move would be a capture
                for (capture of moveSet.captures) {
                    let targetSquare = capture.getOnBoard(board)
                    if (targetSquare.idx == squ.idx) {
                        //NOW HERE IS WHERE THE REAL SHIT HAPPENS
                        //IF THE USER CHOOSES TO SHOOT THE PIECE INSTEAD, (get this:)
                        //WE DON'T MOVE

                        console.log("CAPTURE on idx " + targetSquare.idx)
                        if (targetSquare.piece.colour == BLACK) {
                            capturedMaterial.BLACK.push(targetSquare.piece);
                        } else {
                            capturedMaterial.WHITE.push(targetSquare.piece);
                        }

                        if (keyIsDown(32)) { //space bar
                            squ.piece = null;
                            squ.populated = false;
                            selectedSquare = null;
                        } else {
                            targetSquare.piece = selectedSquare.piece;
                            targetSquare.piece.pos = targetSquare;
                            //we don't necessarily have to specify that the square is now populated
                            //it's a capture, so definitionally it was already populated
                            //however, in order to make this code make any semblance of sense in my head i'll add it
                            targetSquare.populated = true;
                            selectedSquare.piece = null;
                            selectedSquare.populated = false;
                            selectedSquare = null;

                            moved = true;
                        }
                        
                        tookAction = true;
                    }
                }

                for (move of moveSet.moves) {
                    let targetSquare = move.getOnBoard(board)
                    if (targetSquare.idx == squ.idx) {
                        console.log("MOVE to idx " + targetSquare.idx)
                    
                        targetSquare.piece = selectedSquare.piece;
                        targetSquare.piece.pos = targetSquare;
                        targetSquare.populated = true;

                        selectedSquare.piece = null;
                        selectedSquare.populated = false;
                        selectedSquare = null;

                        console.log(targetSquare)
                        moved = true;
                        tookAction = true;
                    }
                }

                if (moved) {squ.piece.hasMovedYet = true}
                if (tookAction) {sideToMove == WHITE ? sideToMove = BLACK : sideToMove = WHITE}
                
                
                // squ.piece = selectedSquare.piece
                // squ.piece.pos = squ
                // squ.populated = true
                // selectedSquare.populated = false
                // selectedSquare.piece = null;
                // selectedSquare = null

            } else if (selectedSquare == null && squ.populated && squ.piece.colour == sideToMove) {
                //nothing appropriate is selected, so we select this square
                selectedSquare = squ;
            } else if (selectedSquare == squ) {
                //the user pressed the same square again, so we deselect it
                selectedSquare = null;
            } else if (selectedSquare != null  && squ.populated && squ.piece.colour == sideToMove) {
                //smth was already selected, but it was our colour so just select this one instead
                selectedSquare = squ;
            } 
        }
    }
}

function draw() {
    canvas.resize(windowWidth, windowHeight);

    DARK_MODE ? background(15) : background(230)
    
    //Draw the colour scheme previews
    DARK_MODE ? fill(255) : fill(0);

    noStroke();

    textAlign(LEFT, BASELINE);
    textSize(COL_SCH_W / 1.8);

    text("colour schemes", COL_SCH_DX, COL_SCH_DY - 8);
    text("dark mode", COL_SCH_DX, COL_SCH_DY + COL_SCH_W * 2)

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
            if (mouseX > x1 && mouseX < x2 && mouseY > y1 && mouseY < y2) {
                strokeWeight(2);
                DARK_MODE ? stroke(190) : stroke(60);
                rect(x1, y1, COL_SCH_W, COL_SCH_W);
                if (mouseIsPressed) {SCHEME = scheme;}
            }
        }
    }

    //dark mode switch outline
    DARK_MODE ? stroke(SCHEME.light) : stroke(SCHEME.dark);
    noFill();
    strokeWeight(2);
    rect(COL_SCH_DX, COL_SCH_DY + COL_SCH_W * 2.25, COL_SCH_W * 2, COL_SCH_W, COL_SCH_W);

    //dark mode switch "button"
    noStroke();
    ellipseMode(CENTER);
    if (DARK_MODE) {
        fill(SCHEME.light);
        ellipse(COL_SCH_DX + COL_SCH_W * 1.5, COL_SCH_DY + COL_SCH_W * 2.75, COL_SCH_W / 1.75, COL_SCH_W / 1.75)
    } else {
        fill(SCHEME.dark);
        ellipse(COL_SCH_DX + COL_SCH_W * 0.5, COL_SCH_DY + COL_SCH_W * 2.75, COL_SCH_W / 1.75, COL_SCH_W / 1.75)
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

            //draw indicators for legal moves
            fill(0, 100);
            ellipseMode(CENTER);
            noStroke();

            available_moves = selectedSquare.piece.get_available_moves(board);
            for (move of available_moves.moves) {
                squ = move.getOnBoard(board)
                let size = MOVING_MOVE_INDICATORS ? SQ_W/3 + Math.sin(frameCount / 15) * SQ_W/12 : SQ_W/3;
                circle(squ.x + SQ_W / 2, squ.y + SQ_W / 2, size)
            }

            if (available_moves.captures != [] && keyIsDown(32)) { //space bar
                image(shootingIndicator, selectedSquare.x, selectedSquare.y, SQ_W, SQ_W);
            }
        }
    }



    //coordinates
    if (SHOW_COORDINATES) {
        DARK_MODE ? fill(SCHEME.light) : fill(SCHEME.dark)
        noStroke()
        textSize(SQ_W / 2);
        textAlign(CENTER, CENTER)
    
        for (let i = 1; i < 9; i++) {
            text(String.fromCharCode(96 + i), (i - 0.5) * SQ_W, 8.5 * SQ_W);
        }
    
        for (let i = 1; i < 9; i++) {
            text((9-i).toString(), -0.5 * SQ_W, (i - 0.5) * SQ_W);
        }
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