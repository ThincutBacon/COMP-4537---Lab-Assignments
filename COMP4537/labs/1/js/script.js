import { STRINGS } from "../lang/messages/en/user.js";

// Insert app title
document.getElementById("app-title").innerHTML = STRINGS.APP_NAME;

// Insert button names
const writer_nav = document.getElementById("nav-writer").innerHTML = STRINGS.WRITER_PAGE_BUTTON;
const reader_nav = document.getElementById("nav-reader").innerHTML = STRINGS.READER_PAGE_BUTTON;

