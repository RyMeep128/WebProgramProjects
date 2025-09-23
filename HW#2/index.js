/**
 * @file index.js
 * @title Homework 2 — Web requests
 * @description Wires UI controls to a Star Wars-themed API and renders results/errors.
 *              Includes helpers for logging, index management, and CRUD-like actions.
 * @author Ryan Shafer
 * @see index.css for layout and styling
 * @see index.html for structure and element IDs/classes
 */

/**
 * Initialize the page once the window has loaded.
 * Bound at the bottom via: window.onload = init;
 * @function init
 * @returns {void}
 */
window.onload = init;

/**
 * Base API endpoint for favorite characters.
 * @constant {string}
 */
const serverUrl =
  "https://bethelwebrequestsserver.azurewebsites.net/api/favoritecharacters/";

/**
 * Current record index used by read/delete/watch/insight flows.
 * -1 indicates "no index selected".
 * @type {number}
 */
let index = -1;

/**
 * Attaches click handlers to UI buttons and guards with a try/catch to log errors.
 * @returns {void}
 */
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
      runInsight();
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

/**
 * Renders a JSON response object into the results panel.
 * @param {unknown} responseJson - JSON data returned from the server.
 * @returns {void}
 */
function simpleResponse(responseJson) {
  document.getElementById("results").innerHTML = JSON.stringify(responseJson);
}

/**
 * Writes an error message to the error display area.
 * @param {unknown} error - Error or message to display.
 * @returns {void}
 */
function errorLog(error) {
  document.getElementById("error").innerHTML = error;
}

/**
 * Clears the error display area.
 * @returns {void}
 */
function resetLog() {
  document.getElementById("error").innerHTML = "";
}

/**
 * Resets the working index and clears the visual index label.
 * @returns {void}
 */
function resetIndex() {
  index = -1;
  document.getElementById("index-label").innerHTML = "";
}

/**
 * Deletes a record:
 * - If no index is selected, fetches the list, chooses a random index, shows it, then deletes.
 * - If an index is selected, deletes that record directly.
 * Finally refreshes the list via runPull().
 * @async
 * @returns {void}
 */
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

/**
 * Records a "view" for the current index with an optional date payload.
 * Expects an index to be selected; will still POST if index is -1 (server may handle/err).
 * Appends the server response under the "Insight:" line in the results panel.
 * @async
 * @returns {void}
 */
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

/**
 * Retrieves insight data (views) for the current index and appends it to the results panel.
 * @async
 * @returns {void}
 */
function runInsight() {
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

/**
 * Reads a random record:
 * - Fetches the full list to determine size.
 * - Chooses a random index and displays it.
 * - Fetches the specific record by index and renders it.
 * @async
 * @returns {void}
 */
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

/**
 * Pulls the entire dataset from the server and renders it to the results panel.
 * @async
 * @returns {void}
 */
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

/**
 * Pushes a new favorite character entry using values from the form.
 * Sends: { FirstName, LastName, FavoriteCharacter }.
 * Renders the server response upon success.
 * @async
 * @returns {void}
 */
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
