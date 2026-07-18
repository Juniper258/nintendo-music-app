# Nintendo Music Desktop

Desktop wrapper for [Nintendo Music](https://music.nintendo.com) using Electron with Widevine DRM support.

## Requirements

- Node.js 18+
- npm

## Installation

```bash
npm install
```

## Run in development

```bash
npm start
```

## Build for distribution

```bash
npm run dist
```

The installer will be generated in `dist/`.

## Structure

```
├── main.js          # Electron main process
├── preload.js       # Preload script (context bridge)
├── package.json     # Project configuration
└── nintendo_music.ico  # App icon
```

## License

MIT
