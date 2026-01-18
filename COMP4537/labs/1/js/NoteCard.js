import { STRINGS } from "../lang/messages/en/user.js";

export class NoteCard {
    constructor(id, deleteCard, text="") {
        this.id = id;
        this.text = text;

        this.card = document.createElement("div");
        this.card.classList.add("note-card");
        this.card.id = this.id;

        this.text_area = document.createElement("textarea");
        this.text_area.id = `text-${this.id}`;
        this.text_area.value = this.text;

        this.delete_btn = document.createElement("button");
        this.delete_btn.innerHTML = STRINGS.DELETE_BUTTON;
        this.delete_btn.classList.add("delete-button");
        this.delete_btn.onclick = () => deleteCard(this.id);

        this.card.appendChild(this.text_area);
        this.card.appendChild(this.delete_btn);
    }

    updateText() {
        this.text = this.text_area.value
    }
}