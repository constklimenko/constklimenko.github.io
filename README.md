# Константин Клименко, сайт-визитка

Статическая страница на GitHub Pages: `index.html`, `assets/css/style.css`,
`assets/js/app.js`. Без сборки, фреймворков и внешних запросов.

## Структура

- `index.html`: разметка и контент
- `assets/css/style.css`: стили, шрифты, адаптив
- `assets/js/app.js`: меню, фильтры кейсов, лайтбокс, анимации
- `assets/img/`: скриншоты проектов, схемы, сертификаты и фото
- `assets/fonts/`: IBM Plex Sans и IBM Plex Mono (OFL), локально
- `tools/og.html`: исходник для `assets/img/og.png` (1200×630)
- `robots.txt`, `sitemap.xml`, `.nojekyll`

## Локальный просмотр

```bash
python3 -m http.server 8099
```

Открыть `http://127.0.0.1:8099/`.

## Старое (не используется)

`src/`, `gulpfile.js`, `package.json`, `bundle.min.css`, `l3-bundle.min.css`
и папки демо (`sauna/`, `center_lp/`, `aramzo/`, `zr-podpiska/`, `portfolio/`,
`seo/`, `sandbox/`) остались от версии 2020 года. Демо доступны по прямым
ссылкам из блока «Архив» и из старых URL.

Важно: `gulp` из этого репозитория по-прежнему собирает `index.html` из
`src/index.pug` и перезапишет новую страницу. Не запускайте старую сборку.

## Обновление OG-картинки

Открыть `/tools/og.html` на локальном сервере при ширине 1200×630 и сохранить
скриншот в `assets/img/og.png`.
