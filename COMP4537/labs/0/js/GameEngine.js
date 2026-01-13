import { Card } from "./Card.js"


export class GameEngine {
    constructor(card_num) {
        this.card_num = card_num
        this.cards = []
    }

    init() {
        for (let i = 1; i <= this.card_num; i++) {
            this.cards.push(new Card(i))
        }
        this.displayCards();
    }

    displayCards() {
        const game_area = document.getElementById("game-area");
        this.cards.forEach(card_data => {
            const card = document.createElement("div");
            card.setAttribute("class", "card");
            card.style.backgroundColor = card_data.color;
            card.innerText = card_data.order;

            game_area.appendChild(card);
        });
    }
}
