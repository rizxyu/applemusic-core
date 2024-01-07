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
 * @returns {Promise<{ filename: String, mimetype: String, data: Buffer }>}
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
      tracks
    }
  } = _data

  const id = _data.result.type === "track" ? _data.result.id : null
  if(_data.result.type === "album") throw {
    error: true,
    message: "Must be audio URL and not album"
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
    mimetype: "audio/mpeg",
    data
  }
}


/**
 * Search audio from apple music
 *
 * @param {String} query - Apple Music search query [eg: Never gonna give you up]
 * @returns {Promise<{ url: String, type: "Album" | "Song", artists: String, title: String, cover: String }[]>}
 */
async function search(query) {
  const { data } = await axios.get(`https://music.apple.com/id/search?term=${encodeURIComponent(query)}`)
  const $ = cheerio.load(data)

  return [...$("div.desktop-search-page.svelte-ip65r4 > div.section.svelte-nsw41u.with-top-spacing > div > ul > li")].map(v => $(v).find.bind($(v))).map(($) => {
    const [title, type, artists] = $("div.top-search-lockup").attr("aria-label").split(" · ")
    const url = $("a.click-action").attr("href")
    let cover = $(`picture > source[type="image/jpeg"]`).attr("srcset").split(",").at(-1)
    const [, _size] = / ([0-9]+)w$/.exec(cover)
    cover = cover.split(" ")[0].replace(`${_size}x${_size}`, "1024x1024")

    return {
      url,
      type,
      artists,
      title,
      cover
    }
  })
}

module.exports = {
  download,
  search
}
