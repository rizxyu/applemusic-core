/*DONT SELL THIS CODE BASTARD!
sialan lu anak jb awas aja kalo dijual
tinggal pake module gw napa!
Credit
api fabdl
-WIZZ TEAM (RIZXYU, RESTU, FAUZAN)
*/
import axios from "axios";

// info code
const getInfo = async (query: string): Promise<string> => {
  try {
    const { data } = await axios.get(`https://api.fabdl.com/apple-music/get?url=${encodeURIComponent(query)}`);
    return data; // Return the download URL
  } catch (error) {
    throw new Error("Applemusic Function Error");
  }
};

// download code
const download = async (query: string): Promise<string> => {
  try {
    const { data: { result: { id, gid } } } = await axios.get(`https://api.fabdl.com/apple-music/get?url=${encodeURIComponent(query)}`);
    const { data: { result: { tid } } } = await axios.get(`https://api.fabdl.com/apple-music/mp3-convert-task/${gid}/${id}`);
    const url = `https://api.fabdl.com/apple-music/download-mp3/${tid}`;
    return url; // Return the download URL
  } catch (error) {
    throw new Error("Applemusic Function Error");
  }
};

export default { getInfo, download};
