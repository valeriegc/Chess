import { allowedSquares } from "../../stores";

export const kingCheck = (targetSquare:number) => {
const allowedSquares2 = []
const columnNumber = targetSquare%8 == 0 ? 8: targetSquare%8

if (columnNumber == 1) {
    allowedSquares2.push(targetSquare+1, targetSquare-8, targetSquare+8)
}
else if (columnNumber == 8){
    allowedSquares2.push(targetSquare-1, targetSquare-8, targetSquare+8)
}
else {
    allowedSquares2.push(targetSquare-1,targetSquare+1,
        targetSquare + 8, targetSquare-8)
}
allowedSquares.set(allowedSquares2)
}