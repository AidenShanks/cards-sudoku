import HeartsGame from './HeartsGame.js'; 

const gameOutput = document.getElementById('game-output');
const gameInput = document.getElementById('game-input');
let game;

function appendToOutput(message) {
    let gameOutput = document.getElementById('game-output');
    gameOutput.textContent += '\n' + message;
    gameOutput.scrollTop = gameOutput.scrollHeight; 
}

function handleCommand(command) {
    if (command === 'start') {
        game = new HeartsGame();
        game.startGame();
        appendToOutput(`Player ${game.currentPlayerIndex} with the 2 of Clubs starts the game.`);
        
        displayPlayerHand();
    } else {
        let player = game.players[game.currentPlayerIndex];
        if (player.isHuman) {
            let card = game.humanPlayCard(player, command);
            if (card) {
                game.trick.push(card);
                appendToOutput(`You played ${card.toString()}`);
                // Proceed to the next player or handle the end of the round
            } else {
                appendToOutput("Invalid card. Please try again.");
            }
        }
    }
}

function displayPlayerHand() {
    const hand = game.players[0].hand.map(card => `${card.value}(${card.suit[0]})`).join(', ');
    appendToOutput(`Your Hand: ${hand}`);
}

gameInput.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        handleCommand(gameInput.value);
        gameInput.value = '';
    }
});

appendToOutput('Welcome, this is the game Hearts. Type "start" to begin.');
