// ── Footer ──
const footer = document.querySelector("footer");
const today = new Date();
const thisYear = today.getFullYear();
const copyright = document.createElement("p");
copyright.innerHTML = "© " + thisYear + " Abdi Omar — Built with HTML, CSS & JavaScript";
footer.appendChild(copyright);

// ── Hamburger Menu ──
const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobile-menu");

hamburger.addEventListener("click", function () {
  mobileMenu.classList.toggle("open");
});

mobileMenu.querySelectorAll("a").forEach(function (link) {
  link.addEventListener("click", function () {
    mobileMenu.classList.remove("open");
  });
});

// ── Scroll Reveal Animation ──
const revealElements = document.querySelectorAll(".section-inner, .experience-item, .education-item, .skill-group");

revealElements.forEach(function (el) {
  el.classList.add("reveal");
});

const observer = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

revealElements.forEach(function (el) {
  observer.observe(el);
});

// ── Navbar scroll effect ──
const navbar = document.getElementById("navbar");
window.addEventListener("scroll", function () {
  if (window.scrollY > 20) {
    navbar.style.boxShadow = "0 2px 20px rgba(0,0,0,0.08)";
  } else {
    navbar.style.boxShadow = "none";
  }
});

// ── Fetch GitHub Repositories ──
const projectsLoading = document.getElementById("projects-loading");
const projectsList = document.getElementById("projects-list");

fetch("https://api.github.com/users/Abdi-M-Omar/repos")
  .then(function (response) {
    return response.json();
  })
  .then(function (repositories) {
    console.log(repositories);

    projectsLoading.style.display = "none";

    const projectSection = document.querySelector("#projects");
    const projectList = projectSection.querySelector("ul");

    for (let i = 0; i < repositories.length; i++) {
      const project = document.createElement("li");
      project.innerText = repositories[i].name;
      projectList.appendChild(project);
    }
  })
  .catch(function (error) {
    console.error("Error fetching repositories:", error);

    projectsLoading.style.display = "none";

    const projectSection = document.querySelector("#projects");
    const projectList = projectSection.querySelector("ul");

    const errorMsg = document.createElement("li");
    errorMsg.innerText = "Could not load projects. Please try again later.";
    errorMsg.classList.add("error");
    projectList.appendChild(errorMsg);
  });
