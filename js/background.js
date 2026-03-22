(function() {
    const bgDiv = document.getElementById('background-animation');
    // Remove any existing children
    while (bgDiv.firstChild) bgDiv.removeChild(bgDiv.firstChild);

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setClearColor(0x000000, 1);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.display = 'block';
    bgDiv.appendChild(renderer.domElement);

    // Shader material for swirling purple effect
    const uniforms = {
        u_time: { value: 0.0 },
        u_resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
        u_mouse: { value: new THREE.Vector2(-10, -10) } // offscreen by default
    };

    const vertexShader = `
        varying vec2 vUv;
        void main() {
            vUv = uv;
            gl_Position = vec4(position, 1.0);
        }
    `;


    const fragmentShader = `
        uniform float u_time;
        uniform vec2 u_resolution;
        uniform vec2 u_mouse;
        varying vec2 vUv;

        // Distance from a point to a parametric curve (sine-based)
        float lineDist(vec2 uv, float phase, float thickness, float speed, float freq, float amp, float offset, out float xLine) {
            // Portrait: lines curve vertically, xLine is the x position of the line at this y
            float t = uv.y + phase + offset;
            float xLineRaw = 0.18 * sin(t * freq + u_time * speed + offset) * amp;
            if (uv.x < 0.5) {
                xLine = xLineRaw;
            } else {
                xLine = -xLineRaw; // Mirror for right side
            }
            // Place lines on left and right sides
            float xPos = (uv.x < 0.5) ? (0.18 + xLine) : (0.82 + xLine);
            float d = abs(uv.x - xPos);
            return smoothstep(thickness, 0.0, d);
        }

        void main() {
            vec2 uv = vUv;
            float lines = 0.0;
            float maxPulse = 0.0;
            int numLines = 4;
            for (int i = 0; i < 4; i++) {
                float phase = float(i) * 0.7;
                float thickness = 0.0015 + 0.0005 * float(i); // sharper lines
                float speed = 0.18 + 0.09 * float(i);
                float freq = 2.0 + float(i) * 0.7;
                float amp = 1.0 - float(i) * 0.13;
                float offset = float(i) * 1.2;
                float xLine;
                float l = lineDist(uv, phase, thickness, speed, freq, amp, offset, xLine);
                lines += l;

                // Cursor pulse effect
                vec2 mouse = u_mouse / u_resolution;
                float distToLine = length(vec2(xLine, uv.y) - vec2(mouse.x - ((uv.x < 0.5) ? 0.18 : 0.82), mouse.y));
                float pulse = smoothstep(0.08, 0.01, distToLine) * l;
                maxPulse = max(maxPulse, pulse);
            }

            vec3 baseColor = vec3(0.8, 0.5, 1.0);
            vec3 pulseColor = vec3(1.0, 0.9, 1.0);
            vec3 bg = vec3(0.0);

            vec3 color = bg;
            color = mix(color, baseColor, lines);
            color = mix(color, pulseColor, maxPulse);

            color = pow(color, vec3(0.8));

            gl_FragColor = vec4(color, 1.0);
        }
    `;

    const material = new THREE.ShaderMaterial({
        uniforms,
        vertexShader,
        fragmentShader
    });

    const geometry = new THREE.PlaneGeometry(2, 2);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    function animate() {
        uniforms.u_time.value = performance.now() * 0.001;
        renderer.render(scene, camera);
        requestAnimationFrame(animate);
    }
    animate();

    // Mouse interaction
    window.addEventListener('mousemove', (e) => {
        const rect = renderer.domElement.getBoundingClientRect();
        uniforms.u_mouse.value.x = e.clientX - rect.left;
        uniforms.u_mouse.value.y = rect.height - (e.clientY - rect.top); // flip Y for shader
    });
    window.addEventListener('mouseleave', () => {
        uniforms.u_mouse.value.x = -10;
        uniforms.u_mouse.value.y = -10;
    });

    // Responsive resize
    window.addEventListener('resize', () => {
        renderer.setSize(window.innerWidth, window.innerHeight);
        uniforms.u_resolution.value.set(window.innerWidth, window.innerHeight);
    });
})();
