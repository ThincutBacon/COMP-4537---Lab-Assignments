import { STRINGS } from "../lang/messages/en/user.js";

let data = [];

function getNotes() {
    let local_data = JSON.parse(localStorage.getItem("data"));

    if (local_data !== null) {
        data = local_data.notes;
    }
}

function updateNotes() {
    getNotes();

    const all_notes = document.getElementById("all-notes");
    all_notes.innerHTML = "";

    data.forEach(note => {
        const note_card = document.createElement("div");

        const text_area = document.createElement("textarea");
        text_area.value = note.text;
        text_area.disabled = true;
        note_card.appendChild(text_area);

        note_card.classList.add("note-card");
        note_card.id = note.id;

        all_notes.appendChild(note_card);
    });
    
    document.getElementById("time-text").innerHTML = STRINGS.UPDATE_TIME_MESSAGE + new Date().toLocaleTimeString();
}

function setUp() {
    // Insert button names
    document.getElementById("back-button").innerHTML = STRINGS.BACK_BUTTON;

    updateNotes();

    setInterval(updateNotes, 2000);
}

setUp();