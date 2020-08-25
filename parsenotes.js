const fs = require('fs');
let inputFile = process.argv[2]; // 
let varName = process.argv[3]; // 
let functionName = process.argv[4]; //
let offset = parseInt(process.argv[5]);
let file = fs.readFileSync(inputFile, {encoding:"utf8"});

const parseNotes =(notes)=> {
    console.log(`const ${functionName} = () => {
        return ${varName}
    }
    let ${varName} = [];`)
    let lines = notes.split('\n')
    let foundTotal = 0;
    for(line of lines){
        let t = line.split('\t');
        if(!t[0+offset] || !t[1+offset]){continue}
        let front = t[0+offset].replace(/"/gi,"");
        let back = t[1+offset].replace(/"/gi,"");
        
        console.log(`${varName}.push({"front":"${front}","back":"${back}"});`); // ,"icon":"${iconUrl}"
        
    }
    console.log("//" + foundTotal);
}

function basename(path) { 
    return path.split("/")[path.split("/").length-1];
}

parseNotes(file);