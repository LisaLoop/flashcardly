/*
- welcome screen w/instructions 
- black bg before app loads
- unintuitive options (options should be like a modal with a close icon)
- lack of discoverability of the card flipping
- better flip icon instead of the shuffle icon
- button to flip card and another button to change cards
- label for top sites toggle button
- user should see ui in their local language 
*/

const flipCard = () => {
    let front = document.querySelector('#card');
    front.classList.toggle("is-flipped");
}

const showFrontCard = () => {
    let current = document.querySelector('#card');
    current.classList.remove('is-flipped');

    const next = current.cloneNode(true);
    next.addEventListener("click", flipCard);
    current.replaceWith(next);
}

const swapCard = () => {
    getActiveWords((words) => {
        showFrontCard();
        changeColors();
        showRandomWord(words)
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

const changeColors = () => {
    const colors = makeColors();
    document.querySelector('body').style.backgroundColor = colors.primary;
    const iconWidgets = document.querySelectorAll('.widget-icon');
    Array.from(iconWidgets)
        .filter((icon) => icon.style)
        .forEach((icon) => { icon.style.backgroundColor = "rgb(230,230,230)"; });

}

const init = () => {
    optionsEventHandler();
    toggleTopSites();
    changeColors();
    getCurrentDeckName(function (deckName) {
        getDecksFromSettings(deckName[0], function (words) {
            getActiveWords((words) => {
                showRandomWord(words);
                let card = document.getElementById("card")
                card.addEventListener("click", flipCard)
                let button = document.querySelector('#flip_card');
                button.addEventListener("click", swapCard)
            });
        })
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
        callback(sites)
    })
}

const makeSiteWidget = (site) => {
    let siteUrl = site.url
    let hostname = (new URL(siteUrl)).hostname;
    let letters = hostname
        .replace('www.', '')
        .replace('.com', '')
        .replace('.edu', '')
        .replace('.org', '')
        .toUpperCase()
    
    return `
    <div id="widget" class="widget">
        <a href="${siteUrl}">
            <div 
                style="background-image: url(https://s2.googleusercontent.com/s2/favicons?sz=32&domain=${encodeURIComponent(siteUrl)});
                    background-position:center center;
                    background-repeat: no-repeat;"  
                    class="widget-icon">
            </div>
        </a>
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

window.onload = () => setTimeout(init);
