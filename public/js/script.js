const newProfileWindowEl = document.querySelector('.new-profile-pic');
const uploadProfileEl = document.querySelector('.upload-profile');

uploadProfileEl.addEventListener('click', (event) => {
    event.stopPropagation();
    newProfileWindowEl.style.display = 'block';
    const closeWindowListener = (e) => {
        if (!newProfileWindowEl.contains(e.target) && e.target !== uploadProfileEl) {
            newProfileWindowEl.style.display = 'none';
            document.removeEventListener('click', closeWindowListener);
        }
    };
    setTimeout(() => {
        newProfileWindowEl.style.display = 'none';
        document.removeEventListener('click', closeWindowListener);
    }, 60000);
    document.addEventListener('click', closeWindowListener);
});
newProfileWindowEl.addEventListener('click', (event) => {
    event.stopPropagation();
});
