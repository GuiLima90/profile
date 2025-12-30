const emailBtn = document.getElementById("email-btn");
const emailTooltip = document.getElementById("email-tooltip");

emailBtn.addEventListener("click", (event) => {
  event.preventDefault();

  emailTooltip.style.display =
    emailTooltip.style.display === "block" ? "none" : "block";
});
