# Apple Music-core
Download music from Apple Music

# Installation
```bash
npm i applemusic-core
```

# Usage
## Search by song title
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

## Downloading audio
```javascript
const { download } = require("applemusic-core");

(async function(url) {
  const results = await download(query);
})("https://music.apple.com/id/album/never-gonna-give-you-up/1558533900?i=1558534271");
```

Result scheme:
```javascript
{
  filename: String,
  mimetype: String,
  data: Buffer
}
```


License
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
