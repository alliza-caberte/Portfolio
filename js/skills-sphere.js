(function () {
    // Create and style a full-screen fixed canvas as background
    const canvas = document.createElement('canvas');
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100vw';
    canvas.style.height = '100vh';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '0';
    canvas.style.display = 'block';
    // Append canvas to #sphere-bg if it exists, else fallback to body
    const sphereBg = document.getElementById('sphere-bg');
    if (sphereBg) {
        sphereBg.appendChild(canvas);
    } else {
        document.body.prepend(canvas);
    }

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Animation parameters
    const points = 180;

    function drawNeonCircle(ctx, time) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.save();
        ctx.globalCompositeOperation = 'lighter';
        const baseRadius = Math.min(canvas.width, canvas.height) * 0.38;
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

