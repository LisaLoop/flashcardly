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
        front.innerHTML = selectedWord.front;

        let back = document.querySelector('#backWord');
        back.innerHTML = selectedWord.back

        let card = document.getElementById("card")
        card.addEventListener("click", flipCard)
        document.body.style.backgroundColor = makeColor();
    });

}
// 1-360 , 40, 60, 1
const makeColor = () => {
    let x = Math.floor(Math.random() * 360);
    return `hsla(${x},40%,60%,1)`
}

const getTopSites = (callback) => {
    chrome.topSites.get((sites) => {
        callback(sites)
    })
}
// 
const makeSiteWidget = (site) => {
    let domain = site.url
    let hostname = (new URL(domain)).hostname;
    return `<a class="widget-url" href=${domain}><img src="${domain}favicon.ico"/></a>`
}

getTopSites((sites) => {
    let html = [];
    sites.map((site) => {
        html.push(makeSiteWidget(site))
    })
    document.getElementById("siteList").innerHTML = html.join('');
});

 
window.onload = init;