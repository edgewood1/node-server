const static = {};
const fs = require('fs');
const path = require('path');

module.exports = static;

// Allowed Mime types for static content
const mimeTypes = {
  '.html': 'text/html',
  '.jgp': 'image/jpeg',
  '.jpg': 'image/jpeg',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.png': 'image/png',
  '.ico': 'image/x-icon',
  '.json': 'application/json',
};

const apps = {
  'max': '../angular/max-app/dist',
  'test': '../static'
}

static.getContentType = pathname => {
  const extname = path.extname(pathname);
  // Set the contentType based on the mime type
  if (!extname) return 'text/html';
  
  let contentType = Object.keys(mimeTypes)
    .map(key => (extname === key ? mimeTypes[key] : null))
    .filter(key => typeof key === 'string')[0]
  // contentType = contentType === null ? 'application/octet-stream' : contentType;
 
  return contentType;
};

static.get = async (pathname, response) => {  
  const newPath = path.extname(pathname) ? pathname : '/';
 
  const contentType = static.getContentType(newPath);
  response.setHeader('Content-Type', contentType);

  const baseDir = path.join(__dirname, '../');
  const testDir = 'max';
  // const testDir = 'test'; // experimental ui

  const fileDir = (newPath === '/') ?
    path.join(apps[testDir], '/index.html') : path.join(apps[testDir], newPath);

  const filename = `${baseDir}${fileDir}`;
 
  let status = 200;
  // read filename or return error object
  const file = await fs.promises.readFile(filename)
    .catch((err)=> {
      console.log(err.code);
      status = 404;
      return "File Not Found"
    })
  response.writeHead(status);
  response.end(file);
};
 