# Nintendo Music Desktop

Desktop wrapper for [Nintendo Music](https://music.nintendo.com) using Electron with Widevine DRM support.

## Requisitos

- Node.js 18+
- npm

## Instalación

```bash
npm install
```

## Ejecutar en desarrollo

```bash
npm start
```

## Build para distribución

```bash
npm run dist
```

El instalador se generará en `dist/`.

## Estructura

```
├── main.js          # Proceso principal de Electron
├── preload.js       # Script de preload (context bridge)
├── package.json     # Configuración del proyecto
└── nintendo_music.ico  # Icono de la aplicación
```

## Licencia

MIT
