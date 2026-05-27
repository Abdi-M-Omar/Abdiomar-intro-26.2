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
const messageForm = document.querySelector('form[name="leave_message"]');
const messageSection = document.querySelector("#messages");
const messageList = messageSection.querySelector("ul");

messageSection.style.display = "none";

messageForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const usersName = event.target.usersName.value;
    const usersEmail = event.target.usersEmail.value;
    const usersMessage = event.target.usersMessage.value;

    const newMessage = document.createElement("li");

    newMessage.innerHTML = `
        <a href="mailto:${usersEmail}">${usersName}</a>
        <span> wrote: ${usersMessage}</span>
    `;

    const editButton = document.createElement("button");
    editButton.innerText = "edit";
    editButton.type = "button";

    editButton.addEventListener("click", function () {
        const messageSpan = newMessage.querySelector("span");
        const newText = prompt("Edit your message:");

        if (newText !== null && newText.trim() !== "") {
            messageSpan.innerText = " wrote: " + newText;
        }
    });

    const removeButton = document.createElement("button");
    removeButton.innerText = "remove";
    removeButton.type = "button";

    removeButton.addEventListener("click", function () {
        newMessage.remove();

        if (messageList.children.length === 0) {
            messageSection.style.display = "none";
        }
    });

    newMessage.appendChild(editButton);
    newMessage.appendChild(removeButton);

    messageList.appendChild(newMessage);

    messageSection.style.display = "block";

    messageForm.reset();
});