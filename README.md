# Apple Music-core
![am](https://upload.wikimedia.org/wikipedia/commons/5/5f/Apple_Music_icon.svg)
<p align="center">
  <a aria-label="NPM Version" 
aria-label="NPM Version" href="https://www.npmjs.com/package/applemusic-core">
    <img alt="" src="https://img.shields.io/npm/v/applemusic-core.svg?label=NPM&logo=npm&style=for-the-badge&color=F2984A&logoColor=white">
  </a>
  <a aria-label="NPM Download Count" href="https://www.npmjs.com/package/applemusic-core">
    <img alt="" src="https://img.shields.io/npm/dt/applemusic-core?label=Downloads&style=for-the-badge&color=D2667B">
  </a>
  <a aria-label="bard-ai Size" href="https://www.npmjs.com/package/applemusic-core">
    <img alt="" src="https://img.shields.io/bundlephobia/minzip/applemusic-core?style=for-the-badge&color=8B77CD">
  </a>
  <a aria-label="Join the community on Whatsapp" href="https://chat.whatsapp.com/JQfqvq7vlvvLM3Pj3w3nnQ">
    <img alt="" src="https://img.shields.io/badge/Whatsapp-339AE0?style=for-the-badge&logo=Whatsapp&logoColor=white&label=Community">
  </a>
</p>
<p align="center">
<a href="https://github.com/Rizxyu/followers"><img title="Followers" src="https://img.shields.io/github/followers/Rizxyu?style=flat-square"></a>
<a href="https://github.com/Rizxyu/applemusic-core/stargazers"><img title="Stars" src="https://img.shields.io/github/stars/Rizxyu/applemusic-core?style=flat-square"></a>
<a href="https://github.com/Rizxyu/applemusic-core/network/members"><img title="Forks" src="https://img.shields.io/github/forks/Rizxyu/applemusic-core?style=flat-square"></a>
<a href="https://github.com/Rizxyu/RIXLE-BOT/watchers"><img title="watchers" src="https://img.shields.io/github/watchers/Rizxyu/applemusic-core?style=flat-square"></a>
</p>
<br></br>
<b>Download music from Apple Music<b>

>[!WARNING]\
> This code is open source, do not sell this script! because it's free!

## Installation
```bash
npm i applemusic-core
```
## Usage
### Search by "song title"
```javascript
const { search } = require("applemusic-core");

(async function(query) {
  const results = await search(query);
})("Never gonna give you up");
```

Result scheme:
```javascript
[
  {
    url: String,
    type: String,
    artists: String,
    title: String,
    cover: String
  }
]
```

### Downloading "audio"
```javascript
const { download, downloadAlbums } = require("applemusic-core");

//song
(async function(url) {
  const results = await download(url);
})("https://music.apple.com/id/album/never-gonna-give-you-up/1558533900?i=1558534271");

//album
(async function(url, limit) {
  const results = await downloadAlbums(url, limit);
})("https://music.apple.com/id/album/never-gonna-give-you-up/1558533900", 3);
```

Result scheme:
```javascript
// Download
{
  filename: string;
  image: string;
  title: string;
  mimetype: string;
  data: Buffer;
}

// Download Albums
{
  artists: string,
  image: string,
  audios: [
    {
      image: string,
      title: string,
      data: buffer
    }
  ]
}
```
## Filter Searching

```javascript
const { search } = require("applemusic-core");

async function filtering(text) {
const res = await search(text)
const filter = res.filter(v => v.type === "Song")//change song, playlist or album
return filter
}

filtering("royalty")
```

## Version
<details><summary>1.0.0</summary>
<b>Changelog:</b>
  
- [x] Search
- [x] Downloading Song
</details>
<details><summary>1.0.5-beta</summary>
<b>Changelog:</b>
  
- [x] Support Download Album/Playlist
</details>

#License
-------

Copyright (c) 2024 Wizz Team

Permission is hereby granted, free of charge, to any person obtaining a copy 
of this software and associated documentation files (the "Software"), to deal 
in the Software without restriction, including without limitation the rights 
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell 
copies of the Software, and to permit persons to whom the Software is 
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in 
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR 
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, 
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE 
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER 
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, 
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN 
THE SOFTWARE.
