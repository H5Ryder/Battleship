// interface.js



function insertBoardGrid(className, gameFunction=null, forPlayer=true) {
    const playerLeft = document.querySelector(`.${className}`);

    for (let y = 0; y < 10; y++) {
        for (let x = 0; x < 10; x++) {
            const div = document.createElement('div');
            div.setAttribute('data-x', x);
            div.setAttribute('data-y', 9-y);
            div.setAttribute('data-boat', false);
            div.setAttribute('data-hit', false);


            //If the boardGrid is the human player it doesnt need event listeners!
            if (forPlayer){

            div.addEventListener('click', function () {
                // Call the gameFunction with the current x and y coordinates
                gameFunction(x, 9 - y, div);
            });
            }


            playerLeft.appendChild(div);
            div.classList.add('square');

        }
    }
}


function addBoatsToGrid(board, className, show){
const player = document.querySelector(`.${className}`);

    for (let y = 0; y < 10; y++) {
        for (let x = 0; x < 10; x++) {
            if (board[y][x] == true){
                const targetSquare = document.querySelector(`.${className} [data-x="${x}"][data-y="${y}"]`);
                targetSquare.setAttribute('data-boat', true);

                if (show){
                targetSquare.classList.add("reveal");
                }


            }
        }
    }
    
}



function removeHtmlContentByClass(parentClassName) {
    const parentElement = document.querySelector(`.${parentClassName}`);

    if (parentElement) {
        parentElement.innerHTML = '';
    } else {
        console.error('Parent element not found.');
    }
}

//Changes DOM to reflect the attack from Human
function changeDataHitToTrue(element) {
    element.setAttribute('data-hit', true);
    element.classList.add("disabledbutton");
}

// Changes DOM to reflect attack from Bot
function setDataHit(className, location) {
    const targetSquare = document.querySelector(`.${className} [data-x="${location.x}"][data-y="${location.y}"]`);
    
    if (targetSquare) {
        targetSquare.setAttribute('data-hit', true);
        targetSquare.classList.add("disabledbutton");
    } else {
        console.error('Target square not found.');
    }
}


function write(className, text){
    const txt = document.querySelector(`.${className}`);
    txt.innerHTML = `${text}`;
}

function changePlayInnerHtml(element) {
  if (element.innerHTML == "Play") {
    element.innerHTML = "restart";
  } else {
    element.innerHTML = "Play";
  }
}

function revealBoats(className) {
    // Get all children of the specified element
    const element = document.querySelector(`.${className}`);
    const children = element.children;
  
    // Iterate through the children
    for (let i = 0; i < children.length; i++) {
      const child = children[i];
  
      // Check if the child has the data-boat attribute set to true
      if (child.dataset.boat === 'true') {
        // Add the child element to the .reveal class
        child.classList.add('reveal');
      }
    }
  }

  

  function removeEventListenersFromPlayerRight() {
    // Get the parent div with class "player-right"
    const playerRightDiv = document.querySelector('.player-right');
  
    // Check if the "player-right" div exists
    if (playerRightDiv) {
      // Get all the children divs inside "player-right"
      const childrenDivs = playerRightDiv.querySelectorAll('div');
  
      // Iterate through each child div and remove its event listeners
      childrenDivs.forEach((childDiv) => {
        // Clone the element to remove listeners without affecting the original
        const clonedDiv = childDiv.cloneNode(true);
        childDiv.parentNode.replaceChild(clonedDiv, childDiv);
      });
    }
  }



export { insertBoardGrid, addBoatsToGrid, removeHtmlContentByClass,changeDataHitToTrue,setDataHit,write,changePlayInnerHtml,revealBoats,removeEventListenersFromPlayerRight};



