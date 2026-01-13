export class Card {
    constructor(order) {
        this.order = order;
        this.color = this.randomColor();

        this.init()
    }

    init() {
        console.log(`Card No. ${this.order}; Color = ${this.color}`);
    }

    randomColor() {
        const characters = '0123456789ABCDEF';
        var color = "#";
        for (let i = 0; i < 6; i++) {
            color += characters[Math.floor(Math.random() * 16)]
        }
        return color;
    }
}