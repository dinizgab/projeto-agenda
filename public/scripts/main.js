const modalWrapper = document.getElementById("modal-wrapper");
const newContact = document.getElementById("contact");
const cancel = document.getElementById("cancel");

function open() {
    modalWrapper.classList.add("active");
}

function close() {
    modalWrapper.classList.remove("active");
}

newContact.addEventListener("click", open);
cancel.addEventListener("click", close);
