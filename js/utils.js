// Shared Utility Functions

// Copy to Clipboard Function
function copyCA(elementId = 'ca-val') {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    const text = element.innerText.trim();
    navigator.clipboard.writeText(text).then(() => {
        const btn = event.target.closest('.copy-btn') || document.querySelector('.copy-btn');
        if (btn) {
            const originalText = btn.innerText;
            btn.innerText = 'COPIED!';
            showToast('Contract Address Copied! ✅');
            setTimeout(() => {
                btn.innerText = originalText;
            }, 2100);
        }
    }).catch(err => {
        console.error('Failed to copy:', err);
        showToast('Failed to copy!');
    });
}

// Toast Notification
function showToast(msg) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerText = msg;
    toast.setAttribute('role', 'status');
    toast.setAttribute('aria-live', 'polite');
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 1800);
}

// Set Active Navigation Link
function setActiveNav() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('nav a').forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Smooth scroll for anchor links
function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    setActiveNav();
    setupSmoothScroll();
    
    // Add keyboard support for copy button
    const caBox = document.querySelector('.ca-box');
    if (caBox) {
        caBox.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                copyCA();
            }
        });
    }
});
