/* Deleting when project is done */
const formCard = document.querySelector(".form-card");
const body = document.body;

body.addEventListener("keyup", (e) => {
  if (e.key === "0") {
    formCard.classList.toggle("active");
  }
});

const forms = document.querySelectorAll("form");
const passBtns = document.querySelectorAll("#passBtn");

// Custom form validation
forms.forEach((form) => {
  form.addEventListener("submit", validateForm);
});

forms.forEach((form) => {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // retrieve current form data
    const formData = new FormData(e.target);

    // console.log(formData);
    for (const [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }
  });
});

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
    e.stopImmediatePropagation();

    fields.forEach((field) => {
      // if field fails add invalid class
      if (!field.checkValidity()) {
        field.parentElement.classList.add("invalid");
      }
    });
  }
}

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
