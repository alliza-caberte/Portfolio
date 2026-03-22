
(function () {
    const container = document.getElementById('skills-sphere-bg');
    if (!container) return;

    // Remove any previous canvas
    while (container.firstChild) container.removeChild(container.firstChild);

    // Create and style canvas
    const canvas = document.createElement('canvas');
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '1';
    container.appendChild(canvas);

    function resizeCanvas() {
        canvas.width = container.offsetWidth;
        canvas.height = container.offsetHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Animation parameters
    const points = 180;

    function drawNeonCircle(ctx, time) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.save();
        ctx.globalCompositeOperation = 'lighter';
        // Draw wavy neon edge (mirrored to left)
        const baseRadius = Math.min(canvas.width, canvas.height) * 0.45;
        // Center is off the left and up (mirrored from about)
        const centerX = -baseRadius * 0.15;
        const centerY = -baseRadius * 0.10;
        ctx.beginPath();
        for (let i = 0; i <= points; i++) {
            const theta = (i / points) * Math.PI * 2;
            const wave = 12 * Math.sin(theta * 8 + time * 2.2);
            const r = baseRadius + wave;
            const x = centerX + r * Math.cos(theta);
            const y = centerY + r * Math.sin(theta);
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        }
        ctx.shadowColor = '#ff00ff';
        ctx.shadowBlur = 32;
        ctx.strokeStyle = '#ff00ff';
        ctx.lineWidth = 6;
        ctx.stroke();

        // Inner glow
        ctx.beginPath();
        ctx.arc(centerX, centerY, baseRadius * 0.92, 0, Math.PI * 2);
        ctx.shadowColor = '#ff66ff';
        ctx.shadowBlur = 24;
        ctx.strokeStyle = 'rgba(255,0,255,0.25)';
        ctx.lineWidth = 18;
        ctx.stroke();

        ctx.restore();
    }

    function animate() {
        const ctx = canvas.getContext('2d');
        const time = performance.now() * 0.001;
        drawNeonCircle(ctx, time);
        requestAnimationFrame(animate);
    }
    animate();
})();

