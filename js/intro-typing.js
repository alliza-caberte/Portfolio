// Handles the typing animation for intro text after loading
function typeText(element, text, speed = 60, callback) {
    let i = 0;
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        } else if (callback) {
            callback();
        }
    }
    type();
}

document.addEventListener("DOMContentLoaded", () => {
    // Wait for loading overlay to finish hiding
    const loadingOverlay = document.getElementById("loading-overlay");
    if (!loadingOverlay) return;
    const observer = new MutationObserver(() => {
        if (loadingOverlay.classList.contains("hide")) {
            // Start typing animation for intro immediately as overlay starts fading
            const hello = document.querySelector(".hello");
            const name = document.querySelector(".name");
            const role = document.querySelector(".role");
            if (hello && name && role) {
                hello.textContent = "";
                name.textContent = "";
                role.textContent = "";
                const links = document.querySelector('.links');
                if (links) links.classList.add('hidden');
                typeText(hello, "Hello, I am", 60, () => {
                    setTimeout(() => {
                        typeText(name, "Alliza Caberte", 60, () => {
                            setTimeout(() => {
                                typeText(role, "Frontend Developer", 60, () => {
                                    if (links) {
                                        links.classList.remove('hidden');
                                    }
                                });
                            }, 250);
                        });
                    }, 250);
                });
            }
            observer.disconnect();
        }
    });
    observer.observe(loadingOverlay, { attributes: true, attributeFilter: ["class"] });
});
