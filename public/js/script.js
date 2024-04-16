const backArrowEl = document.querySelector('.back-arrow');

backArrowEl.addEventListener('click', () => {
    window.history.back();
});