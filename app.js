const chalk = require('chalk')
const yargs = require('yargs')
const notes = require('./notes')


yargs.command({
    command: 'add',
    describe: 'Add notes',
    builder: {
        title: {
            description: 'Note title',
            demandOption: true,
            type: 'string'
        },
        body: {
            description: 'Note body',
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv) => {
        if (notes.addNote(argv.title, argv.body)) {
            console.log(chalk.green('New note added'))
        } else {
            console.log(chalk.red('Duplicate note'))
        }
    }
})

yargs.command({
    command: 'delete',
    describe: 'Delete note',
    builder: {
        title: {
            description: 'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv) => {
        if (notes.deleteNote(argv.title)) {
            console.log(chalk.green('Note deleted successfully'))
        } else {
            console.log(chalk.red('Note not found'))
        }
    }
})

yargs.command({
    command: 'list',
    describe: 'List notes',
    handler: () => {
        notes.listNotes()
    }
})

yargs.command({
    command: 'read',
    describe: 'Read note',
    builder: {
        title: {
            description: 'Note title',
            demandOption: true,
            type: 'string'
        },
    },
    handler: (argv) => {
        const note = notes.readNote(argv.title)

        if (note) {
            console.log('Title: ', note.title)
            console.log('Body: ',  note.body)
        } else {
            console.log(chalk.red('Note not found'))
        }
    }
})

yargs.parse()
