const app = require('./server/main.js');
const path = require('path');
const apiRoutes = require('./routes/api')
const readData = require('./routes/readFile')
 
let api = async () => {
  const a = await apiRoutes.caller();
  return a;
}

const api2 = async () => {
  const file = path.join(__dirname, 'data/data.json');
  return await readData(file);
}

const routes = {
  "/api": api,
  "/api2": api2
}

app.setAllowedPaths(routes);

app.init();