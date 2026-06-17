// ── Footer ──
/*
  Select the footer element from the page.
  We will dynamically add the current year so
  the copyright stays updated automatically.
*/

const footer = document.querySelector("footer");
const today = new Date();
const thisYear = today.getFullYear();
const copyright = document.createElement("p");
copyright.innerHTML = "© " + thisYear + " Abdi Omar — Built with HTML, CSS & JavaScript";
footer.appendChild(copyright);

// ── Hamburger Menu ──
/*
  Get references to the hamburger button
  and the mobile navigation menu.

*/
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

/*
  Select all sections that should animate
  into view as the user scrolls down the page.
   Add the "reveal" class to each selected element.

  The CSS associated with this class usually
  hides the element or positions it slightly
  off-screen before animation begins.
*/
const revealElements = document.querySelectorAll(".section-inner, .experience-item, .education-item, .skill-group");

revealElements.forEach(function (el) {
  el.classList.add("reveal");
});
/*
  Create an IntersectionObserver.

  This browser API watches elements and
  detects when they enter the viewport.
*/

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

/*
  Get the navigation bar element.
*/

// ── Navbar scroll effect ──
const navbar = document.getElementById("navbar");
window.addEventListener("scroll", function () {
  if (window.scrollY > 20) {
    navbar.style.boxShadow = "0 2px 20px rgba(0,0,0,0.08)";
  } else {
    navbar.style.boxShadow = "none";
  }
});

/*
  Get references to:

  1. The loading message shown while
     repositories are being fetched.

  2. The list where repository names
     will be displayed.
*/

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
  /*
      Handle any errors such as:
      - No internet connection
      - GitHub API unavailable
      - Invalid username
    */

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

  // ── Leave a Message ──
const messageForm = document.getElementById("message-form");
const messagesSection = document.getElementById("messages-section");
const messagesList = document.getElementById("messages-list");

messageForm.addEventListener("submit", function (event) {
  // Prevent the page from reloading on submit
  event.preventDefault();

  // Get values from each form field
  const name = document.getElementById("msg-name").value.trim();
  const email = document.getElementById("msg-email").value.trim();
  const text = document.getElementById("msg-text").value.trim();

  // Don't add empty messages
  if (!name || !email || !text) return;

  // Create the list item for this message
  const li = document.createElement("li");

  // Author name as a mailto: link
  const authorDiv = document.createElement("div");
  authorDiv.classList.add("msg-author");
  const authorLink = document.createElement("a");
  authorLink.href = "mailto:" + email;
  authorLink.textContent = name;
  authorDiv.appendChild(authorLink);

  // Message text
  const msgText = document.createElement("p");
  msgText.classList.add("msg-text");
  msgText.textContent = text;

  // Remove button
  const removeBtn = document.createElement("button");
  removeBtn.textContent = "Remove";
  removeBtn.classList.add("msg-remove");
  removeBtn.addEventListener("click", function () {
    li.remove();
    // Hide the messages section if no messages remain
    if (messagesList.children.length === 0) {
      messagesSection.style.display = "none";
    }
  });

  // Assemble and add the message item
  li.appendChild(authorDiv);
  li.appendChild(msgText);
  li.appendChild(removeBtn);
  messagesList.appendChild(li);

  // Show the messages section
  messagesSection.style.display = "block";

  // Clear the form fields
  messageForm.reset();
});