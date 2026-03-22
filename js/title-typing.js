// Handles typing animation for page titles: About, Projects, Skills, Contact
function typeTitle(element, text, speed = 70) {
    let i = 0;
    element.classList.add('typing-caret');
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        } else {
            // After typing, keep blinking underscore
            element.classList.remove('typing-caret');
            if (!element.querySelector('.typing-underscore')) {
                const underscore = document.createElement('span');
                underscore.className = 'typing-underscore';
                underscore.textContent = '_';
                element.appendChild(underscore);
            }
        }
    }
    type();
}
// Add CSS for blinking underscore (opacity blink)
const style = document.createElement('style');
style.textContent = `
.typing-underscore {
    display: inline-block;
    font-family: inherit;
    font-size: inherit;
    color: inherit;
    animation: blink-underscore 0.8s steps(1) infinite;
}
@keyframes blink-underscore {
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
}`;
document.head.appendChild(style);

document.addEventListener("DOMContentLoaded", () => {
    // About page
    const aboutTitle = document.querySelector(".about-left h1");
    if (aboutTitle && aboutTitle.textContent.trim() === "About") {
        aboutTitle.textContent = "";
        typeTitle(aboutTitle, "About");
    }
    // Projects page
    const projectsTitle = document.querySelector(".projects-title");
    if (projectsTitle && projectsTitle.textContent.trim() === "Projects") {
        projectsTitle.textContent = "";
        typeTitle(projectsTitle, "Projects");
    }
    // Skills page
    const skillsTitle = document.querySelector(".skills-title");
    if (skillsTitle && skillsTitle.textContent.trim() === "Skills") {
        skillsTitle.textContent = "";
        typeTitle(skillsTitle, "Skills");
    }
    // Contact page
    // Look for h1 with text 'Contact' inside .container
    const contactTitle = document.querySelector(".container h1");
    if (contactTitle && contactTitle.textContent.trim() === "Contact") {
        contactTitle.textContent = "";
        typeTitle(contactTitle, "Contact");
    }
});
