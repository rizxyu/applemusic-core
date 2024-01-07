# Apple Music-core
Downloading Music from Apple music!

## Bagaimana cara memakainya?
### Mendapatkan Track Info
```javascript
const { getInfo } = const("applemusic-core")

const yourlink = ""
const res = await getInfo(yourlink)

return res
```
* ini result yang akan keluar
```javascipt
{
  id: '1558533900',
  type: 'album',
  name: 'Whenever You Need Somebody',
  image: 'https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/ed/17/65/ed17656f-4c55-97c2-c93d-4b94f829799f/859381157694.jpg/500x500bb.jpg',
  artists: 'Rick Astley',
  tracks: [
    {
      id: '1558534271',
      name: 'Never Gonna Give You Up',
      artists: 'Rick Astley',
      duration_ms: 213573
    },
    {
      id: '1558534282',
      name: 'Whenever You Need Somebody',
      artists: 'Rick Astley',
      duration_ms: 233667
    },
    {
      id: '1558534287',
      name: 'Together Forever',
      artists: 'Rick Astley',
      duration_ms: 205533
    },
    {
      id: '1558534293',
      name: 'It Would Take a Strong Strong Man',
      artists: 'Rick Astley',
      duration_ms: 220827
    },
    {
      id: '1558534748',
      name: 'The Love Has Gone',
      artists: 'Rick Astley',
      duration_ms: 260160
    },
    {
      id: '1558534757',
      name: "Don't Say Goodbye",
      artists: 'Rick Astley',
      duration_ms: 249240
    },
    {
      id: '1558534767',
      name: 'Slipping Away',
      artists: 'Rick Astley',
      duration_ms: 232893
    },
    {
      id: '1558535083',
      name: 'No More Looking for Love',
      artists: 'Rick Astley',
      duration_ms: 192800
    },
    {
      id: '1558535097',
      name: 'You Move Me',
      artists: 'Rick Astley',
      duration_ms: 222533
    },
    {
      id: '1558535320',
      name: 'When I Fall in Love',
      artists: 'Rick Astley',
      duration_ms: 183027
    }
  ],
  gid: 378203
}
```
