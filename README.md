# Banana Holdings

Personlig trading-terminal med 19 animerte aper. Bygget med Phaser 3 + vanilla
JS + GitHub Pages + PWA. Kun for William Olstad.

## Status

**Fase 1 spike** (juni 2026): Wolfs intro-sekvens
- SceneTaxi → SceneLobby → SceneElevator → SceneChaos → SceneOffice

## Stack

- Phaser 3 (via CDN) — sprite, scene, tween, audio
- Vanilla CSS — VT323-font + Wall Street 1987-palett
- GitHub Pages — auto-deploy ved push
- PWA — installerbar på Mac Dock

## Lokal kjøring

```
cd ~/Desktop/banana-holdings
python3 -m http.server 8000
open http://localhost:8000
```

## Live

https://wilolstad.github.io/banana-holdings/
