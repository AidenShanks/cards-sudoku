var errors = 0;
var numberUsage = {};

var board = [
    "--74916-5",
    "2---6-3-9",
    "-----7-1-",
    "-586----4",
    "--3----9-",
    "--62--187",
    "9-4-7---2",
    "67-83----",
    "81--45---"
];

var solution = [
    "387491625",
    "241568379",
    "569327418",
    "758619234",
    "123784596",
    "496253187",
    "934176852",
    "675832941",
    "812945763"
];

window.onload = function() {
    setGame();
    addDragDropListeners();
}

function setGame() {
    // Initialize number usage based on starting board
    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            let num = board[r][c];
            if (num !== '-') {
                numberUsage[num] = (numberUsage[num] || 0) + 1;
            }
        }
    }

    // Create number cards
    for (let i = 1; i <= 9; i++) {
        let number = document.createElement("img");
        number.id = "num" + i;
        number.src = `Hearts/${i}.png`;
        number.alt = i.toString();
        number.classList.add("number");
        number.draggable = true;
        document.getElementById("digits").appendChild(number);

        // Initial check if the card should be visible
        if (isNumberFullyUsed(i.toString())) {
            document.getElementById("num" + i).style.visibility = "hidden";
        }
    }

    // Create board tiles
    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            tile.classList.add("tile");

            if (board[r][c] != "-") {
                tile.innerText = board[r][c];
                tile.classList.add("tile-start");
            }

            if (r == 2 || r == 5) {
                tile.classList.add("horizontal-line");
            }
            if (c == 2 || c == 5) {
                tile.classList.add("vertical-line");
            }

            document.getElementById("board").append(tile);
        }
    }
}

function addDragDropListeners() {
    let numbers = document.querySelectorAll('.number');
    let tiles = document.querySelectorAll('.tile');

    numbers.forEach(num => {
        num.addEventListener('dragstart', dragStart);
    });

    tiles.forEach(tile => {
        tile.addEventListener('dragover', dragOver);
        tile.addEventListener('drop', drop);
    });
}

function dragStart(e) {
    e.dataTransfer.setData('text/plain', e.target.id);
}

function dragOver(e) {
    e.preventDefault();
}

function drop(e) {
    e.preventDefault();
    const id = e.dataTransfer.getData('text/plain');
    const number = document.getElementById(id);

    if (!e.target.hasChildNodes() && e.target.innerText === "" && isValidDrop(e.target, number.alt)) {
        let img = number.cloneNode(true);
        img.id = "";
        e.target.appendChild(img);

        console.log("Placed number: " + number.alt);
        updateNumberUsage(number.alt);
    } else {
        errors += 1;
        document.getElementById("errors").innerText = errors;
    }
}

function isValidDrop(tile, number) {
    let coords = tile.id.split("-");
    let r = parseInt(coords[0]);
    let c = parseInt(coords[1]);
    return solution[r][c] === number;
}

function updateNumberUsage(num) {
    numberUsage[num]++;
    console.log("Number Usage " + numberUsage[num]);
    if (isNumberFullyUsed(num)) {
        console.log("Number " + num + " is fully used and will be turned invisible."); // Log when number is fully used
        document.getElementById("num" + num).style.visibility = "hidden"; // Hide the card
    }
}


function isNumberFullyUsed(num) {
    let requiredCount = 0;
    for (let i = 0; i < solution.length; i++) {
        for (let j = 0; j < solution[i].length; j++) {
            if (solution[i][j] === num) {
                requiredCount++;
            }
        }
    }
    console.log("Required count for " + num + " is " + requiredCount);
    return numberUsage[num] >= requiredCount;
}
