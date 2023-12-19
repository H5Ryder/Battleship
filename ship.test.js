// shipFactory.test.js
const createShip = require('./ship');


describe('createShip', () => {
  test('creates a ship with the n length which returns true isSunk after n hits', () => {
    const shipLength = 2;
    const ship = createShip(shipLength);

    ship.hit();
    ship.hit();
   
    expect(ship.isSunk()).toBe(true);
  });

 
});


