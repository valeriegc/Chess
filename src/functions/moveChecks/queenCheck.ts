import { allowedSquares } from "../../stores"

export const queenCheck = (targetSquare:number) => {
    const startSquare = targetSquare
    const startColumnNumber = targetSquare%8 == 0 ? 8 : targetSquare%8

    const allowedSquares1 = []

    //vertical checks

    let counter = 1    
    for (let i=startColumnNumber; i > 1; i--) {
        allowedSquares1.push(startSquare-counter)
        counter += 1
    }
    counter = 1
    for (let i=startColumnNumber; i < 8; i++){
        allowedSquares1.push(startSquare+counter)
        counter +=1
    }

    //horizontal downwards
    for (let i=startColumnNumber;i>0; i-=8){
    allowedSquares1.push(i)
    }

    //horizontal upwards

    for (let i=startColumnNumber; i<65; i+=8){
    allowedSquares1.push(i)
    }

    let currentSquare = targetSquare

if (currentSquare%8 !== 1 && Math.ceil(currentSquare/8) !== 8){
for (let i=0; i< 8; i++){
    currentSquare = currentSquare +7
    if (currentSquare%8 == 1 || Math.ceil(currentSquare/8) == 8) i = 8
    allowedSquares1.push(currentSquare)
}}
currentSquare = targetSquare

if (Math.ceil(currentSquare/8) !==8 && currentSquare%8 !== 0 ){
for (let i=0; i < 8; i++){
    currentSquare = currentSquare+9
    if (currentSquare%8 == 0 || Math.ceil(currentSquare/8)==8) i = 8
    allowedSquares1.push(currentSquare)
}}
currentSquare = targetSquare

if (Math.ceil(currentSquare/8) !==1 && currentSquare%8 !== 0 ){
for (let i=0; i<8; i++){
    currentSquare = currentSquare -7
    if (currentSquare%8 == 0 || Math.ceil(currentSquare/8)==1) i = 8
    allowedSquares1.push(currentSquare)}
}
currentSquare = targetSquare

if (currentSquare%8 !== 1 && Math.ceil(currentSquare/8)!==1){
for (let i=0; i < 8; i++){
    currentSquare = currentSquare-9
    if (currentSquare%8 == 1 || Math.ceil(currentSquare/8)==1) i = 8
    allowedSquares1.push(currentSquare)
}}

    const allowedSquares2 = allowedSquares1.filter(n=> n!==startSquare).sort((a,b) => a -b)
    allowedSquares.set(allowedSquares2)
}