const fs = require('fs');
 
const readFile2 = async (filename) => {
  const file = await fs.promises.readFile(filename, 'utf-8')
  .catch((err)=> {
    console.log(err);
    return "File Not Found"
  })
  return JSON.parse(file);
}

module.exports = readFile2;

 