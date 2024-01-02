import Deck from './Deck.js';
import Player from './Player.js';

class HeartsGame {
    constructor(numPlayers = 4) {
        this.players = [];
        this.deck = new Deck();
        this.currentPlayerIndex = 0;
        this.trick = [];
        this.heartsBroken = false;

        // Create one human player and the rest as computer players
        for (let i = 0; i < numPlayers; i++) {
            const isHuman = (i === 0); 
            this.players.push(new Player(i, isHuman));
        }
    }

    startGame() {
        this.deck.shuffle();
        this.dealCards();
        this.currentPlayerIndex = this.findPlayerWithTwoOfClubs();

        console.log("Player with 2 of Clubs:", this.currentPlayerIndex);
        this.playRound();
    }

    findPlayerWithTwoOfClubs() {
        for (let i = 0; i < this.players.length; i++) {
            if (this.players[i].hand.some(card => card.suit === 'Clubs' && card.value === '2')) {
                return i;
            }
        }
        return -1; // In case the 2 of Clubs is not found
    }

    dealCards() {
        for (let i = 0; this.deck.cards.length > 0; i++) {
            this.players[i % this.players.length].receiveCard(this.deck.dealCard());
        }

        this.players.forEach(player => player.sortHand());
    }

    playRound() {
        for (let player of this.players) {
            let card;
            if (player.isHuman) {
                card = this.humanPlayCard(player); 
            } else {
                card = this.computerPlayCard(player);
            }
            this.trick.push(card);
            console.log(`Player ${player.id} plays`, card.toString());
        }

        let winnerIndex = this.determineRoundWinner();
        this.announceRoundWinner(winnerIndex);

        // Prepare for the next round
        this.currentPlayerIndex = winnerIndex; // The winner starts the next round
        this.trick = []; // Reset the trick for the next round
    }

    announceRoundWinner(winnerIndex) {
        appendToOutput(`Player ${winnerIndex} wins the round.`);
    }

    humanPlayCard(player, input) {
        let cardValue = input.slice(0, -1);
        let cardSuit = input.slice(-1);

        let card = player.playSpecificCard(cardValue, cardSuit);
        if (card) {
            return card;
        } else {
        }
    }

    computerPlayCard(player) {
        return player.playCard(0);
    }

    determineRoundWinner() {
        let winningIndex = this.currentPlayerIndex;
        let winningCard = this.trick[0];
        let isHeartPlayed = winningCard.suit === 'Hearts';

        for (let i = 1; i < this.trick.length; i++) {
            let card = this.trick[i];
            if (card.suit === winningCard.suit && card.value > winningCard.value && card.value !== 'Q' && card.suit !== 'Spades') {
                winningIndex = (this.currentPlayerIndex + i) % this.players.length;
                winningCard = card;
            } else if (!isHeartPlayed && card.suit === 'Hearts') {
                isHeartPlayed = true;
                winningIndex = (this.currentPlayerIndex + i) % this.players.length;
                winningCard = card;
            } else if (isHeartPlayed && card.suit === 'Hearts' && card.value > winningCard.value) {
                winningIndex = (this.currentPlayerIndex + i) % this.players.length;
                winningCard = card;
            }
        }

        this.currentPlayerIndex = winningIndex;
        return winningIndex;
    }

    calculateScores() {
        // Implement the scoring logic 
    }

    nextPlayer() {
        this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.players.length;
    }
}

export default HeartsGame;
