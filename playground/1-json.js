const fs = require('fs');

const dataBuffer = fs.readFileSync('1-json.json');
const dataJSON = dataBuffer.toString();
const data = JSON.parse(dataJSON);

data.name = '박지환';
data.planet = 'mars';
data.age = '24';

console.log(data);

const JSONdata = JSON.stringify(data);
fs.writeFileSync('1-json.json', JSONdata);