const notes = require("./notes")
const yargs = require("yargs")

yargs.version('1.1.0')
yargs.command({
    command: "add",
    describe: "add note",
    builder: {
        title:{
            describe: "title for note",
            demandOption: true,
            type: "string"
        },
        body:{
            describe: "body for note",
            demandOption: true,
            type: "string"
        },
    },
    handler: (argv) => {
        console.log("Adding a new note with title: "+argv["title"]+" and body: "+argv["body"])
        notes.addNotes(argv["title"], argv["body"])
    }
})
yargs.command({
    command: "remove",
    describe: "remove note",
    builder: {
        title:{
            describe: "title for note",
            demandOption: true,
            type: "string"
        }
    },
    handler: (argv) => {
        console.log("Removing a note")
        notes.removeNotes(argv["title"])
    }
})
yargs.command({
    command: "read",
    describe: "read note",
    builder: {
        title:{
            describe: "title for note",
            demandOption: true,
            type: "string"
        }
    },
    handler: (argv) => {
        console.log("Reading a note")
        notes.readNotes(argv["title"])
    }
})
yargs.command({
    command: "list",
    describe: "list note",
    handler: () => {
        console.log("Listing notes")
        notes.listNotes()
    }
})

yargs.parse()