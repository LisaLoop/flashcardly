/* This file contains all card selection display logic */

const getActiveWords = (callback) => {
    let languages = {}
    languages.ES = getSpanishWords();
    languages.FR = getFrenchWords();
    let words = [];
    getCurrentDeckName((language) => {
        let dataset = languages[language]
        words = words.concat(dataset)
        callback(words)
    });

    // return words
}