/*
  REST
  - Representational State Transfer

  1. Convention over Configuration
  2. Stateless

  CRUD
  Create, Read, Update, Delete

  HTTP Verbs == HTTP Methods
  - POST - Create data on the server
  - GET - Reading data from the server
  - PUT - replace or create data on the server at a specific location
  - PATCH(Merge) - Update data (merge it with the existing data)
  - DELETE - Delete data on the server RETURNS 204 - NoContent

  How we talk to the server
  - URL (Uniform Resource Locator)
    path, query string
  - Headers Metadata -
    Content-Type: type of the body
    Content-Length: the size of the body in bytes
    Location: used by redirect requests, this is where you should go
    Date: date/time of the request/response
    User-Agent: the web browser that you are using
    Accept: Ask the server to return a certain type
    Authorization: the users login token
  - Body/Payload - foten text such as JSON but could be images, videos etc

  How the Server talks to us:
  1. Status Code
    XYY - X is the type. Y is the version of the code.

    100 - 

    200 - OK - "The request worked!"
      201 - Created, usually from a POST
      202 - Accepted, work is not done yet, but I heard you
      204 - No Conent, litterally empy body (content-length is 0) 
      
    300 - Redirect - "The content is somewhere else"
      301 - Moved Permanently - ""
      307 - Temporary Redirect - ""

    400 - BadRequest - "ITs your fault"
      401 - Unauthorized - "You haven't logged in yet"
      403 - Forbidden - "You are logged in, but you dont have that permission"
      404 - Not Found
      429 - Too Many Requests - "You need to slow down"

    500 - Internal Server Error - :"ITs my fault" (the servers fault)
      likely the server threw an exception that was uncaught
      503 - Service Unavailable - "The server is too busy right now"

  
  
    200 - OK
    204 - No Content
    404 - Not Found
    500 - Internal Server Error
    
  2. Body/Payload
  3. Headers Metadata


*/
const serverUrl = "https://simpleserverbethel.azurewebsites.net";

function simpleResponse(responseJson){
  document.getElementById("results").innerHTML = JSON.stringify(responseJson);
}


function runGet() {
  fetch(serverUrl + "/values").then((response) => { 
     return response.json();
  }).then((responseJson) => {
      simpleResponse(responseJson);
  });
}

function runGetOne() {
  fetch(serverUrl + "/values/" + document.getElementById("user-index").value ).then((response) => { 
     return response.json();
  }).then((responseJson) => {
      simpleResponse(responseJson);
  });
}

function runPost() {  
  fetch(serverUrl + "/values", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ 
      value: document.getElementById("user-value").value 
    })

  })
  .then((response) => { 
     return response.json();
  })
  .then((responseJson) => {
      simpleResponse(responseJson);
  });
}

function runPut() {  
  fetch(serverUrl + "/values/" + document.getElementById("user-index").value, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ 
      value: document.getElementById("user-value").value 
    })

  })
  .then((response) => { 
     return response.json();
  })
  .then((responseJson) => {
      simpleResponse(responseJson);
  });
}

function runDelete() {  
  fetch(serverUrl + "/values/" + document.getElementById("user-index").value, {
    method: "DELETE"
  });
}

window.onload = function () {
  document.getElementById("get-button").onclick = runGet;
  document.getElementById("post-button").onclick = runPost;
  document.getElementById("delete-button").onclick = runDelete;
  document.getElementById("put-button").onclick = runPut;
  document.getElementById("get-one-button").onclick = runGetOne;

};
