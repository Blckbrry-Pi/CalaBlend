class PhonemeGroup {
    constructor(key, parsedJSON, generateHtmlElements) {
        this.name = parsedJSON.name;

        this.key = key;
        
        this.phonemes = parsedJSON.phonemes;
        
        if (generateHtmlElements) {
            this.htmlCheckbox = document.createElement("input");
            this.htmlCheckbox.type = "checkbox";
            this.htmlCheckbox.id = key;
            this.htmlCheckbox.name = key;
            
            this.htmlName = document.createElement("label");
            this.htmlName.htmlFor = key;
            this.htmlName.innerText = this.name;

            this.htmlContents = document.createElement("label");
            this.htmlContents.htmlFor = key;
            this.htmlContents.innerText = this.phonemes.join(", ");
        }
    }
}

export default function(parsedJSON, generateHtmlElements, filterOutNoShow) {
    return Object.entries(parsedJSON).filter((entry) => !(entry[1].noShowSinglePhoneme && filterOutNoShow)).map((entry) => new PhonemeGroup(entry[0], entry[1], generateHtmlElements));
}