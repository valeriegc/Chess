import { allowedSquares } from "../../stores"
import { lastColumn, columnFinder, biggestSquare, firstColumn, smallestSquare } from "../../global"
export const towerCheck = (targetSquare:number) => {

    const columnNumber = columnFinder(targetSquare)
    const tempArray = []
    let counter = 1    

    //horizontal checks

    for (let i=columnNumber; i > firstColumn; i--) {
        tempArray.push(targetSquare-counter)
        counter += 1
    }
    counter = 1
    for (let i=columnNumber; i < lastColumn; i++){
        tempArray.push(targetSquare+counter)
        counter +=1
    }

    //vertical checks
    for (let i=targetSquare;i>=smallestSquare; i-=lastColumn){
    tempArray.push(i)
    }

    for (let i=targetSquare; i<= biggestSquare; i+=lastColumn){
    tempArray.push(i)
    }

    allowedSquares.set(tempArray.filter(n=> n!==targetSquare).sort((a,b) => a -b))
  
}