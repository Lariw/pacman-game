let mouseMoveTimeout;

document.addEventListener('mousemove', () => {
    console.log('.');
    document.body.style.cursor = 'auto';  // Przywróć kursor
    clearTimeout(mouseMoveTimeout);
    mouseMoveTimeout = setTimeout(() => {
        document.body.style.cursor = 'none';  // Ukryj kursor po 2 sekundach braku ruchu
    }, 2000);
});