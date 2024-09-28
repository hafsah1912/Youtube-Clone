const form = document.querySelector("form");
const eField = form.querySelector(".email");
const eInput = eField.querySelector("input");
const pField = form.querySelector(".password");
const pInput = pField.querySelector("input");

let canSubmit = false; // Variable to track whether the form can be submitted

form.onsubmit = (e) => {
    e.preventDefault();

    checkEmail();
    checkPass();

    eInput.onkeyup = () => { checkEmail(); };
    pInput.onkeyup = () => { checkPass(); };

    function checkEmail() {
        const pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
        if (!eInput.value.match(pattern)) {
            showError(eField, "Email is not valid.");
        } else {
            showSuccess(eField);
        }
    }

    function checkPass() {
        const pattern = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
        if (!pInput.value.match(pattern)) {
            showError(pField, "Password must contain at least 8 characters including at least one number and one special character.");
        } else {
            showSuccess(pField);
        }
    }

    function showError(inputField, message) {
        const errorTxt = inputField.querySelector(".error-txt");
        errorTxt.innerText = message;
        inputField.classList.add("error");
        inputField.classList.remove("valid");
        canSubmit = false; // Form should not be submitted if there are errors
    }

    function showSuccess(inputField) {
        inputField.classList.remove("error");
        inputField.classList.add("valid");
        canSubmit = true; // Form can be submitted if there are no errors
    }

    // Check if the form can be submitted
    if (canSubmit) {
        window.location.href = form.getAttribute("action");
    }
};
