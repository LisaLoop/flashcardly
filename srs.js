/*SRS: Spaced Repetition System*/

// Random word appears on card on tab open
// User can click card to reveal backside of card
// 1 card per new tab

// TODO: 
/*
- SRS  
    - the first time the extension is loaded the selected deck is loaded into user's local storage.
      when we render cards we render them from local storage. 
      - Every time we render a card we store the last time it was rendered 
      - The user can modify the card status as easy 
        which will disable the word from appearing in the deck for 999 days 
         unless the user enables it before that time in an
         edit grid on the settings page for that deck.
        - this information is saved in local storage and associated to the card. 
       
- BUG: screen bg is black for a moment while bg color loads
- Viewed card history 
 - allows a user to view the last n cards that appeared
- Show currently selected deck in new tab
- change options 
        - change language deck 
            - show what the currently selected deck is
            - when the user changes the currently selected deck
            there should be some message letting her know 
            that the deck changed successfuly.
    - Add a close or back button to go back to the open tab
     - if possible without losing the state  
        - style buttons and text
- Google analytics

STRETCH GOALS
- Put a list to hide certain links from top sites, customize top sites
- A user can add any site to the list of top sites
- The default shows language, education websites (wikipedia, us)
- attribution link

*/



const flipCard = () => {
    let front = document.querySelector('#card');
    front.classList.toggle("is-flipped");
}

const showFrontCard = () => {
    let front = document.querySelector('#card');
    front.classList.remove('is-flipped');
}

const swapCard = () => {
    document.querySelector('body').style.backgroundColor = makeColors().primary;
    getActiveWords((words) => {
        showFrontCard();
        setTimeout(() => {
            showRandomWord(words)
        }, 300)

    });
}

const showRandomWord = (words) => {
    let r = Math.floor(Math.random() * (words.length - 1));
    const selectedWord = words[r];
    let front = document.querySelector('#frontWord');
    front.innerHTML = selectedWord.front;

    let back = document.querySelector('#backWord');
    back.innerHTML = selectedWord.back

}


const init = () => {
    optionsEventHandler();
    toggleTopSites();
    getCurrentDeckName(function(deckName) {
        getDecksFromSettings(deckName[0], function(words){
            getActiveWords((words) => {
                showRandomWord(words);
                let card = document.getElementById("card")
                card.addEventListener("click", flipCard)
                document.body.style.backgroundColor = colorPair.primary;
                let button = document.querySelector('#flip_card');
                button.addEventListener("click", swapCard)
            });
        }) 
    });
    
    // get decks
        // if decks are missing, use default decks
            // save 
            // return default decks
        // else 
            // given a dataSet call 
            // getActiveWords
   

}

const makeColors = () => {
    let hue = Math.floor(Math.random() * 360);
    let complementColor = (180 + hue) % 360;

    return {
        primary: `hsla(${hue},40%,60%,1)`,
        complementary: `hsla(${complementColor},40%,60%,1)`
    }
}
const colorPair = makeColors();


const getTopSites = (callback) => {
    chrome.topSites.get((sites) => {
        // const filteredSites = sites.filter(site => !site.url.includes('chrome-extension://'))
        callback(sites)
    })
}
// 
const makeSiteWidget = (site) => {
    let siteUrl = site.url
    let hostname = (new URL(siteUrl)).hostname;
    // console.log("siteUrl: ", siteUrl);
    // console.log("hostname: ", hostname);
    let letters = hostname
        .replace('www.', '')
        .replace('.com', '')
        .replace('.edu', '')
        .replace('.org', '')
        .toUpperCase()
    // .substr(0, 9);
    return `
    <div id="widget" class="widget">
                <a href="${siteUrl}"><div 
                    style="background-color: ${colorPair.complementary}; 
                        background-image: url(${siteUrl}favicon.ico);
                        background-position:center center;
                        background-size: cover;
                        background-repeat: no-repeat;"  
                    class="widget-icon">

                </div></a>
                <a class="widget-url" href="${siteUrl}">${letters}</a>
            </div>`
}

getTopSites((sites) => {
    let html = [];
    sites.map((site) => {
        html.push(makeSiteWidget(site))
    })
    document.getElementById("siteList").innerHTML = html.join('');
});

function showOptions() {
    chrome.tabs.create({ url: "options.html" });
}
function optionsEventHandler() {
    let cogButton = document.querySelector('#cog_button');
    cogButton.addEventListener("click", () => {
        showOptions();
    })
}

window.onload = init;