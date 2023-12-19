function createShip(length) {
    let hits = 0;
    let sunk = false;

    const isSunk = () => {
        
        if (hits == length){
            console.log("isSunk is true");
        }
        return hits == length;
    };

    const hit = () => {
        if (sunk) {
            console.log("Error: Already Sunk");
            return null;
        }
        hits++;
        sunk = isSunk();
    };

    return { hit, isSunk };
}

export default createShip;
