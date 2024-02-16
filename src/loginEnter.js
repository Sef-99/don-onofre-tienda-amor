const form = document.querySelector("form");
const button = document.getElementById("loginBtn");

form.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    button.click();
  }
});
