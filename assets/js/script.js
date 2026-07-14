(function () {
    // Scroll progress bar
    const bar = document.querySelector('.progress > div');
    function update() {
        if (!bar) return;
        const doc = document.documentElement;
        const scroll = doc.scrollTop;
        const height = doc.scrollHeight - doc.clientHeight;
        const pct = height > 0 ? (scroll / height) * 100 : 0;
        bar.style.width = pct.toFixed(2) + '%';
    }
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('DOMContentLoaded', update);

    // Offline support
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('service-worker.js').catch(() => { });
    }

    // Print / Save helpers
    const btnPrint = document.getElementById('printChapter');
    if (btnPrint) {
        btnPrint.addEventListener('click', () => window.print());
    }

    // Download notes as HTML
    const btnDownload = document.getElementById('downloadNotes');
    if (btnDownload) {
        btnDownload.addEventListener('click', () => {
            const html = document.documentElement.outerHTML;
            const blob = new Blob([html], { type: 'text/html' });
            const a = document.createElement('a');
            a.href = URL.createObjectURL(blob);
            const file = (location.pathname.split('/').pop() || 'notes') + '.html';
            a.download = file;
            a.click();
            setTimeout(() => URL.revokeObjectURL(a.href), 2000);
        });
    }
})();

