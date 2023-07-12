const btnEl = document.getElementById("button1");
const appEl = document.getElementById("app");


let createNote = (id, content) => {
    const element = document.createElement("textarea");
    element.classList.add("note")
    element.placeholder = "Empty Note";
    element.value = content; 
    element.addEventListener("dblclick", () => {
        const warning = confirm("Do you want to delete this note?")
        if(warning){
            deleteNote(id, element);
        }
    })
    element.addEventListener("input" , () => {
        updateNote(id, element.value);
    })
    return element;
}
function deleteNote(id, element) {
    const notes = getNotes().filter((note) => note.id != id)
    saveNote(notes);
    appEl.removeChild(element);
}

function updateNote(id, content){
    const notes = getNotes();
    const target = notes.filter((note) => {
        return note.id == id
    })[0];
    target.content = content;
    saveNote(notes);
}

let addNote = () =>{
    const notes = getNotes();
    const noteObj = {
        id: Math.floor(Math.random() * 100000),
        content:""
    }
    const noteEl = createNote(noteObj.id, noteObj.content);
    appEl.insertBefore(noteEl, btnEl);
    notes.push(noteObj);
    saveNote(notes);
}
getNotes().forEach((note) => {
    const noteEl = createNote(note.id,note.content);
    appEl.insertBefore(noteEl, btnEl);
})

function saveNote(note){
    localStorage.setItem("note-app", JSON.stringify(note))
}
function getNotes(){
    return JSON.parse(localStorage.getItem("note-app") || "[]")
}
btnEl.addEventListener("click", addNote)