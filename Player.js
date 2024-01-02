class Player {
    constructor(id, isHuman = false) {
        this.id = id;
        this.hand = [];
        this.points = 0;
        this.isHuman = isHuman;
    }

    receiveCard(card) {
        this.hand.push(card);
    }

    playSpecificCard(cardValue, cardSuit) {
        let cardIndex = this.hand.findIndex(card => 
            card.value === cardValue && card.suit[0].toUpperCase() === cardSuit.toUpperCase()
        );

        if (cardIndex !== -1) {
            return this.hand.splice(cardIndex, 1)[0];
        } else {
            return null; 
        }
    }

    sortHand() {
        const suitOrder = { 'Clubs': 1, 'Spades': 2, 'Diamonds': 3, 'Hearts': 4 };
        const valueOrder = { '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10, 'J': 11, 'Q': 12, 'K': 13, 'A': 14 };

        this.hand.sort((a, b) => {
            if (suitOrder[a.suit] === suitOrder[b.suit]) {
                // If suits are the same, sort by value
                return valueOrder[a.value] - valueOrder[b.value];
            } else {
                // Otherwise, sort by suit
                return suitOrder[a.suit] - suitOrder[b.suit];
            }
        });
    }

    calculatePoints() {
        // Implement the logic to calculate points
    }
}

export default Player;
