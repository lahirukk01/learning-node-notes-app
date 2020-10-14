const fs = require('fs')

const loadNotes = () => {
    try {
        return JSON.parse(fs.readFileSync('notes.json').toString())
    } catch (e) {
        return []
    }
}

const saveNotes = (notes) => {
    fs.writeFileSync('notes.json', JSON.stringify(notes, null, 4))
}

const getNotes = () => {

}

const readNote = (title) => {
    const notes = loadNotes()

    const desiredNote = notes.find(note => note.title === title)

    return desiredNote
}

const listNotes = () => {
    const notes = loadNotes()

    console.log('Listing notes')

    notes.forEach(note => {
        console.log('Title: ', note.title)
        console.log('Body: ',  note.body)
    })
}

const addNote = (title, body) => {
    const notes = loadNotes()

    const duplicateNote = notes.find(note => note.title === title)

    if (!duplicateNote) {
        notes.push({
            title,
            body
        })
        saveNotes(notes)
        return true
    } else {
        return false
    }
}

const deleteNote = (title) => {
    const notes = loadNotes()

    const newNotesArray = notes.filter(note => note.title !== title)

    if (newNotesArray.length < notes.length) {
        saveNotes(newNotesArray)
        return true
    } else {
        return false
    }
}

module.exports = {
    getNotes,
    addNote,
    deleteNote,
    listNotes,
    readNote
}