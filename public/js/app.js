const formCard = document.querySelector(".form-card");
const forms = document.querySelectorAll("form");
const passBtns = document.querySelectorAll("#passBtn");
const signUpNow = document.querySelector("#signUpNow");
const toastWarningBtn = document.querySelector("#warning button");

forms.forEach((form) => {
  form.addEventListener("submit", validateForm);
});

// Custom form validation
function validateForm(e) {
  // assign the target form
  const currentForm = e.target;
  // get all of the input fields
  const fields = Array.from(currentForm.elements);

  // reset fields
  fields.forEach((field) => {
    field.setCustomValidity("");
    field.parentElement.classList.remove("invalid");
  });

  // if currentForm fails validation
  if (!currentForm.checkValidity()) {
    e.preventDefault();

    fields.forEach((field) => {
      // if field fails add invalid class
      if (!field.checkValidity()) {
        field.parentElement.classList.add("invalid");
      }
    });
  }
}

// add event listener to each password eye icon
passBtns.forEach((passBtn) => {
  passBtn.addEventListener("click", togglePasswordVisibility);
});

function togglePasswordVisibility(e) {
  // get the current parent form
  const parentForm = e.currentTarget.parentElement.parentElement;
  const passInputField = parentForm.querySelector("#passInput");
  const eyeIcon = parentForm.querySelector("[data-icon='eye']");

  if (passInputField.type === "password") {
    passInputField.setAttribute("type", "text");
    eyeIcon.className = "fa-regular fa-eye-slash";
  } else {
    passInputField.setAttribute("type", "password");
    eyeIcon.className = "fa-regular fa-eye";
  }
}

// rotates the form card
signUpNow.addEventListener("click", () => {
  formCard.classList.add("active");
});

loginNow.addEventListener("click", () => {
  formCard.classList.remove("active");
});

// toast notification
toastWarningBtn.addEventListener("click", (e) => {
  const toast = e.target.parentElement;

  if (!toast.classList.contains("visually-hidden")) {
    toast.classList.add("visually-hidden");
    toast.setAttribute("aria-hidden", "true");
  } else {
    toast.classList.remove("visually-hidden");
    toast.setAttribute("aria-hidden", "false");
  }
});
