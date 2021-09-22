export default async (onImageLoadCallback, dataPath) => {
    let backgroundsResponse = await fetch(`${dataPath}/backgrounds/backgrounds.json`);
    let backgroundsData = await backgroundsResponse.json();
    backgroundsData.forEach((fileName) => fetch(`${dataPath}/backgrounds/${fileName}`).then((response) => {return {fileName, response}}).then(onImageLoadCallback));
};