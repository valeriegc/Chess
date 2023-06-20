import { allowedSquares } from "../../stores"

export const bishopCheck = (targetSquare:number) => {

const allowedSquares1 = []

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

allowedSquares.set(allowedSquares1)
console.log(allowedSquares1)
}