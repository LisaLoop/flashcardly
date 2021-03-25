/* This file contains all card selection display logic */

const getActiveWords = (callback) => {
    let languages = {}
    languages.ES = getSpanishWords();
    languages.FR = getFrenchWords();
    let words = [];
    getCurrentDeckName((currentDeckList) => {
        for (let language of currentDeckList) {
            let dataset = languages[language]
            words = words.concat(dataset)
        }
        
        callback(words)
    });

    // return words
}