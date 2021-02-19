//PROGRAM CONSTANTS
const KING   = 1
const QUEEN  = 2
const KNIGHT = 3
const ROOK   = 4
const BISHOP = 5
const PAWN   = 6

const WHITE = 0
const BLACK = 8

const GITHUB_URL = "https://raw.githubusercontent.com/WalrusGumboot/Schaken/master/"

//GRAPHICAL CONSTANTS
const COLOUR_SCHEMES = {
    steve_lacy: {light: "#fedfcf", dark: "#c24d15", hover_l: "#d1c6c0", hover_d: "#8f4e2f"},
    chess_com:  {light: "#eeeed2", dark: "#769656", hover_l: "#d9d9ba", hover_d: "#6c8751"},
    blueish:    {light: "#eeeefe", dark: "#55628e", hover_l: "#cbcbd1", hover_d: "#44517d"},
    grayscale:  {light: "#eaeaea", dark: "#444444", hover_l: "#dadada", hover_d: "#363636"}
}

let SCHEME = COLOUR_SCHEMES.chess_com
let DARK_MODE = true

const MOVING_MOVE_INDICATORS = false;

const SQ_W = 60

const COL_SCH_W  = 30; //the size of the items
const COL_SCH_M  = 15; //the margin between the items
const COL_SCH_DX = 20; //distance from the left edge of the screen
const COL_SCH_DY = 20; //distance from the top edge of the screen