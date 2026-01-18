import { STRINGS } from "../lang/messages/en/user.js";
import { NoteCard } from "./NoteCard.js";

let data = {
    last_id: 0,
    notes: []
};

function getNotes() {
    let local_data = JSON.parse(localStorage.getItem("data"));

    if (local_data === null) {
        localStorage.setItem("data", JSON.stringify(data));
    } else {
        data = local_data;
    }
}

function saveNotes() {
    localStorage.setItem("data", JSON.stringify(data));
    
    document.getElementById("time-text").innerHTML = STRINGS.STORE_TIME_MESSAGE + new Date().toLocaleTimeString();
}

function saveNoteContents() {
    data.notes.forEach(note => {
        note.text = document.getElementById(`text-${note.id}`).value;
    });
}

function displayCards() {
    const all_notes = document.getElementById("all-notes");
    all_notes.innerHTML = "";

    data.notes.forEach(note => {
        const note_card = document.createElement("div");

        const text_area = document.createElement("textarea");
        text_area.value = note.text;
        text_area.id = `text-${note.id}`;
        note_card.appendChild(text_area);

        const delete_btn = document.createElement("button");
        delete_btn.innerHTML = STRINGS.DELETE_BUTTON;
        delete_btn.classList.add("delete-button");
        delete_btn.addEventListener("click", function () {
            console.log("DELETE");

            data.notes = data.notes.filter((a_note) => {
                return a_note.id !== note.id;
            })

            document.getElementById(`${note.id}`).remove();
        })
        note_card.appendChild(delete_btn);

        note_card.classList.add("note-card");
        note_card.id = note.id;

        all_notes.appendChild(note_card);
    });
}

function setUp() {
    getNotes();
    saveNotes();

    displayCards();

    setInterval(function () {
        saveNoteContents();
        saveNotes();
    }, 2000);

    // Insert button names
    const add_button = document.getElementById("add-button");
    add_button.innerHTML = STRINGS.ADD_BUTTON;
    document.getElementById("back-button").innerHTML = STRINGS.BACK_BUTTON;

    // Insert Add Button function
    add_button.onclick = function() {  
        let card_id = data.last_id++;
        data.notes.push(new NoteCard(card_id));
        displayCards();
    };
}

setUp();



