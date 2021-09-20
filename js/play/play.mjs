import phonemeGroupsParse from "../shared/parse_phoneme_group_json.mjs";

import initBackgroundImages from "../shared/load_backgrounds.mjs";

const phonemesPerBackgroundChange = 10;

const getRandomOfArray = (array) => {
    let randomElementIndex = Math.floor(Math.random() * array.length);
    return array[randomElementIndex];
};

const loadedImagesArray = [];
let currCount = 0;
let currBackground;
const handleBackgroundImages = () => initBackgroundImages((result) => loadedImagesArray.push(result.fileName));
const possBackgChange = () => {
    if (loadedImagesArray.length > 0) {
        if (currCount === 0) {
            let backgroundContainer = document.getElementById("phonemeDivContainer");

            let newBackground;
            while (true) {
                newBackground = getRandomOfArray(loadedImagesArray);
                if (currBackground !== newBackground) break;
            }

            currBackground = newBackground;

            backgroundContainer.style = `background-image: url("/data/backgrounds/${newBackground}");`;
        }
        currCount = (currCount + 1) % phonemesPerBackgroundChange;
    }
}

const changePhoneme = (possiblePhonemes) => {
    let phonemeDiv = document.getElementById("phonemeDiv");

    let newPhoneme;

    while ((newPhoneme = getRandomOfArray(possiblePhonemes)) === phonemeDiv.innerHTML);

    phonemeDiv.innerHTML = newPhoneme;

    possBackgChange();
};

(async () => {
    let checked = new URLSearchParams(window.location.search).get("checked").split(" ");
    console.log(new URLSearchParams(window.location.search).get("checked"));
    
    let jsonResponse = await fetch("../../data/phoneme_groups.json");
    let parsedJson = JSON.parse(await jsonResponse.text());
    /**
     * @type PhonemeGroup[]
     */
    let phonemeGroupObjects = phonemeGroupsParse(parsedJson, false);
    
    
    let possiblePhonemes = [...new Set(
        phonemeGroupObjects
        .filter((phonemeGroupObject) => checked.includes(phonemeGroupObject.key))
        .map((phonemeGroupObject) => phonemeGroupObject.phonemes)
        .flat()
    )];
    
    console.log(possiblePhonemes);

    changePhoneme(possiblePhonemes);
    handleBackgroundImages();


    document.addEventListener("click", (event) => {
        changePhoneme(possiblePhonemes);
        event.preventDefault();
        event.stopPropagation();
    });

    document.addEventListener("keypress", (event) => {
        if (["Space", "Enter"].includes(event.code)) {
            changePhoneme(possiblePhonemes);
            event.preventDefault();
            event.stopPropagation();
        }
    });

})();



