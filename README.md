# Chess With Guns
Inspired by [a Twitter thread by Elizabeth Sampat](https://twitter.com/twoscooters/status/1359663550130761729), I decided to make an online chess game implementing the Chess With Guns variant: every square that a piece can legally move to is a square that can be captured on to without having to move the piece. Out of all the ones in the thread, this seemed like the most interesting variant.

### Notation
I propose that for a move which captures but doesn't take, pipe symbols are added around the move (e.g. `1. e4 Nf6 2. d3 |Nxe4|`, after which black's knight would still be on f6). As far as I know, this doesn't conflict with any existing modifications to PGN notation (such as `Q@d7` in Crazyhouse or `(B-N)N*c7` in Hostage Chess).

## Examples
### Openings
Consider the slightly unusual `1. e4 Nf6 2. d3` (known as the Alekhine's Defense: Maróczy Variation. At the time of writing, there are 1233 games like this on chess.com). The board looks like the following:  
![](/readme_assets/1.%20e4%20Nf6%202.%20d3.png)  
Since it's black's turn, taking with the knight on e4 is a possible move. However, black can instead opt to shoot white's pawn, leaving the knighy in place. The board now looks like ![](/readme_assets/1.%20e4%20Nf6%202.%20d3%20(Nxe4).png)

### Endgames
Let's take a look at a recent game between Alireza Firouzja and Fabiano Caruana, specifically, their game from the 11th round of the 2021 Tata Steel Masters tournament on Jqn 29 in Wijk aan Zee. Move 61 (which is where the players drew) lands us in this position: ![](/readme_assets/firouzja_v_caruana_1.png)  
Notice that at first glance one might think that white's rook is hanging, but the pawn on `g3` defends it. Of note is that if the attacking piece was different (for example a bishop) it would be hanging: the rook cannot be taken by the king because it would put him in check; no such rules apply to the bishop, of course.  
Additionally, in a normal game, white might be tempted to push the c pawn to provoke `Rc3`, which could lead to `..c6 Rxc6,  g4 fxg4+, Kxg4 Rg6+`, forcing a draw. This kind of deflection doesn't work in Chess with Guns; after `c6` black can play `|Rxc6|`, maintaining the pin on white's g pawn.
