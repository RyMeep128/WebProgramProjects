window.onload = init;

const serverUrl =
  "https://bethelwebrequestsserver.azurewebsites.net/api/favoritecharacters/";
let index = -1;

function init() {
  try {
    document.getElementById("pull-button").onclick = () => {
      resetLog();
      resetIndex();
      runPull();
    };

    document.getElementById("push-button").onclick = () => {
      resetLog();
      resetIndex();
      runPush();
    };

    document.getElementById("read-button").onclick = () => {
      resetLog();
      runRead();
    };

    document.getElementById("insight-button").onclick = () => {
      resetLog();
      runInisght();
    };

    document.getElementById("watch-button").onclick = () => {
      resetLog();
      runWatch();
    };

    document.getElementById("delete-button").onclick = () => {
      resetLog();
      runDelete();
    };
  } catch (error) {
    errorLog(error);
  }
}

function simpleResponse(responseJson) {
  document.getElementById("results").innerHTML = JSON.stringify(responseJson);
}

function errorLog(error) {
  document.getElementById("error").innerHTML = error;
}

function resetLog() {
  document.getElementById("error").innerHTML = "";
}

function resetIndex() {
  index = -1;
  document.getElementById("index-label").innerHTML = "";
}

function runDelete() {
  console.log("Delete Index: " + index);
  if (index == -1) {
    fetch(serverUrl)
      .then((response) => {
        if (!response.ok) {
          return response.json().then((err) => {
            throw new Error(JSON.stringify(err));
          });
        }
        return response.json();
      })
      .then((responseJson) => {
        const size = responseJson.favoriteCharacters.length;
        index = Math.floor(Math.random() * size);
        document.getElementById("index-label").innerHTML = "Index: " + index;
        fetch(serverUrl + index, {
          method: "DELETE",
        })
          .then(() => {
            runPull();
          })
          .catch((error) => errorLog(error));
      })
      .catch((error) => errorLog(error));
  } else {
    fetch(serverUrl + index, {
      method: "DELETE",
    })
      .then(() => {
        runPull();
      })
      .catch((error) => errorLog(error));
  }
}

function runWatch() {
  fetch(serverUrl + "/" + index + "/views", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ViewDate: document.getElementById("view-date").value,
    }),
  })
    .then((response) => {
      if (!response.ok) {
        return response.json().then((err) => {
          throw new Error(JSON.stringify(err));
        });
      }
      return response.json();
    })
    .then((responseJson) => {
      document.getElementById("results").innerHTML +=
        "\nInsight:  " + JSON.stringify(responseJson);
    })
    .catch((error) => errorLog(error));
}

function runInisght() {
  fetch(serverUrl + "/" + index + "/views")
    .then((response) => {
      if (!response.ok) {
        return response.json().then((err) => {
          throw new Error(JSON.stringify(err));
        });
      }
      return response.json();
    })
    .then((data) => {
      document.getElementById("results").innerHTML +=
        "\nInsight:  " + JSON.stringify(data);
    })
    .catch((error) => errorLog(error));
}

function runRead() {
  fetch(serverUrl)
    .then((response) => {
      return response.json();
    })
    .then((responseJson) => {
      const size = responseJson.favoriteCharacters.length;
      index = Math.floor(Math.random() * size);
      document.getElementById("index-label").innerHTML = "Index: " + index;
      fetch(serverUrl + "/" + index)
        .then((response) => {
          if (!response.ok) {
            return response.json().then((err) => {
              throw new Error(JSON.stringify(err));
            });
          }
          return response.json();
        })
        .then((responseJson) => {
          simpleResponse(responseJson);
        })
        .catch((error) => errorLog(error));
    })
    .catch((error) => errorLog(error));
}

function runPull() {
  fetch(serverUrl)
    .then((response) => {
      if (!response.ok) {
        return response.json().then((err) => {
          throw new Error(JSON.stringify(err));
        });
      }
      return response.json();
    })
    .then((responseJson) => {
      simpleResponse(responseJson);
    })
    .catch((error) => errorLog(error));
}

function runPush() {
  let character = document.getElementById("character").value;
  let firstName = document.getElementById("firstName").value;
  let lastName = document.getElementById("lastName").value;
  fetch(serverUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      FirstName: firstName,
      LastName: lastName,
      FavoriteCharacter: character,
    }),
  })
    .then((response) => {
      if (!response.ok) {
        return response.json().then((err) => {
          throw new Error(JSON.stringify(err));
        });
      }
      return response.json();
    })
    .then((responseJson) => {
      simpleResponse(responseJson);
    })
    .catch((error) => errorLog(error));
}
