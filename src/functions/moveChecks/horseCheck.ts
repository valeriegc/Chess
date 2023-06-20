import { allowedSquares } from "../../stores"

export const horseCheck = (targetSquare: number) => {
    const startColumnNumber = targetSquare%8 == 0 ? 8 : targetSquare%8

    const columnCounter = (n:number) => {
    if (n%8 == 0) return 8
    else return n%8
    }

    const plusOneRow = [-15,17] //works
    const plusTwoRow = [-6, 10] //works
    const minusOneRow = [-17,15]
    const minusTwoRow = [6, -10]
    const allowedSquares1 = []

    plusOneRow.map(n => columnCounter(targetSquare + n) == (startColumnNumber +1) ? allowedSquares1.push(targetSquare+n) : n)
    console.log(allowedSquares1)
    plusTwoRow.map(n => columnCounter(targetSquare + n) == (startColumnNumber +2) ? allowedSquares1.push(targetSquare+n) : n)
    console.log(allowedSquares1)
    minusOneRow.map(n => columnCounter(targetSquare +n) == (startColumnNumber -1) ? allowedSquares1.push(targetSquare+n) : n)
    console.log(allowedSquares1)
    minusTwoRow.map(n => columnCounter(targetSquare +n) == (startColumnNumber -2) ? allowedSquares1.push(targetSquare+n) : n)
    console.log(allowedSquares1)

    const allowedSquares2 = allowedSquares1.filter(n => n>0 && n<65)
    
    allowedSquares.set(allowedSquares2)

}