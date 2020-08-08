const fetch = require('node-fetch')
const fs = require('fs')


const ICONS_API_KEY = process.env.API_KEY;

let word = "cat";
// const url = `https://search.icons8.com/api/iconsets/v5/search?term=cat&token=dFa01AUZ21BdREibsUIA2IB79aRw2X44rfdNk7cr`

const englishWords = fs.readFileSync('./english-from-spanish.txt',
    { encoding: 'utf8', flag: 'r' });
const lines = englishWords.split('\n')

    .filter((line, i) => (i < 10000))
    .map((line) => {
        // cross reference parsenotes
        return line.trim()
            .replace(new RegExp('[*?\\;,/() ]', "gi"), '')
    });

function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}
// console.log("lines: ", lines.length);
// https://api-icons.icons8.com/publicApi/icons/icon?id=fsoiqMUp0O4v&token=dFa01AUZ21BdREibsUIA2IB79aRw2X44rfdNk7cr

let iconIdList = [];


async function main() {

    lines.forEach(async (word) => {
        let fileName = "./icons/" + word + ".svg";
        // if file exists: skip.
        try {
            if (fs.existsSync(fileName)) {
                console.log("skipping ", fileName)
                return
            }
        } catch (err) {
            console.error(err)
        }


        console.log(word);
        let searchURL = `https://search.icons8.com/api/iconsets/v5/search?term=${word}&token=${ICONS_API_KEY}&amount=1`
        fetch(searchURL)
            .then(response => response.json())
            // .then(console.log)
            .then(data => {
                // console.log("data: ", data)
                iconIdList.push(data.icons[0].id)
                let id = data.icons[0].id;
                let singleIconURL = `https://api-icons.icons8.com/publicApi/icons/icon?id=${id}&token=${ICONS_API_KEY}`
                fetch(singleIconURL)
                    .then(response => response.json())
                    .then(icon => {
                        let fileContents = icon.icon.svg;

                        // save to disk
                        fs.writeFileSync(fileName, fileContents)
                    })
            });
        await sleep(5000);

    })
}


(async () => {
    main()
})();


/**
 * 
 * {
  "success": true,
  "icon": {
    "id": "fsoiqMUp0O4v",
    "publishedAt": 1586500600997,
    "name": "Car",
    "platform": "fluent",
    "platformName": "Fluent",
    "description": "",
    "category": "transport",
    "categoryName": "Transport",
    "subcategory": "cars",
    "subcategoryName": "Cars",
    "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 48 48\"><path fill=\"#565b5e\" d=\"M38,42h6c0.552,0,1-0.448,1-1v-5h-8v5C37,41.552,37.448,42,38,42z\"/><path fill=\"#565b5e\" d=\"M11,41v-5H3v5c0,0.552,0.448,1,1,1h6C10.552,42,11,41.552,11,41z\"/><linearGradient id=\"xZmGJBMEsDHOR18pHcPx5a\" x1=\"3\" x2=\"45\" y1=\"22.5\" y2=\"22.5\" gradientUnits=\"userSpaceOnUse\"><stop offset=\"0\" stop-color=\"#42a3f2\"/><stop offset=\"1\" stop-color=\"#42a4eb\"/></linearGradient><path fill=\"url(#xZmGJBMEsDHOR18pHcPx5a)\" d=\"M42,19l-2.243-8.97C39.312,8.249,37.712,7,35.877,7H12.123c-1.835,0-3.435,1.249-3.881,3.03\tL6,19l-1.8,2.4C3.421,22.438,3,23.702,3,25v11c0,1.105,0.895,2,2,2h38c1.105,0,2-0.895,2-2V25c0-1.298-0.421-2.561-1.2-3.6L42,19z\"/><circle cx=\"38.5\" cy=\"26.5\" r=\"2.5\" fill=\"#fff\"/><circle cx=\"9.5\" cy=\"26.5\" r=\"2.5\" fill=\"#fff\"/><linearGradient id=\"xZmGJBMEsDHOR18pHcPx5b\" x1=\"15\" x2=\"33\" y1=\"31.5\" y2=\"31.5\" gradientUnits=\"userSpaceOnUse\"><stop offset=\"0\" stop-color=\"#3079d6\"/><stop offset=\"1\" stop-color=\"#297cd2\"/></linearGradient><path fill=\"url(#xZmGJBMEsDHOR18pHcPx5b)\" d=\"M15,29l1.497,3.743C16.801,33.502,17.536,34,18.354,34h11.292\tc0.818,0,1.553-0.498,1.857-1.257L33,29H15z\"/><linearGradient id=\"xZmGJBMEsDHOR18pHcPx5c\" x1=\"42\" x2=\"48\" y1=\"18\" y2=\"18\" gradientUnits=\"userSpaceOnUse\"><stop offset=\"0\" stop-color=\"#42a3f2\"/><stop offset=\"1\" stop-color=\"#42a4eb\"/></linearGradient><path fill=\"url(#xZmGJBMEsDHOR18pHcPx5c)\" d=\"M46,20h-4v-2c0-1.105,0.895-2,2-2h3c0.552,0,1,0.448,1,1v1C48,19.105,47.105,20,46,20z\"/><linearGradient id=\"xZmGJBMEsDHOR18pHcPx5d\" x1=\"0\" x2=\"6\" y1=\"18\" y2=\"18\" gradientUnits=\"userSpaceOnUse\"><stop offset=\"0\" stop-color=\"#42a3f2\"/><stop offset=\"1\" stop-color=\"#42a4eb\"/></linearGradient><path fill=\"url(#xZmGJBMEsDHOR18pHcPx5d)\" d=\"M2,20h4v-2c0-1.105-0.895-2-2-2H1c-0.552,0-1,0.448-1,1l0,1C0,19.105,0.895,20,2,20z\"/><linearGradient id=\"xZmGJBMEsDHOR18pHcPx5e\" x1=\"7.75\" x2=\"40.25\" y1=\"14.5\" y2=\"14.5\" gradientUnits=\"userSpaceOnUse\"><stop offset=\"0\" stop-color=\"#3079d6\"/><stop offset=\"1\" stop-color=\"#297cd2\"/></linearGradient><path fill=\"url(#xZmGJBMEsDHOR18pHcPx5e)\" d=\"M40.25,20l-0.092-0.123l-0.098-0.392l-2.243-8.97C37.594,9.623,36.796,9,35.877,9H12.123\tc-0.919,0-1.717,0.623-1.94,1.515l-2.242,8.97l-0.098,0.392L7.75,20H40.25z\"/></svg>",
    "tags": [
      "Auto",
      "Automobile",
      "Car",
      "Car Emoji",
      "Car Front",
      "Car Outline",
      "Car Silhouette",
      "Competition",
      "Drive",
      "Driver",
      "Driving",
      "Motor",
      "Motorcar",
      "Outline of a Car",
      "Ride",
      "Sedan",
      "Steering Wheel",
      "Travel",
      "Vehicle",
      "car",
      "clip art",
      "clip art car",
      "clipart",
      "hatchback"
    ]
  }
}
 */


// {'word': {id:"asdsa", iconUrl:"asdaf"} }
// console.log("idList: ", iconIdList);


// for loop
// for each record in the first 100 records:

// fetch images:

// get the first one

// call api again to fetch the icon

// save icon as ./icons/$WORD.svg

// parsenotes.js : add url only if the file exists.
//  report how many were sucessful.


// fetch(url)
//     .then(response => response.json())
//     .then(data => console.log(data));

