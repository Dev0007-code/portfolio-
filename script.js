// Theme Toggle
document.getElementById("themeToggle").addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

// Contact Form Submission
const contactForm = document.getElementById("contactForm");
contactForm.addEventListener("submit", (e) => {
  e.preventDefault();

  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let message = document.getElementById("message").value;
  let timeStamp = new Date().toLocaleString();

  let response = { name, email, message, timeStamp };

  // Get existing responses or empty array
  let responses = JSON.parse(localStorage.getItem("responses")) || [];
  responses.push(response);

  // Store back
  localStorage.setItem("responses", JSON.stringify(responses));

  alert("Your response has been submitted!");
  contactForm.reset();
});

// Admin Login
const loginForm = document.getElementById("loginForm");
const responsesSection = document.getElementById("responses");
const adminSection = document.getElementById("admin");

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  let username = document.getElementById("username").value;
  let password = document.getElementById("password").value;

  // Simple hardcoded login
  if (username === "admin" && password === "admin123") {
    adminSection.classList.add("hidden");
    responsesSection.classList.remove("hidden");
    loadResponses();
  } else {
    alert("Invalid credentials!");
  }
});

// Load Responses
function loadResponses() {
  let responses = JSON.parse(localStorage.getItem("responses")) || [];
  let responseList = document.getElementById("responseList");
  responseList.innerHTML = "";

  if (responses.length === 0) {
    responseList.innerHTML = "<p>No responses yet.</p>";
    return;
  }

  responses.forEach((res) => {
    let div = document.createElement("div");
    div.innerHTML = `<strong>${res.name}</strong> (${res.email}) <br> ${res.message} <br><small>${res.timeStamp}</small><hr>`;
    responseList.appendChild(div);
  });
}
