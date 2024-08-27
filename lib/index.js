/*
######### READ THIS #########
This script is not for sale, it is prohibited to sell
this script because this script is free for everyone!

Creator:
  - Wizz Team
    - Rizxyu [https://github.com/Rizxyu]
    - Fau-Zan [https://github.com/Fau-Zan]
    - MuhammadRestu999 [https://github.com/MuhammadRestu999]

Thanks to Fabdl API
*/


const axios = require("axios")
const cheerio = require("cheerio")


/**
 * Download audio from apple music
 *
 * @param {String} url - Apple music link [eg: https://music.apple.com/id/album/together-forever-2022-remaster/1626265761?i=1626266018]
 * @returns {Promise<{ filename: String, image: String, title: String, mimetype: String, data: Buffer }>}
 * @throws {axios.AxiosError|{ error: boolean, message: string }|any}
 */
async function download(url) {
  const {
    data: _data
  } = await axios.get(`https://api.fabdl.com/apple-music/get?url=${encodeURIComponent(url)}`)
  if(_data.error) throw _data.error

  const {
    result: {
      gid,
      artists,
      image,
      name: title,
    }
  } = _data

  const id = _data.result.type === "track" ? _data.result.id : null
  if(_data.result.type !== "track") throw {
    error: true,
    message: "Must be audio URL"
  }

  const {
    data: {
      result: {
        tid
      }
    }
  } = await axios.get(`https://api.fabdl.com/apple-music/mp3-convert-task/${gid}/${id}`)

  const {
    data,
    headers
  } = await axios.get(`https://api.fabdl.com/apple-music/download-mp3/${tid}`, {
    responseType: "arraybuffer"
  })

  return {
    filename: `${artists} - ${decodeURIComponent(headers["content-disposition"].split("''")[1])}`,
    image,
    title,
    mimetype: "audio/mpeg",
    data
  }
}

/**
 * Download audio from albums
 * 
 * @prop {string} url - Album URL
 * @prop {number} [limit=3] - Max audio(s)
 * @returns {Promise<{ artists: string, image: string, audios: { image: string, title: string, data: buffer }[] }>}
 */
async function downloadAlbums(url, limit = 3) {
  const {
    data: _data
  } = await axios.get(`https://api.fabdl.com/apple-music/get?url=${encodeURIComponent(url)}`)
  if(_data.error) throw _data.error

  const {
    result: {
      image,
      tracks,
      artists
    }
  } = _data
  if(_data.result.type !== "album") throw {
    error: true,
    message: "Must be album URL"
  }

  const audios = []
  for(const i of tracks) {
    if(audios.length >= limit) break

    const res = await download(`${url}?i=${i.id}`)
    delete res.filename
    delete res.mimetype
    audios.push(res)
  }
  return {
    artists,
    image,
    audios
  }
}

/**
 * get metadata info audio from url
 *
 * @param {String} url - Apple Music song url [eg: Never gonna give you up]
 */
async function getInfo(url) {
  const {
    data: _data
  } = await axios.get(`https://api.fabdl.com/apple-music/get?url=${encodeURIComponent(url)}`)
  if(_data.error) throw _data.error

  const {
    result: {
      gid,
      artists,
      image,
      name: title,
    }
  } = _data
  return _data
}
/**
 * Search audio from apple music
 *
 * @param {String} query - Apple Music search query [eg: Never gonna give you up]
 * @returns {Promise<{ url: String, type: "Album" | "Song", artists: String, title: String, cover: String }[]>}
 */
async function search(query) {
  const { data } = await axios.get(`https://music.apple.com/us/search?term=${encodeURIComponent(query)}`, { 
    headers: { 
      "Origin": "https://music.apple.com",
      "Referer": "https://music.apple.com/", 
      'User-Agent': "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36"
    }
  });

  const $ = cheerio.load(data);

  return $("li.song").map((i, el) => {
    const element = $(el);
    
    const title = element.find("div.song-name").text().trim();
    const artists = element.find("div.songs-artist-album > span:first-child").text().trim();
    const type = "Song"; // This may need to be adjusted if scraping for Albums
    const url = element.find("a.song-link").attr("href");
    let cover = element.find("picture > source[type='image/jpeg']").attr("srcset");

    if (cover) {
      cover = cover.split(",").pop().split(" ")[0];
      cover = cover.replace(/\d+w$/, "1024x1024"); // Adjust the cover size to 1024x1024
    } else {
      cover = ''; // Default to empty if cover not found
    }

    if (title && artists && url) {
      return { url, type, artists, title, cover };
    }
  }).get(); // .get() converts the jQuery object to a plain array
}


module.exports = {
  download,
  getInfo,
  downloadAlbums,
  search
}
