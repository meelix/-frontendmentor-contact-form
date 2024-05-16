document.querySelectorAll("form").forEach(form => {
  form.addEventListener("submit", (e) => {
    let formData = new FormData(e.originalTarget);
    for (const pair of formData.entries()) formData.set(pair[0], pair[1].trim());
    console.log("form submited", formData);

    e.preventDefault();
    if (document.querySelector("#successpopover")) {
      document.querySelector("#successpopover").showPopover();
      setTimeout(() => document.querySelector("#successpopover").hidePopover(), 9000);
    }
  });

  form.querySelector("[type='submit']").addEventListener("click", e => {
    for (let inputs = 0; inputs < form.length; inputs++) {
      const input = form[inputs];
      checkValidity(input);
      
      // validate when the field loses focus
      // if (input.getAttribute("type") === "checkbox" || input.getAttribute("type") === "radio") {
      //   input.addEventListener("change", e => {
      //     document.getElementsByName(e.target.getAttribute("name")).forEach(input => checkValidity(input));
      //   });
      // } else {
      //   input.addEventListener("focusout", e => {
      //     checkValidity(input);
      //   });
      // }

      // validate whenever anything is changed
      input.addEventListener("input", e => {
        //using for loop to also update all radio buttons with the same name,
        //otherwise all other radio inputs would be invalid despite the requirement beeing fullfilled
        document.getElementsByName(e.target.getAttribute("name")).forEach(input => checkValidity(input));
      });
    }
  })

  function checkValidity(input) {
    const validityState = input.validity;

    // https://developer.mozilla.org/en-US/docs/Web/API/ValidityState
  
    if (validityState.valueMissing) {
      if (input.getAttribute("name") === "querytype") {
        input.setCustomValidity("Please select a query type");
      } else if (input.getAttribute("name") === "consent") {
        input.setCustomValidity("To submit this form, please consent to being contacted");
      } else {
        input.setCustomValidity("This field is required");
      }
    } else if (validityState.typeMismatch) {
      if (input.getAttribute("type") === "email") {
        input.setCustomValidity("Please enter a valid email address");
      }
    } else {
      input.setCustomValidity("");
    }

    if (input.closest(".field") && input.closest(".field").querySelector(".errormsg")) input.closest(".field").querySelector(".errormsg").textContent = input.validationMessage;

    console.debug("isValid", input.reportValidity(), input);
  
    input.reportValidity();
  }
});
