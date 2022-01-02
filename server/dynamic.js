const dynamic = {};
module.exports = dynamic;

dynamic.get = (urlcon, request, response) => {
  const {search, pathname} = urlcon;
  const {method} = request;
 
  let buffer = [];
  // add various event listeners
  request.on('error', error => {
    response.writeHead(500);
    response.end('Error occurred:', error);
  });
  // as each chunk arises, push it to the buffer array
  request.on('data', chunk => {
    buffer.push(chunk);
  });
  // on end, 1. concatenate the buffer
  request.on('end', async () => {
    buffer = Buffer.concat(buffer);
    // 2. response data object to pass to the handler function
    const responseData = {
      method,
      pathname,
      search,
      buffer,
    };
    // 3. Get handler for the path
    
    const handler = dynamic.routes[pathname]
   
    // const handler = allowedPaths[pathname];
    // 4. Call handler + return the result
    let status = 200;
    const data = await handler(responseData)
      .catch((err)=> {
        console.log(err);
        status = 500;
        return `Api Error:${err.code}`;
      })
 
      response.writeHead(status) // status code
      response.end(JSON.stringify(data)); // data
  })    
}

 