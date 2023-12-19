// player.js
import createGameboard from './gameboard.js';


function createPlayer(isAI = false, DOMClass) {
    let board = createGameboard();
    let className = DOMClass;


    const attackAI = (enemyBoard) => {

        //Generate a valid attack position
        let attackLocation = null;
        while(!attackLocation){
            attackLocation = { x: Math.floor(Math.random() * 10), y: Math.floor(Math.random() * 10)};
            if (enemyBoard[attackLocation.x][attackLocation.y]) {
                attackLocation = null;
            }
        }

        return attackLocation;

    }

    const classVal = () => {
        return className;
    }


    return {attackAI, board, classVal};
}

export default createPlayer;

