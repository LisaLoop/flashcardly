/*SRS: Spaced Repetition System*/

// Random word appears on card on tab open
// User can click card to reveal backside of card
// 1 card per new tab

// TODO: 
/*
 - change options 
    - users should be able to upload their own data set 
 - change the extention image from default
 - add branding to page ✅
 - display image on card
 - Google analytics

*/

const flipCard = () => {
    let front = document.querySelector('#card');
    front.classList.toggle("is-flipped")
}

const init = () => {
    getActiveWords((words) => {
        let r = Math.floor(Math.random() * (words.length - 1));
        const selectedWord = words[r];

        let front = document.querySelector('#frontWord');
        front.innerHTML = getIconHtml(`./images/icons/${selectedWord.icon}`) + "<br>" + selectedWord.front;

        let back = document.querySelector('#backWord');
        back.innerHTML = selectedWord.back

        let card = document.getElementById("card")
        card.addEventListener("click", flipCard)
        document.body.style.backgroundColor = colorPair.primary;
    });

}

const getIconHtml = (icon) => {
    return `<img class="card-icon" src='${icon}'/>`
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
    console.log("siteUrl: ", siteUrl);
    console.log("hostname: ", hostname);
    let letters = hostname
        .replace('www.', '')
        .replace('.com', '')
        .replace('.edu', '')
        .replace('.org', '')
        .toUpperCase()
        // .substr(0, 9);
    return `<div class="widget">
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


window.onload = init;