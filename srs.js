/*SRS: Spaced Repetition System*/

// Random word appears on card on tab open
// User can click card to reveal backside of card
// 1 card per new tab

// TODO: 
/*
- center the title ✅
- show/hide top sites
- change options 
    - add a cog button to the top right of the page ✅ 
      to see user options. 
        - change language deck 
            - show what the currently selected deck is
        - show/hide top sites
      - hide the options on the page inside of a 
      full page that appears on clicking the cog button.✅
    - make the options page nicer
        - style buttons and text
- new decks avaiable hirigana, katakana
- Google analytics
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
    getActiveWords((words) => {
        showRandomWord(words);
        let card = document.getElementById("card")
        card.addEventListener("click", flipCard)
        document.body.style.backgroundColor = colorPair.primary;
        let button = document.querySelector('#flip_card');
        button.addEventListener("click", swapCard)
    });

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

function toggleTopSites(){
    let button = document.getElementById('toggle-top-sites');
    let siteList = document.getElementById("siteList");
    button.addEventListener('click', () => {
        console.log("click")
        siteList.classList.toggle('hide-top-sites');
    })
}

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