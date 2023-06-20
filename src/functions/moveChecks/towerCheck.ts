import { allowedSquares } from "../../stores"
export const towerCheck = (targetSquare:number) => {
    const startSquare = targetSquare
    const finalColumn = 8
    let columnNumber = startSquare%finalColumn

    const allowedSquares2 = []

    //vertical checks

    let counter = 1    
    if (columnNumber == 0) columnNumber = finalColumn
    for (let i=columnNumber; i > 1; i--) {
        allowedSquares2.push(startSquare-counter)
        counter += 1
    }
    counter = 1
    for (let i=columnNumber; i < finalColumn; i++){
        allowedSquares2.push(startSquare+counter)
        counter +=1
    }

    //horizontal downwards
    for (let i=startSquare;i>0; i-=finalColumn){
    allowedSquares2.push(i)
    }

    //horizontal upwards

    for (let i=startSquare; i<65; i+=finalColumn){
    allowedSquares2.push(i)
    }

    const allowedSquares3 =allowedSquares2.filter(n=> n!==startSquare).sort((a,b) => a -b)
    allowedSquares.set(allowedSquares3)
}