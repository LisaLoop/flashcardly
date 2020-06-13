/* This file contains all card selection display logic */

const getActiveWords = (callback) => {
    let languages = {}
    languages.ES = getSpanishWords();
    languages.FR = getFrenchWords();
    let words = [];
    getDecksFromSettings((currentDeckList) => {
        console.log("currentDeckList: ", currentDeckList);

        for (let language of currentDeckList) {
            let dataset = languages[language]
            words = words.concat(dataset)
        }
        console.log("words: ", words);
        callback(words)
    });

    // return words
}