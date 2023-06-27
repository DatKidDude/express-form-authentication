/* Deleting when project is done */
// const formCard = document.querySelector(".form-card");
// const body = document.body;

// body.addEventListener("keyup", (e) => {
//   if (e.key === "f") {
//     formCard.classList.toggle("active");
//   }
// });

const forms = document.querySelectorAll("form");

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
      // skip over the visibility icon and submit button
      if (field.tagName === "BUTTON" || field.type === "submit") return;

      // if field fails add invalid class
      if (!field.checkValidity()) {
        field.parentElement.classList.add("invalid");
      }
    });
  }
}
