const axios = require("axios");
const cheerio = require("cheerio");
const yts = require("yt-search");
const { getAudio } = require("./ytdl");
/**
 * Extracts metadata and track details from an Apple Music playlist URL.
 * @param {string} url - The Apple Music playlist URL.
 * @returns {Promise<string|null>} JSON string containing playlist metadata and tracks.
 */

async function albumExt(url) {
    try {
        const validateUrl = new URL(url);

        const allowedHosts = ["music.apple.com", "apple.com"];

        if (!allowedHosts.includes(validateUrl.hostname)) {
            console.log("Invalid URL: Not an Apple Music link.");
            return null;
        }

        const { data } = await axios.get(url, { 
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36 Edg/134.0.0.0"
            }
        });

        const $ = cheerio.load(data);
        const scriptContent = $('script#serialized-server-data').html();

        if (!scriptContent) {
            console.log("JSON data not found.");
            return null;
        }

        const jsonData = JSON.parse(scriptContent);
        const pageData = jsonData[0]?.data;

        if (!pageData) {
            console.log("Invalid data structure.");
            return null;
        }

        const header = pageData.sections.find(sec => sec.id.includes("playlist-detail-header-section"));
        if (!header) {
            console.log("Playlist header not found.");
            return null;
        }

        // Extracting metadata
        const playlistMeta = {
            title: header.items[0]?.title ?? "Unknown",
            creator: header.items[0]?.subtitleLinks?.[0]?.title ?? "Unknown",
            url: header.items[0]?.contentDescriptor?.url ?? url,
            thumbnail: header.items[0]?.artwork?.dictionary?.url?.replace("{w}", "500").replace("{h}", "500").replace("{f}", "jpg") ?? null,
            songCount: header.items[0]?.trackCount ?? 0,
            lastUpdated: header.items[0]?.quaternaryTitle ?? "Unknown",
        };

        // Extracting songs
        const trackSection = pageData.sections.find(sec => sec.id.includes("track-list"));
        if (!trackSection) {
            console.log("Track list not found.");
            return null;
        }

        const songs = trackSection.items.map((track, index) => ({
            index: index + 1,
            title: track.title ?? "Unknown",
            artist: track.subtitleLinks?.[0]?.title ?? "Unknown",
            url: track.contentDescriptor?.url ?? "#",
            duration: track.duration 
                ? `${Math.floor(track.duration / 60000)} min ${Math.floor((track.duration % 60000) / 1000)} sec`
                : "Unknown"
        }));

        const result = JSON.stringify({ metadata: playlistMeta, songs: songs }, null, 2);
        return result;
    } catch (error) {
        console.error("An error occurred:", error.message);
        return null;
    }
}


async function audioBuffer(title, url) {
  try {
        const searchResults = await yts(`${song.title} - ${song.artists}`);

        
            if (!searchResults.videos.length) {
              throw new Error('Video tidak ditemukan di YouTube');
            } else console.log(`Found ${song.title} -`,"fetching data");
        const videoUrl = searchResults.videos[0].url;
        const audio = await getAudio(videoUrl);
        if (!audio) throw new Error("Gagal mendapatkan audio dari YouTube");
        return audio;
  } catch (e) {
    console.error("An error occurred:", error.message);
  };
};
/**
 * Extracts metadata from an Apple Music song URL.
 * @param {string} url - The Apple Music song URL.
 * @returns {Promise<void>}
 */
async function songExt(url) {
    try {
        const validateUrl = new URL(url);
        const allowedHosts = ["music.apple.com", "apple.com"];

        if (!allowedHosts.includes(validateUrl.hostname)) {
            console.log("Invalid URL: Not an Apple Music link.");
            return;
        }

        const { data } = await axios.get(url, { 
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36 Edg/134.0.0.0"
            }
        });

        const $ = cheerio.load(data);
        const scriptContent = $('script#serialized-server-data').html();

        if (!scriptContent) {
            console.log("JSON data not found.");
            return;
        }

        const jsonData = JSON.parse(scriptContent);
        const pageData = jsonData[0]?.data;

        const songDetails = pageData.sections.find(sec => sec.id.includes("songDetail"));
        if (!songDetails) {
            console.log("Song details not found.");
            return;
        }

        const song = songDetails.items[0];

        const searchResults = await yts(`${song.title} - ${song.artists}`);

        console.log(`Found ${song.title}`);
            if (!searchResults.videos.length) throw new Error('Video tidak ditemukan di YouTube');
        
        const videoUrl = searchResults.videos[0].url;
        const audio = await getAudio(videoUrl);
        if (!audio) throw new Error("Gagal mendapatkan audio dari YouTube");


        const result = {
            title: song.title ?? "Unknown",
            thumbnail: song.artwork.dictionary.url.replace("{w}", "3000").replace("{h}", "3000").replace("{f}", "jpg") ?? null,
            artist: song.artists ?? "Unknown",
            url: song.contentDescriptor?.url ?? "#",
            releaseDate: song.releaseDate ?? "Unknown",
            buffer: audio,
        };

        return result
    } catch (error) {
        console.error("An error occurred:", error.message);
    };
};

// Example usage:
// albumExt("https://music.apple.com/us/playlist/chill-create-sessions/pl.u-WabZvAYIvvr5jx");
//songExt("https://music.apple.com/us/song/luminary-slowed-down/1724103840");

module.exports = {
  audioBuffer,
  albumExt,
  songExt
};
