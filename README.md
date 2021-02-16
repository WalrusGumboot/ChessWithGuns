# Chess With Guns
Inspired by [a Twitter thread by Elizabeth Sampat](https://twitter.com/twoscooters/status/1359663550130761729), I decided to make an online chess game implementing the Chess With Guns variant: every square that a piece can legally move to is a square that can be captured on to without having to move the piece.

## Example
Consider the slightly uncommon `1. e4 Nf6 2. d3`. The board looks like this. Since it's black's turn, taking with the knight on e4 is a possible move. However, black can instead opt to shoot white's pawn, leaving the knighy in place. The board now looks like this.

### Notation
I propose that for a move which captures but doesn't take, pipe symbols are added around the move (e.g. `1. e4 Nf6 2. d3 |Nxe4|`, after which black's knight would still be on f6). As far as I know, this doesn't conflict with any existing modifications to PGN notation (such as `Q@d7` in Crazyhouse or `(B-N)N*c7` in Hostage Chess).
