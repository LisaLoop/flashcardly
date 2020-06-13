const fs = require('fs');

let file = fs.readFileSync('./french-flashcards2.txt', {encoding:"utf8"});

const parseNotes =(notes)=> {
    console.log(`const getFrenchWords = () => {
        return b
    }
    let b = [];`)
    let lines = notes.split('\n')
    for(line of lines){
        let t = line.split('\t')
        let front = t[1].replace(/"/gi,"");
        let back = t[2].replace(/"/gi,"");
        console.log(`b.push({"front":"${front}","back":"${back}"});`);
    }
}


parseNotes(file);