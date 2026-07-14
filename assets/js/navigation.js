(function () {
    function setActiveChapter() {
        const path = location.pathname.split('/');
        const file = path[path.length - 1] || '';
        const links = document.querySelectorAll('[data-chapter-link]');
        links.forEach(a => {
            if (a.getAttribute('data-chapter-link') === file) {
                a.style.color = 'var(--brand)';
            }
        });
    }

    function wirePrevNext() {
        const file = (location.pathname.split('/').pop() || '').toLowerCase();
        const m = file.match(/chapter-(\d{2})\.html/);
        const prev = document.querySelector('[data-prev]');
        const next = document.querySelector('[data-next]');
        if (!m) return;
        const n = parseInt(m[1], 10);
        if (prev) {
            if (n > 1) prev.href = `chapters/chapter-${String(n - 1).padStart(2, '0')}.html`;
            else prev.style.visibility = 'hidden';
        }
        if (next) {
            if (n < 48) next.href = `chapters/chapter-${String(n + 1).padStart(2, '0')}.html`;
            else next.style.visibility = 'hidden';
        }
    }

    window.addEventListener('DOMContentLoaded', () => {
        setActiveChapter();
        wirePrevNext();
    });
})();

