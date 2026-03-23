// Fairy Dust Cursor Trail Effect
// Adds a magical trail to the cursor

document.addEventListener('mousemove', function(e) {
    createFairyDust(e.clientX, e.clientY);
});

function createFairyDust(x, y) {
    const particle = document.createElement('span');
    particle.className = 'fairy-dust';
    // Random pastel color
    const colors = [
        '#FFD1FA', '#B5F3FF', '#FFFACD', '#E0BBFF', '#C1FFD7', '#FFB3BA', '#FFDFBA', '#FFFFBA', '#BAFFC9', '#BAE1FF'
    ];
    particle.style.background = colors[Math.floor(Math.random() * colors.length)];
    particle.style.left = x + 'px';
    particle.style.top = y + 'px';
    particle.style.position = 'fixed';
    particle.style.pointerEvents = 'none';
    particle.style.zIndex = 9999;
    document.body.appendChild(particle);

    // Animate and remove
    setTimeout(() => {
        particle.style.opacity = '0';
        particle.style.transform = `translateY(-10px) scale(0.7)`;
    }, 10);
    setTimeout(() => {
        particle.remove();
    }, 700);
}
