// Відкриття та закриття модальних вікон
function openLogin() {
  document.getElementById("loginModal").hidden = false;
  document.getElementById("registerModal").hidden = true;
}

function closeLogin() {
  document.getElementById("loginModal").hidden = true;
}

function openRegister() {
  document.getElementById("registerModal").hidden = false;
  document.getElementById("loginModal").hidden = true;
}

function closeRegister() {
  document.getElementById("registerModal").hidden = true;
}

// Основна логіка 
document.addEventListener("DOMContentLoaded", function () {
  const registerModal = document.getElementById("registerModal");
  const form = registerModal.querySelector("form");
  const errorMessages = form.querySelectorAll(".error");

  const navButtons = document.querySelector("nav");
  const welcomeBlock = document.createElement("div");
  welcomeBlock.id = "welcome-block";
  welcomeBlock.style.textAlign = "center";
  welcomeBlock.style.margin = "1rem";
  welcomeBlock.style.display = "none";
  navButtons.parentNode.insertBefore(welcomeBlock, navButtons.nextSibling);

  // Функція відображення блоку привітання
  function showWelcome(user) {
    welcomeBlock.innerHTML = `
      <div style="background:#e0f2fe; padding:1.5rem 2rem; border-radius:1rem; max-width:400px; margin:auto;">
        <h2>Вітаю, ${user.name}!</h2>
        <p>Ви зареєстровані як <strong>${user.email}</strong></p>
        <button id="logoutBtn" style="
          background:#4a90e2; color:white; border:none; padding:0.6rem 1.2rem;
          border-radius:0.5rem; cursor:pointer;">Вийти</button>
      </div>
    `;
    welcomeBlock.style.display = "block";
    navButtons.style.display = "none";
    registerModal.hidden = true;

    document.getElementById("logoutBtn").addEventListener("click", function () {
      localStorage.removeItem("userData");
      welcomeBlock.style.display = "none";
      navButtons.style.display = "block";
    });
  }

  // Якщо користувач уже є в localStorage
  const savedUser = JSON.parse(localStorage.getItem("userData"));
  if (savedUser) {
    showWelcome(savedUser);
  }

  // Валідація під час введення
  [form.querySelector("#name"), form.querySelector("#email"), form.querySelector("#password")].forEach(input => {
    input.addEventListener("input", function () {
      const errorEl = input.nextElementSibling?.classList?.contains("error") ? input.nextElementSibling : null;
      let message = "";

      if (input.id === "name" && !input.value.trim()) message = "Ім’я не може бути порожнім";
      if (input.id === "email") {
        const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!pattern.test(input.value.trim())) message = "Введіть коректний email";
      }
      if (input.id === "password" && input.value.length < 6)
        message = "Пароль має містити мінімум 6 символів";

      if (errorEl) errorEl.textContent = message;
      input.classList.toggle("invalid", message !== "");
      input.classList.toggle("valid", message === "");
    });
  });

  // Сабміт форми 
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    errorMessages.forEach(e => e.textContent = "");

    const name = form.querySelector("#name").value.trim();
    const email = form.querySelector("#email").value.trim();
    const password = form.querySelector("#password").value.trim();
    const agree = form.querySelector("#agree").checked;

    let isValid = true;

    if (!name) {
      form.querySelector("#name + .error").textContent = "Введіть ім’я!";
      isValid = false;
    }
    if (!email) {
      form.querySelector("#email + .error").textContent = "Введіть email!";
      isValid = false;
    } else if (!email.includes("@")) {
      form.querySelector("#email + .error").textContent = "Некоректний email!";
      isValid = false;
    }
    if (password.length < 6) {
      form.querySelector("#password + .error").textContent = "Пароль має містити мінімум 6 символів!";
      isValid = false;
    }
    if (!agree) {
      alert("Потрібно погодитися з умовами використання!");
      isValid = false;
    }

    if (isValid) {
      const userData = { name, email };
      localStorage.setItem("userData", JSON.stringify(userData));
      showWelcome(userData);
      form.reset();
    }
  });
});