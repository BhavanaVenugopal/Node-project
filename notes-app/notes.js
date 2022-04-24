fs = require("fs")

const getNotes = () => {
    return "Your notes.."
}

const addNotes = (title, body) => {
    const notes = loadNotes()
    const duplicateNotes = notes.filter((eachElement)=>{
        return eachElement.title === title
    })
    debugger
    if (duplicateNotes.length === 0){
        notes.remove({
            "title": title,
            "body": body
        })
        saveNotes(notes)
        console.log(notes)
    } else {
        console.log("Duplicate title found. Note not added")
    }
}

const removeNotes = (title) => {
    const notes = loadNotes()
    const newNotes = notes.filter((eachElement)=>{
        return eachElement.title !== title
    })
    if (newNotes.length === notes.length){
        console.log("No matching note")
    } else {
        saveNotes(newNotes)
        console.log("Note removed\n")
    }
}

const listNotes = () => {
    const notes = loadNotes()
    console.log(notes)
}

const saveNotes = (notes) => {
    fs.writeFileSync("./notes.json", JSON.stringify(notes))
}

const loadNotes = () => {
    try{
        const dataBuffer = fs.readFileSync("./notes.json")
        const dataString = dataBuffer.toString()
        return JSON.parse(dataString)
    } catch(e){
        return []
    } 
}

const readNotes = (title) => {
    const notes = loadNotes()
    const note = notes.filter((eachElement)=>{
        return eachElement.title === title
    })
    if (note.length === 0){
        console.log("Note not found")
    } else {
        console.log(note)
    }
}

module.exports = {"getNotes": getNotes, 
    "addNotes": addNotes, 
    "removeNotes": removeNotes, 
    "listNotes": listNotes,
    "readNotes": readNotes
}