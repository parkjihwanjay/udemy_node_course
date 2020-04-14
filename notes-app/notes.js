const fs = require('fs');
const chalk = require('chalk');

const getNotes = () => 'Your notes...'

const loadNotes = () => {
  try{
    const dataBuffer = fs.readFileSync('notes.json');
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  }
  catch(e){
    return [];
  }
}

const saveNotes = notes => {
  const data = JSON.stringify(notes);
  fs.writeFileSync('notes.json', data);
}

const addNotes = (title, body) => {
  const notes = loadNotes();
  const duplicatedNote = notes.find(note => note.title === title)

  if(!duplicatedNote)
  {
    notes.push({
      title : title,
      body : body
    })
    saveNotes(notes);
    console.log(chalk.green('note added!'));
  } 
  else{
    console.log(chalk.red('notes already taken!'));
  }
}

const removeNotes = title => {
  const notes = loadNotes();
  // let removedNotes = []
  const removedNotes = notes.filter(note => note.title !== title)

  if(removedNotes.length < notes.length)
  {
    // console.log(removeNotes);
    console.log(chalk.green.inverse('note removed!'));
    saveNotes(removedNotes);``
  }
  else{
    // console.log(removeNotes);
    console.log(chalk.red.inverse('no note found'));
  }
}

const listNotes = () => {
  
  const data = loadNotes();
  console.log(chalk.green.inverse('Your notes!'));
  data.forEach(element => {
    console.log(element.title);
  });
}

const readNotes = title => {
  const notes = loadNotes();
  const target = notes.find(note => note.title === title);
  
  if(target){
    console.log(chalk.green(target.title));
    console.log(target.body);
  }
  else{
    console.log(chalk.red('no note found!'));
  }
}

module.exports = {
  getNotes,
  removeNotes,
  listNotes,
  addNotes,
  readNotes,
}