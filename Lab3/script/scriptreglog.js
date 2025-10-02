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
