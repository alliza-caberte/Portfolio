// Handles the loading screen typing animation and removal
const loadingText = "Initializing Portfolio...";
const loadingElement = document.getElementById("loading-text");
let charIndex = 0;

function typeLoadingText() {
    if (charIndex < loadingText.length) {
        loadingElement.textContent += loadingText.charAt(charIndex);
        charIndex++;
        setTimeout(typeLoadingText, 80); // typing speed
    }
}

document.addEventListener("DOMContentLoaded", () => {
    typeLoadingText();
    setTimeout(() => {
        document.getElementById("loading-overlay").classList.add("hide");
        setTimeout(() => {
            document.getElementById("loading-overlay").style.display = "none";
            document.body.style.overflow = "";
        }, 600);
    }, 6000); // Show for 6 seconds
});
