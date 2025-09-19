window.onload = init;

const serverUrl = "https://bethelwebrequestsserver.azurewebsites.net/api/favoritecharacters/";


function init() {
    document.getElementById("pull-button").onclick = runPull;
    document.getElementById("push-button").onclick = runPush;
    document.getElementById("read-button").onclick = runRead;

}



function simpleResponse(responseJson){
  document.getElementById("results").innerHTML = JSON.stringify(responseJson);
}

function runRead() {
    fetch(serverUrl).then((response) => { 
     return response.json();
    }).then((responseJson) => {
        console.log(Object.keys(responseJson).length)
    });

}




function runPull() {
  fetch(serverUrl).then((response) => { 
     return response.json();
  }).then((responseJson) => {
      simpleResponse(responseJson);
  });
}

function runPush() {
    let character = document.getElementById("character").value;   
    let firstName = document.getElementById("firstName").value;
    let lastName = document.getElementById("lastName").value;
    fetch(serverUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ 
        FirstName: firstName,
        LastName: lastName,
        FavoriteCharacter: character
    })

  })
  .then((response) => { 
     return response.json();
  })
  .then((responseJson) => {
      simpleResponse(responseJson);
  });

}