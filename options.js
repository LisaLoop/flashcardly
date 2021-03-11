let page = document.getElementById('options_page');
const languageDecks = ["ES", "FR"];

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

function getDecksFromSettings(callback) {
  chrome.storage.sync.get(['language'], function (result) {
    if (chrome.runtime.lastError) {
      console.log("chrome.runtime.lastError: ", chrome.runtime.lastError)
      callback([languageDecks[0]])
    } else {
      if ('language' in result) {
        callback([result.language]);
      } else {
        callback([languageDecks[0]]);
      }
    }
  });
  return languageDecks
}

function setShowTopSitesState(state) {
  chrome.storage.sync.set({ showTopSites: state }, function () {
    console.log(state);
  })
}
function getShowTopSitesState(callback) {
  chrome.storage.sync.get(['showTopSites'], callback)
}

function toggleTopSites() {
  const states = ['▼', '▶']; // open, closed
  const button = document.getElementById('toggle-top-sites');
  const siteList = document.getElementById("siteList");
  let buttonState = 0;
  getShowTopSitesState(function (state) {
    // This happens when the user first installs the app
    if (!("showTopSites" in state)) {
      buttonState = 0;
    } else {
      buttonState = state.showTopSites;
    }
    // it's possible a previous version of the software stored undefined
    // by mistake
    if (buttonState == null) { buttonState = 0 }
    // Coerce to int because a previous version might have stored strings
    if (parseInt(buttonState) !== buttonState) {
      buttonState = 0;
    }
    // Make sure the value is within the valid value set
    if (!(buttonState in states)) {
      buttonState = 0;
    }
    button.innerHTML = states[buttonState];
    if (buttonState === 1) {
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
    toggleTopSites()
  })
}

constructOptions(languageDecks)
