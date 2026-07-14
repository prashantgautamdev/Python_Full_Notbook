# Python-Notebook (48 Chapter Premium Python Course)

Premium notebook-style Python course website (Beginner → Advanced) with:

- 48 chapters (chapter-01.html → chapter-48.html)
- Handwritten/ruled notebook UI
- SEO (robots.txt, sitemap.xml, meta tags)
- Dark mode (localStorage + toggle)
- PWA (manifest.json + service-worker.js) for offline reading
- Search across chapters (instant client-side search)
- Accessible + responsive + print-friendly
- Navigation (sidebar, breadcrumbs, prev/next, scroll progress)

## Folder Structure

```text
Python-Notebook/
├── index.html
├── README.md
├── LICENSE
├── robots.txt
├── sitemap.xml
├── manifest.json
├── service-worker.js
├── .gitignore

├── assets/
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   ├── script.js
│   │   ├── search.js
│   │   ├── darkmode.js
│   │   └── navigation.js
│   ├── images/
│   └── fonts/
│
└── chapters/
    ├── chapter-01.html
    ├── chapter-02.html
    └── chapter-48.html
```

## How to Run Locally

Open `Python-Notebook/index.html` in a browser.

> For best PWA/service-worker behavior you can also use a local static server.

### Simple local server (optional)

If you have Python installed:

```bash
python -m http.server 8000
```
Then open:

- http://localhost:8000/Python-Notebook/

## GitHub Pages Deployment (Recommended)

1. Create a GitHub repository.
2. Upload/push everything inside `Python-Notebook/`.
3. Commit changes.
4. Go to **Settings → Pages**.
5. Source: **Deploy from a branch**.
6. Branch: `main`.
7. Folder: `/root` (for direct root deployment of these files).
8. Save.

After a few minutes, your site will be available at:

- `https://YOUR_USERNAME.github.io/YOUR_REPOSITORY_NAME/`

## Netlify Deployment (Optional)

1. Import the GitHub repository into Netlify.
2. Build command: *(none)*.
3. Publish directory: `Python-Notebook/`.

## Vercel Deployment (Optional)

1. Connect GitHub repository.
2. Framework preset: **Static**.
3. Output directory: `Python-Notebook/`.

## Contribution Guide

- Keep the chapter structure consistent.
- Prefer small updates.
- Test search, dark mode, offline mode, and print layout.

## License

MIT

