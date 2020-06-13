/*SRS: Spaced Repetition System*/
// import getWords from spanish.js


// Random word appears on card on tab open
// User can click card to reveal backside of card
// 1 card per new tab

// TODO: 
/*
 - change options 
    - users should be able to upload their own data set 
 - change the extention image from default
 - add branding to page
 - display image on card
 - Google analytics

*/

const flipCard = () => {
    let front = document.querySelector('#card');
    front.classList.toggle("is-flipped")
}

const init = () => {
    getActiveWords((words)=>{
        let r = Math.floor(Math.random() * (words.length-1));
        const selectedWord = words[r]; 
        console.log("selectedWord: ", selectedWord);
        
        let front = document.querySelector('#frontWord');
        front.innerHTML = selectedWord.front;
    
        let back = document.querySelector('#backWord');
        back.innerHTML = selectedWord.back
    
        let card = document.getElementById("card")
        card.addEventListener("click", flipCard)
    });
   
    
}

window.onload = init;