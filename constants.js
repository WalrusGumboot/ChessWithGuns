const KING   = 1
const QUEEN  = 2
const KNIGHT = 4
const ROOK   = 8
const BISHOP = 16
const PAWN   = 32

const WHITE = 0
const BLACK = 64

const COLOR_SCHEMES = {
    steve_lacy: {light: "#fedfcf", dark: "#c24d15", hover_l: "#d1c6c0", hover_d: "#8f4e2f"},
    chess_com:  {light: "#eeeed2", dark: "#769656", hover_l: "#d9d9ba", hover_d: "#6c8751"},
    blueish:    {light: "#eeeefe", dark: "#55628e", hover_l: "#cbcbd1", hover_d: "#44517d"},
    grayscale:  {light: "#eaeaea", dark: "#444444", hover_l: "#dadada", hover_d: "#363636"}
}

const SCHEME = COLOR_SCHEMES.blueish

const DARK_MODE = true

const MOVING_MOVE_INDICATORS = false;

const GITHUB_URL = "https://raw.githubusercontent.com/WalrusGumboot/Schaken/master/"

const SQ_W = 60