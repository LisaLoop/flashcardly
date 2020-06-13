let page = document.getElementById('page');
const languageDecks = ["ES", "FR"];

  function constructOptions(languageDecks) {
    let messageBox = document.createElement('div');
    messageBox.textContent = "Choose a language deck"
    page.appendChild(messageBox)
    
    for (let language of languageDecks) {
      let button = document.createElement('button');
      button.innerHTML = language;
      
      button.addEventListener('click', function() {
        chrome.storage.sync.set({language: language}, function() {
          messageBox.textContent = `${language} chosen. Your preferences have been saved.`
        })
      });
      page.appendChild(button);
    }
  }
  
constructOptions(languageDecks)
function getDecksFromSettings(callback){
  chrome.storage.sync.get(['language'], function(result) {
    callback([result.language]);
  });
  return languageDecks
}