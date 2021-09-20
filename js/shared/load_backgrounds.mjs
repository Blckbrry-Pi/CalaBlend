export default async (onImageLoadCallback) => {
    let backgroundsResponse = await fetch("/data/backgrounds/backgrounds.json");
    let backgroundsData = await backgroundsResponse.json();
    backgroundsData.map((fileName) => fetch(`/data/backgrounds/${fileName}`).then((response) => {return {fileName, response}}).then(onImageLoadCallback));
};