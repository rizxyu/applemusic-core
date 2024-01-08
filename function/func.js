const axios = require("axios")
const cheerio = require("cheerio")


async function tags(title, artist, year, album, image) {
  const result = {
    title: title,
    artist: artist,
    year: year,
    album: album,
    image: {
      description: "Front Cover",
      imageBuffer: image
    }
  }
  return result
}


async function getBuffer(url, options) {
    try {
        options ? options : {};
        const res = await axios({
            method: "get",
            url,
            headers: {
                'DNT': 1,
                'Upgrade-Insecure-Request': 1
            },
            ...options,
            responseType: 'arraybuffer'
        });
        return res.data;
    } catch (e) {
        console.log(`Error : ${e}`);
    }
};


module.exports = {getBuffer, tags}
