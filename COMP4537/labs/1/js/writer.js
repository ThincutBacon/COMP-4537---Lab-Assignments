import { STRINGS } from "../lang/messages/en/user.js";
import { NoteCard } from "./NoteCard.js";

let data = {
    last_id: 0,
    notes: []
};

let current_notes = [];

function getNotes() {
    let local_data = JSON.parse(localStorage.getItem("data"));

    if (local_data === null) {
        localStorage.setItem("data", JSON.stringify(data));
    } else {
        data = local_data;

        data.notes.forEach(note => {
            current_notes.push(new NoteCard(note.id, deleteCard, note.text));
        });
    }
}

function saveNotes() {
    localStorage.setItem("data", JSON.stringify(data));
    
    document.getElementById("time-text").innerHTML = STRINGS.STORE_TIME_MESSAGE + new Date().toLocaleTimeString();

    console.log(data);
}

function saveNoteContents() {
    let new_notes = [];

    current_notes.forEach(note => {
        note.updateText();
        new_notes.push({id: note.id, text: note.text});
    });

    data.notes = new_notes;
}

function displayCards() {
    const all_notes = document.getElementById("all-notes");
    all_notes.innerHTML = "";

    current_notes.forEach(note => {
        all_notes.appendChild(note.card);
    });
}

function deleteCard(id) {
    console.log("DELETE");

    current_notes = current_notes.filter((a_note) => {
        return a_note.id !== id;
    })

    document.getElementById(`${id}`).remove();
}

function setUp() {
    getNotes();
    document.getElementById("time-text").innerHTML = STRINGS.STORE_TIME_MESSAGE + new Date().toLocaleTimeString();

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
        current_notes.push(new NoteCard(card_id, deleteCard));
        data.notes.push({id: card_id, text: ""});
        displayCards();
    };
}

setUp();



