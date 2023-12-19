import createGameboard from './gameboard';

describe('createGameboard', () => {
  test('receives attack on a ship and checks if it is hit', () => {
    const gameBoard = createGameboard();

    // Assume a ship is present at (3,3)
    for (let i = 0; i < 10; i++){
        for(let j=0; j<10;j++){
            gameBoard.receiveAttack(i, j);
        }
    }

    
    // Check if the ship at (3,3) has been hit
    expect(gameBoard.areAllBoatsSunk()).toBe(true);
  });
});

