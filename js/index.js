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
// Fetch GitHub repositories
fetch("https://api.github.com/users/Abdi-M-Omar/repos")
  .then(function(response) {
    return response.json();
  })
  .then(function(repositories) {
    console.log(repositories);

    const projectSection = document.querySelector("#Projects");
    const projectList = projectSection.querySelector("ul");

    for (let i = 0; i < repositories.length; i++) {
      const project = document.createElement("li");
      project.innerText = repositories[i].name;
      projectList.appendChild(project);
    }
  })
  .catch(function(error) {
    console.error("Error fetching repositories:", error);

    const projectSection = document.querySelector("#Projects");
    const projectList = projectSection.querySelector("ul");

    const errorMsg = document.createElement("li");
    errorMsg.innerText = "Could not load projects. Please try again later.";
    projectList.appendChild(errorMsg);
  });