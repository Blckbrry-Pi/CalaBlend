import { addPhonemeGroupsToDom } from "./phoneme_group_dom_manipulator.mjs";
import { addBackgroundToDom } from "./background_dom_manipulator.mjs";

import phonemeGroupsParse from "../shared/parse_phoneme_group_json.mjs";

import initBackgroundImages from "../shared/load_backgrounds.mjs";

function generatePlayLink (phonemeGroupObjects, backgroundElements) {
    let checkedKeys = phonemeGroupObjects.filter((phonemeGroupObject) => phonemeGroupObject.htmlCheckbox.checked).map((phonemeGroupObject) => phonemeGroupObject.key);
    if (checkedKeys.length === 0) return "#";

    let checkedQuery = encodeURIComponent(checkedKeys.join(" "));
    let backgroundQuery = encodeURIComponent(
        backgroundElements
            .map((element) => {return { element, name: element.children[0].children[0].id }})
            .map((elt) => { window.elt = elt; return elt; })
            .filter((data) => data.element.children[0].children[0].checked)
            .map((data) => data.name)
            .join(" ")
    );
    let playLink = `./play?checked=${checkedQuery}&backgrounds=${backgroundQuery}`;
    console.log(playLink);
    return playLink;
}


const loadAndDisplayPhonemes = async () => {
    let jsonResponse = await fetch("../../data/phoneme_groups.json");
    let parsedJson = JSON.parse(await jsonResponse.text());
    let phonemeGroupObjects = phonemeGroupsParse(parsedJson, true, true);
    
    
    let phonemeGroupTable = document.getElementById("phoneme_group_table");
    addPhonemeGroupsToDom(phonemeGroupObjects, phonemeGroupTable);

    return phonemeGroupObjects;
} 

const loadAndDisplayBackgrounds = async () => {
    let backgrounds = [];

    let backgroundTable = document.getElementById("background_table");
    initBackgroundImages(async (result) => {
        let ab = await result.response.arrayBuffer();
        let backgroundElement = addBackgroundToDom(backgroundTable, URL.createObjectURL( new Blob( [ ab ], { type: 'image/*' } ) ), result.fileName);
        backgrounds.push(backgroundElement);
    });

    return backgrounds;
}

(async () => {
    let [phonemeGroupObjects, backgroundElements] = await Promise.all([loadAndDisplayPhonemes(), loadAndDisplayBackgrounds()]);
    

    let generateLinkButton = document.getElementById("generate_link_button");
    generateLinkButton.onclick = async () => {
        let playLink = generatePlayLink(phonemeGroupObjects, backgroundElements);

        if (playLink !== "#") {
            await navigator.clipboard.writeText(new URL(playLink, window.location.href).href);
            window.open(playLink);
        }
    }
})();