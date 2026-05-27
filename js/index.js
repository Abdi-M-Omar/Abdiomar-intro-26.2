// Create Footer
const footer = document.createElement("footer");
// Add footer to body
document.body.appendChild(footer);
// Get current year
const today = new Date();
const thisYear = today.getFullYear();

// Select footer
const footerElement = document.querySelector("footer");

// Create paragraph
const copyright = document.createElement("p");

// Add text
copyright.innerHTML = "© Abdi Omar " + thisYear;

// Add paragraph to footer
footerElement.appendChild(copyright);
// Skills array
const skills = [
    "JavaScript",
    "HTML",
    "CSS",
    "React",
    "GitHub"
];

const skillsSection = document.querySelector("#skills");

const skillsList = skillsSection.querySelector("ul");

for (let i = 0; i < skills.length; i++) {

    const skill = document.createElement("li");

    skill.innerText = skills[i];

    skillsList.appendChild(skill);
}