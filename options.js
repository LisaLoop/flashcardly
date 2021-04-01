let page = document.getElementById('options_page');
const languageDecks = ["ES", "FR"];


let messageBox = document.createElement('div');
    messageBox.classList.add("options-box-title");
    page.appendChild(messageBox);

function constructOptions(languageDecks) {
  for (let language of languageDecks) {
    let button = document.createElement('button');
    button.classList.add('options-box-button')
    button.innerHTML = language;

    button.addEventListener('click', function () {
      chrome.storage.sync.set({ language: language }, function () {
        messageBox.textContent = `${language} chosen. Your preferences have been saved.`
      })
    });
    page.appendChild(button);
  }
}

function getCurrentDeckName(callback) {
  // console.log("languageDecks[0]: ",languageDecks[0])
  getOptionOrDefault('language', languageDecks[0], callback)
}
function getCurrentPosition(callback) {
  getOptionOrDefault('currentPosition', 0, callback)
}
function getDecksFromSettings(deckName, callback) {
  // console.log("deckName: ", deckName);
  var spanishWords = getSpanishWords();
  getOptionOrDefault(deckName, spanishWords , callback)
}
function getShowTopSitesState(callback){
  getOptionOrDefault('showTopSites', 0, callback)
}

function getOptionOrDefault(optionName, defaultValue, callback) {
  chrome.storage.sync.get([optionName], function (result) {
    if (chrome.runtime.lastError) {
      console.log("getOptionOrDefault: chrome.runtime.lastError: ", chrome.runtime.lastError)
      // TODO set
      callback(defaultValue);
    } else {
      if (optionName in result) {
        callback(result[optionName]);
      } else {
      
        callback(defaultValue);
      }
    }
    // const value = chrome.runtime.lastError
    //   ? defaultValue
    //   : result?.[optionName] ?? defaultValue
    // callback(value);
  });
}


// const handleChromeError = (systemName) => {
//   const err = chrome.runtime.lastError;
//   if (err) {
//     console.log(`${systemName}: chrome.runtime.lastError: ${err}`);
//   }
//   return !!err;
// };

// const getOptionOrDefault = (key, defaultValue, callback) =>
//   chrome.storage.sync.get([key], (result) => {
//     const hadError = handleChromeError(`getOptionOrDefault`);
//     const useDefault = hadError || !(key in result);
//     const value = useDefault ? defaultValue : result[key];
//     callback({ [key]: value });
//   });

// const getCurriedOptionOrDefault = (key, defaultValue) => (callback) =>
//   getOptionOrDefault(key, defaultValue, callback);


// const getShowTopSitesState = getCurriedOptionOrDefault("showTopSites", 0);
// const getCurrentPosition = getCurriedOptionOrDefault("currentPosition", 0);
// const getCurrentDeckName = getCurriedOptionOrDefault("language",  languages[0]);
// var getDecksFromSettings = (deck, callback) =>
//   getOptionOrDefault(deck, getSpanishWords(), callback);

// /*
// Uncaught TypeError: getShowTopSitesState is not a function
//     at toggleTopSites (options.js:144)
//     at init (srs.js:79)
// */


function saveDeckInLocalStorage(deckName, dataSet, callback){
  let options = {};
  options[deckName] = dataSet
  chrome.storage.sync.set(options, callback)
}

function setShowTopSitesState(state) {
  chrome.storage.sync.set({ showTopSites: state }, function () {
    console.log("state set: ", state);
  }) 
}


function getTopSitesButtonState (state, states) {
  let buttonState;
  // This happens when the user first installs the app
  if (!("showTopSites" in state)) {
    buttonState = 0;
    console.log("2. state: ", state)
  } else {
    console.log("state.showTopSites: ", state.showTopSites);
    buttonState = state.showTopSites;
  }
  // it's possible a previous version of the software stored undefined
  // by mistake
  if (buttonState == null) { buttonState = 0 }
  // Coerce to int because a previous version might have stored strings
  if (parseInt(buttonState) !== buttonState) {
    buttonState = 0;
    console.log("3. state: ", state)
  }
  // Make sure the value is within the valid value set
  if (!(buttonState in states)) {
    buttonState = 0;
  }
  return buttonState;
}

function toggleTopSites() {
  const states = ['▼', '▶']; // open, closed
  const button = document.getElementById('toggle-top-sites');
  const siteList = document.getElementById("siteList");
  let buttonState = 0;
  getShowTopSitesState(function (state) { // false    [1] / [0]    1 / 0
    // buttonState = getTopSitesButtonState(state, states);
    buttonState = state;
    button.innerHTML = states[buttonState];

    if (buttonState === 1) {
      console.log("4. state: ", state);
      siteList.classList.add('hide-top-sites');
    }
  })

  function toggleTopSites() {
    siteList.classList.toggle('hide-top-sites');
    buttonState = (buttonState + 1) % 2;
    button.innerHTML = states[buttonState];
    setShowTopSitesState(buttonState);
  }

  button.addEventListener('click', () => {
    toggleTopSites();
  })
}

constructOptions(languageDecks)
