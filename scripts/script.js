let solutionTiles = document.getElementsByClassName("stile");
let gameTiles = document.getElementsByClassName("gtile");
let solutionColorList = [];     //Will be used to store the state of solution tiles colors
let gameColorList = [];    //Will be used to store the state of game tiles colors
let gameMatrix = []; //Will hold gameColorList in 2D view for implementing game logic
let solutionMatrix = []; //Will hold solutionColorList in 2D view for implementing game logic
let moves = 0;
let winScreen = document.querySelector(".winscreen");
let movesDiv = document.querySelector(".moves");
let retryBtn = document.getElementById("retry");

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }
  
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function generateID()
{
    let i = 0;
    Array.from(gameTiles).forEach(tile => {
     tile.id=i;
     i++;
    })
}

function generateColours()
{
    let colorList = ["#FFA8A8", "#FDD7AA", "#F6FFA4", "#B6FFCE", "#D18CE0", "#B8FFF9", "#219F94", "#92B4EC", "#A19882"];
    colorList = shuffleArray(colorList);
    console.log(colorList);
    let i = 0;
    Array.from(solutionTiles).forEach(tile => {
        tile.style.background = colorList[i];
        solutionColorList.push(colorList[i]);
        gameColorList.push(colorList[i]);
        i=i+1;
    });

    while(i<24)
    {
        gameColorList.push(colorList[i%7]);
        i=i+1;
    }

    i = 0;
    gameColorList = shuffleArray(gameColorList);
    Array.from(gameTiles).forEach(tile => {
        tile.style.background = gameColorList[i];
        i=i+1;
    })
}

function generateGameMatrix()
{
    for(let i=0; i<24;)
    {
        let utilArray = [];
        for(let k=0; k<5; k++)
        {
            utilArray.push(gameColorList[i]);
            i++;
            if(i==24)
            {
                utilArray.push("#FFFFFF");
                break;
            }
        }
        gameMatrix.push(utilArray);
    }
    console.log(gameMatrix);
}

function generateSolutionMatrix()
{
    for(let i=0; i<9;)
    {
        let utilArray = [];
        for(let k=0; k<3; k++)
        {
            utilArray.push(solutionColorList[i]);
            i++;
        }
        solutionMatrix.push(utilArray);
    }
    console.log(solutionMatrix);
}

function updateGameGrid()
{
    let k = 0;
    for(let i=0; i<5; i++)
    {
        for(let j=0; j<5; j++)
        {
            gameColorList[k] = gameMatrix[i][j];
            k=k+1;
        }
    }
    i = 0;
    Array.from(gameTiles).forEach(tile => {
        tile.style.background = gameColorList[i];
        i=i+1;
    })
}



function updateGameGrid()
{
    let k = 0;
    for(let i=0; i<5; i++)
    {
        for(let j=0; j<5; j++)
        {
            gameColorList[k] = gameMatrix[i][j];
            k=k+1;
        }
    }
    i = 0;
    Array.from(gameTiles).forEach(tile => {
        tile.style.background = gameColorList[i];
        i=i+1;
    })
}

function checkWin()
{
    let winFlag = 1;
    for(let i=1; i<4; i++)
    {
        for(let j=1; j<4; j++)
        {
            if(gameMatrix[i][j]!=solutionMatrix[i-1][j-1] && winFlag == 1)
            {
                winFlag=0;
            }
        }
    }
    
    if(winFlag==1)
    {
        return 1;
    }
    else
    {
        return 0;
    }
    
}

generateID();
generateColours();
generateGameMatrix();
generateSolutionMatrix();

Array.from(gameTiles).forEach(tile => {
      
    tile.addEventListener('click', (clickedTile) => {
        
        console.log(clickedTile.path[0].id);
        let clickedID = clickedTile.path[0].id;
        let clickedRow = Math.floor(clickedID / 5);
        let clickedCol = clickedID % 5;
        
        let checkerArray = [0, 1, 0, -1, 0];

        for(let i=0; i<4; i++)
        {
            if(clickedRow+checkerArray[i] == 5 || clickedCol+checkerArray[i+1] == 5 || clickedRow+checkerArray[i]<0 || clickedCol+checkerArray[i+1]<0) continue;

            if(gameMatrix[clickedRow+checkerArray[i]][clickedCol+checkerArray[i+1]] == "#FFFFFF")
            {
                gameMatrix[clickedRow+checkerArray[i]][clickedCol+checkerArray[i+1]] = gameMatrix[clickedRow][clickedCol];
                gameMatrix[clickedRow][clickedCol] = "#FFFFFF";
                moves++;
                updateGameGrid();
                if(checkWin()==1)
                {
                    winScreen.style.display = "block";
                    movesDiv.innerHTML = "You took " + moves + " moves!";
                    retryBtn.addEventListener('click', ()=>{
                        document.location.reload();
                    })
                }
                break;
            }
        }
        console.log(clickedRow, clickedCol);
      })
})
