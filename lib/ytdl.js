const { exec } = require("child_process");
const path = require("path");
const fs = require("fs");

const tmp = path.join(__dirname, "../tmp"); // path to your tmp folder
const ytdlp =
  // path to your yt-dlp
  path.join(__dirname, "./yt-dlp") +
  " --cookies " +
  // path to your cookies (Netscape format)
  path.join(__dirname, "./cookies.txt");

/**
 * Get YouTube Video Information
 * @param {string} url
 * @returns {Promise<{ id: string, title: string, thumbnail: string, description: string, duration: number, views: number, likes: number, comments: number, uploaded: string, channel: { id: string, handle: string, name: string, picture: string, subscribers: number, verified: boolean }, videos: string[] }>}
 */
function getInfo(url) {
  return new Promise((res, rej) => {
    exec(`${ytdlp} -j "${url}"`, async (err, stdout) => {
      if(err) {
        return rej(err);
      }

      const info = JSON.parse(stdout);
      const _res = await fetch("https://imageyoutube.com/profile-photo-download/imgyt", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Referer: "https://imageyoutube.com/profile-photo-download/"
        },
        body: `v=${encodeURIComponent(url)}&mcountry=en`
      });
      const txt = await _res.text();
      const picture = /<img src='(.*)' alt/.exec(txt)[1];

      res({
        id: info.id,
        title: info.title,
        thumbnail: `https://i.ytimg.com/vi/${info.id}/maxresdefault.jpg`,
        description: info.description,
        duration: info.duration,
        views: info.view_count,
        likes: info.like_count,
        comments: info.comment_count,
        uploaded: info.timestamp,
        channel: {
          id: info.channel_id,
          handle: info.uploader_id,
          name: info.uploader,
          picture,
          subscribers: info.channel_follower_count,
          verified: !!info.channel_is_verified
        },
        videos: [
          ...new Set(
            info.formats
              .filter(v => v.video_ext === "mp4")
              .map(v => v.height + "p")
          )
        ]
      });
    });
  });
}

/**
 * Download YouTube video as mp4
 * @param {string} url
 * @param {string} [quality="480p"]
 * @returns {Promise<Buffer>}
 */
function getVideo(url, quality = "480p") {
  return new Promise((res, rej) => {
    const ts = Date.now();
    exec(`${ytdlp} -f "ba[ext=m4a]+bv[height=${quality.slice(0, -1)}]" -o "${tmp}/${ts}.%(ext)s" --merge-output-format mp4 "${url}"`, (_, stdout, stderr) => {
      if(stderr.length) {
        return rej(new Error(stderr));
      }

      try {
        const filename = /Merging formats into "(.*)"/.exec(stdout)[1];
        const result = fs.readFileSync(filename);
        fs.unlinkSync(filename);
        res(result);
      } catch(e) {
        rej(e);
      }
    });
  });
}

/**
 * Download YouTube video as mp3
 * @param {string} url
 * @returns {Promise<Buffer>}
 */
 function getAudio(url) {
  return new Promise((res, rej) => {
    const ts = Date.now();
    exec(`${ytdlp} -f "ba" -o "${tmp}/${ts}.%(ext)s" "${url}"`, (_, stdout, stderr) => {
      if(stderr.length) {
        return rej(new Error(stderr));
      }

        const filename = /Destination: (.*)/.exec(stdout)[1];
        exec(`ffmpeg -i ${filename} -vn -ar 44100 -ac 2 -b:a 192k ${tmp}/${ts}.mp3`, (err) => {
          if(err) {
            return rej(err);
          }

          try {
            const result = fs.readFileSync(`${tmp}/${ts}.mp3`);
            fs.unlinkSync(filename);
            fs.unlinkSync(`${tmp}/${ts}.mp3`);
           
            res(result);
          } catch(e) {
            rej(e);
          }
        });
    });
  });
}

module.exports = {
  getInfo,
  getAudio,
  getVideo
}
