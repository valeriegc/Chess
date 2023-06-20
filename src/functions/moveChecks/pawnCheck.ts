import type { SvelteComponent } from "svelte";
import { allowedSquares } from "../../stores";
import PawnB from "../../pieces/Pawn_B.svelte";

export const pawnCheck = (targetSquare:number,movingPiece:typeof SvelteComponent) => {

const row = 8
const allowedSquares2 =[]
const rowNumber = Math.ceil(targetSquare/8)

if (movingPiece == PawnB ){
    rowNumber == 2 ? allowedSquares2.push(targetSquare + row, targetSquare + 2*row) : allowedSquares2.push(targetSquare+row)
}
else {
    rowNumber==7 ? allowedSquares2.push(targetSquare- row, targetSquare - 2*row): allowedSquares2.push(targetSquare - row)
}
allowedSquares.set(allowedSquares2)

}