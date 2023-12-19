

import createShip from './ship.js';


function createGameboard() {
  let boats = [];
  let boatSizes = [2,2,3,4,6];
  let board = [];

  // Creates the 10x10 board - Each element tells us if it contains a boat & if it's hit
  for (let i = 0; i < 10; i++) {
    board[i] = [];
    for (let j = 0; j < 10; j++) {
      board[i][j] = { hit: false, boat: null };
    }
  }

 

 
  //Add boats to 10x10 board
  placeBoats();
  

  //Checks coordinates with board, if boat present then call .hit() ,sets board.hit = true => Returns true if hits a boat
  const receiveAttack = (x, y) => {



    if (board[y][x].boat != null) {
      board[y][x].boat.hit();
      console.log("I got hit!");
      return true;
    }
    board[x][y].hit = true;
    return false;
  };

  //Checks if all boats are sunk -> returns true/false
  const areAllBoatsSunk = () => {
    return boats.every((boat) => boat.isSunk());
  };

  //Returns a board array for AI Enemy -> 10x10 array of true/false
  const hitMap = () => {
    return board.map(row => row.map(cell => cell.hit));
  }

  // Returns a board array of ship locations -> 10x10 array of true/false
const boatMap = () => {
  return board.map(row => row.map(cell => cell.boat !== null));
}


  
  //SETUP: placeBoats & returnValidPosition(use in placeBoats) are to randomly place the boats in correct locations
  function placeBoats() {
    boatSizes.forEach((size) => {
      const newShip = createShip(size);
      boats.push(newShip);
      let validCoords = null;
      console.log(`New boat added ${size}, ${boats}`);
      while (!validCoords) {
        validCoords = returnValidPosition(size);
      }
  
      let coords = { x: validCoords.position.x, y: validCoords.position.y };
      let dir = validCoords.direction;
  
      for (let i = 0; i < size; i++) {
        let xVal = dir === 'horizontal' ? i : 0;
        let yVal = dir === 'vertical' ? -i : 0;
        board[coords.x + xVal][coords.y + yVal].boat = newShip;
      }
  
    });
  }
//SETUP
function returnValidPosition(length) {
  let position = { x: Math.floor(Math.random() * 10), y: Math.floor(Math.random() * 10) };
  const direction = Math.random() >= 0.5 ? 'horizontal' : 'vertical';

  // Check if position is in bounds
  if (direction === 'horizontal') {
      if (position.x + length - 1 > 9) {
          return false;
      }
  } else {
      if (position.y - length < 0) {
          return false;
      }
  }

  // Check if position doesn't clash with existing boats
  for (let i = 0; i < length; i++) {
      let xVal = direction === 'horizontal' ? i : 0;
      let yVal = direction === 'vertical' ? -i : 0;

      if (board[position.x + xVal][position.y + yVal].boat !== null) {
          return false;
      }
  }

  return { position, direction };
}

const logBoatMap = () => {
  for (let i = 0; i < 10; i++) {
    let string = "";
    for (let j = 0; j < 10; j++) {

      if (board[9-i][j].boat !== null) {
        string = string + "^";
      } else {
        string = string + "*";
      }
    }

    console.log(string);
  }

}


  // Return the board and boats
  return {receiveAttack, areAllBoatsSunk, hitMap, boatMap, logBoatMap};
}



export default createGameboard;
//module.exports = createShip;
