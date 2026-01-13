import { STRINGS, MIN_CARDS, MAX_CARDS } from "../lang/messages/en/user.js";
import { GameEngine } from "./GameEngine.js"


export class AppController {
    constructor() {
        this.game = null;
        this.init();
    }

    init() {
        // Get window dimentions
        const app = document.getElementById("app");
        app.style.width = `${window.innerWidth}px`;
        app.style.height = `${window.innerHeight}px`;

        // Insert app title
        document.getElementById("app-name").innerHTML = STRINGS.APP_NAME;

        // Insert input prompt
        document.getElementById("input-label").innerHTML = STRINGS.START_PROMPT;
        
        // Set input minimum and maximum values
        const num_input = document.getElementById("number-input");
        num_input.setAttribute("min", MIN_CARDS);
        num_input.setAttribute("max", MAX_CARDS);
        
        // Insert button label
        const start_btn = document.getElementById("start-button");
        start_btn.innerText = STRINGS.START_BUTTON;
        // Insert button function
        start_btn.onclick = this.startGame;
    }

    startGame() {
        const num = Number(document.getElementById("number-input").value);
        // Validate input value
        if (!Number.isInteger(num) || num < MIN_CARDS || num > MAX_CARDS) {
            alert(STRINGS.START_INVALID)
        } else {
            document.getElementById("start-area").style.display = "none";
            document.getElementById("game-area").style.display = "flex";
            document.getElementById("game-area").innerHTML = "";

            this.game = new GameEngine(num);
            this.game.init();
        }
    }
}