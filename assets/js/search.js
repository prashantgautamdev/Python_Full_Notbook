(function () {
    function normalize(s) {
        return (s || '')
            .toLowerCase()
            .replace(/[^a-z0-9\s-]/g, ' ')
            .replace(/\s+/g, ' ')
            .trim();
    }

    function highlight(el, terms) {
        // Simple highlight: replace text nodes in visible results container only
        const container = el;
        const text = container.innerHTML;
        // Avoid heavy regex; just highlight using mark around raw occurrences in plain innerText.
        // We'll do a safer approach: for each term, wrap in mark using regex on HTML-escaped text.
        let html = container.innerHTML;
        terms.forEach(t => {
            if (!t) return;
            const re = new RegExp(t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
            html = html.replace(re, (m) => `<mark class="hl">${m}</mark>`);
        });
        container.innerHTML = html;
    }

    function buildIndex() {
        // Build index by reading chapter text from a lightweight set:
        // We rely on chapter pages having an element [data-chapter-text] containing searchable content.
        // Search will still work even if only the current chapter is loaded by loading all chapters via fetch.
        const input = document.getElementById('searchInput');
        const results = document.getElementById('searchResults');
        const chapters = [];
        for (let i = 1; i <= 48; i++) {
            chapters.push(`chapters/chapter-${String(i).padStart(2, '0')}.html`);
        }

        async function fetchChapter(url) {
            const res = await fetch(url, { cache: 'force-cache' });
            if (!res.ok) return null;
            const text = await res.text();
            // Extract searchable text
            const m = text.match(/data-chapter-text"[^>]*>([\s\S]*?)<\/div>/i);
            let snippet = '';
            if (m && m[1]) {
                snippet = m[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
            } else {
                snippet = text.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 600);
            }
            return { url, snippet, full: text };
        }

        // Lazy indexing on first search
        let index = null;
        async function ensureIndex() {
            if (index) return index;
            index = [];
            // parallel fetch with a small limit
            const limit = 6;
            let cursor = 0;
            const workers = Array.from({ length: limit }, async () => {
                while (cursor < chapters.length) {
                    const idx = cursor++;
                    const item = await fetchChapter(chapters[idx]);
                    if (item) index[idx] = item;
                }
            });
            await Promise.all(workers);
            // compact
            index = index.filter(Boolean);
            return index;
        }

        function renderEmpty() {
            results.innerHTML = '';
            results.classList.add('empty');
        }

        input?.addEventListener('input', async () => {
            const q = normalize(input.value);
            if (!q) {
                renderEmpty();
                return;
            }
            const terms = q.split(' ').filter(Boolean);
            const idx = await ensureIndex();
            const scored = idx.map(item => {
                const sn = normalize(item.snippet);
                let score = 0;
                terms.forEach(t => {
                    if (sn.includes(t)) score += 5;
                    // partial
                    if (sn.replace(/\s+/g, ' ').includes(t.slice(0, Math.min(5, t.length)))) score += 1;
                });
                return { item, score };
            }).sort((a, b) => b.score - a.score).filter(x => x.score > 0).slice(0, 8);

            if (!scored.length) {
                results.innerHTML = '<div class="subtle">No matches yet. Try a different keyword.</div>';
                return;
            }

            results.innerHTML = scored.map(s => {
                const title = s.item.url.split('/').pop().replace('.html', '');
                const snippet = s.item.snippet.slice(0, 160);
                return `
          <a class="result" href="${s.item.url}" data-result-snippet>
            <div class="res-title">${title}</div>
            <div class="res-snippet">${snippet}...</div>
          </a>
        `;
            }).join('');

            results.querySelectorAll('[data-result-snippet]').forEach(r => {
                // highlight in snippet only
                const sn = r.querySelector('.res-snippet');
                if (sn) highlight(sn, terms.slice(0, 6));
            });
        });
    }

    window.addEventListener('DOMContentLoaded', buildIndex);
})();

