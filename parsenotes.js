const fs = require('fs');
let inputFile = process.argv[2]; // 
let varName = process.argv[3]; // 
let functionName = process.argv[4]; //
let offset = parseInt(process.argv[5]);
let file = fs.readFileSync(inputFile, {encoding:"utf8"});
let icons = fs.readFileSync('./icons.txt', {endcoding:"utf8"});

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
        let icon = getIcon(icons,back);
        if(icon.found){
            foundTotal += 1;
        }
        let url = icon.icon;
        // console.log(`b.push({"front":"${front}","back":"${back}","icon":"${url}"});`);
        if(icon.found){
            console.log(`${varName}.push({"front":"${front}","back":"${back}","icon":"${url}"});`);
        }
    }
    console.log("//" + foundTotal);
}

function basename(path) { 
    return path.split("/")[path.split("/").length-1];
}

// takes a word (back of the card) and searches icons.txt
// for a matching icon. If found returns the object, otherwise return found:false
const getIcon = (file, word) => {

    word = word.toLowerCase();
    word = word.replace(/\[/gi," ");
    word = word.replace(/\]/gi," ");
    word = word.replace(/\)/gi," ");
    word = word.replace(/\(/gi," ");
    word = word.replace(/\*/gi," ");
    let lines = (""+file).split('\n');
    let candidates = [];
    
    lines
        .forEach((icon) => {
            let newIcon = basename(icon);
            newIcon = icon.replace(/-/gi," ");
            newIcon = newIcon.toLowerCase();
            // icon.indexOf(word) != -1;
            if(newIcon.match(new RegExp("\\b"+word+"\\b","gi"))){
                // found it
                candidates.push(icon);
            }

        })
        if(candidates.length === 0){
            return {icon:'',found:false}        
        }
    return {icon:candidates[0],found:true}
}




parseNotes(file);