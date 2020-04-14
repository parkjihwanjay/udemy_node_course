const chalk = require('chalk');
const yargs = require('yargs');
const notesUtil = require('./notes.js');

yargs.command({
  command : 'add',
  describe : 'add a note',
  builder : {
    title : {
      describe : 'add title',
      demandOption : true,
      type : 'string'
    },
    body : {
      describe : 'add body',
      demandOption : true,
      type : 'string'
    }
  },
  handler(argv){
    notesUtil.addNotes(argv.title, argv.body);
  }
})

yargs.command ({
  command : 'remove',
  describe : 'remove a note',
  builder : {
    title : {
      describe : 'remove title',
      demandOption : true,
      type : 'string'
    }
  },
  handler(argv){
    notesUtil.removeNotes(argv.title);
  }
})

yargs.command({
  command : 'list',
  describe : 'list notes',
  handler(){
    notesUtil.listNotes();
  }
})

yargs.command({
    command : 'read',
    describe : 'read a note',
    builder : {
      title : {
        describe : 'title of a note',
        demandOption : true,
        type : 'string'
      }
    },
    handler(argv){
      notesUtil.readNotes(argv.title);
    }
})

console.log(yargs.argv);