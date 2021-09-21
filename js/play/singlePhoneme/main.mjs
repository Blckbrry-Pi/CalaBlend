import phonemeGroupsParse from "../../shared/parse_phoneme_group_json.mjs";

import initBackgroundImages from "../../shared/load_backgrounds.mjs";

const phonemesPerBackgroundChange = 10;

const getRandomOfArray = (array) => {
    let randomElementIndex = Math.floor(Math.random() * array.length);
    return array[randomElementIndex];
};

const loadedImagesArray = [];
let currCount = 0;
let currBackground;
const handleBackgroundImages = (backgroundsToUse) => initBackgroundImages((result) => (!backgroundsToUse || backgroundsToUse.includes(result.fileName)) && loadedImagesArray.push(result.fileName));
const possBackgChange = () => {
    if (loadedImagesArray.length > 0) {
        if (currCount === 0) {
            let backgroundContainer = document.getElementById("phonemeDivContainer");

            let newBackground;
            let timesTried = 0;
            while (true) {
                newBackground = getRandomOfArray(loadedImagesArray);
                if (currBackground !== newBackground) break;
                if (timesTried === 100) break;
                timesTried++;
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

    let timesTried = 0;
    while ((newPhoneme = getRandomOfArray(possiblePhonemes)) === phonemeDiv.innerHTML) {
        if (timesTried === 100) break;
        timesTried++;
    }

    phonemeDiv.innerHTML = newPhoneme;

    possBackgChange();
};

(async () => {
    let urlParams = new URLSearchParams(window.location.search)
    let checked = urlParams.get("checked").split(" ");
    
    let backgrounds = urlParams.get("backgrounds").split(" ");
    handleBackgroundImages(backgrounds);
    
    let jsonResponse = await fetch("../../data/phoneme_groups.json");
    let parsedJson = JSON.parse(await jsonResponse.text());
    /**
     * @type PhonemeGroup[]
     */
    let phonemeGroupObjects = phonemeGroupsParse(parsedJson, false, false);
    
    
    let possiblePhonemes = [...new Set(
        phonemeGroupObjects
        .filter((phonemeGroupObject) => checked.includes(phonemeGroupObject.key))
        .map((phonemeGroupObject) => phonemeGroupObject.phonemes)
        .flat()
    )];
    
    console.log(possiblePhonemes);

    changePhoneme(possiblePhonemes);


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



