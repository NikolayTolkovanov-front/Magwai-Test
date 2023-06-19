function validateForm() {
  const form = document.getElementById('form')
  form.addEventListener("submit", (e) => {
    e.preventDefault()
    validateNameInput()
    validateEmailInput()
    validatePhoneInput()
    validateMessageInput()
  })
}

function validateNameInput() {
  const nameInput = document.getElementById('name');
  
  const nameValue = nameInput.value.trim();
  const nameRegex = /^[а-яА-Яa-zA-Z]+$/;

  if (nameRegex.test(nameValue)) {
    nameInput.classList.remove('popup-form--invalid');
    nameInput.classList.add('popup-form--valid');
  } else {
    nameInput.classList.remove('popup-form--valid');
    nameInput.classList.add('popup-form--invalid');
  }
}

function validateEmailInput() {
  const emailInput = document.getElementById('email');

  const nameValue = emailInput.value.trim();
  
  const nameRegex = /.+@.+\..+/i;

  if (nameRegex.test(nameValue)) {
    emailInput.classList.remove('popup-form--invalid');
    emailInput.classList.add('popup-form--valid');
  } else {
    emailInput.classList.remove('popup-form--valid');
    emailInput.classList.add('popup-form--invalid');
  }
}

function validatePhoneInput() {
  const phoneInput = document.getElementById('phone');

  const nameValue = phoneInput.value.trim();
  const nameRegex = /(\+7|8)[\s(]*\d{3}[)\s]*\d{3}[\s-]?\d{2}[\s-]?\d{2}/g;

  if (nameRegex.test(nameValue)) {
    phoneInput.classList.remove('popup-form--invalid');
    phoneInput.classList.add('popup-form--valid');
  } else {
    phoneInput.classList.remove('popup-form--valid');
    phoneInput.classList.add('popup-form--invalid');
  }
}

function validateMessageInput() {
  const messageInput = document.getElementById('message');

  const nameValue = messageInput.value.trim();
  const nameRegex = /\w+/g;

  if (nameRegex.test(nameValue)) {
    messageInput.classList.remove('popup-form--invalid');
    messageInput.classList.add('popup-form--valid');
  } else {
    messageInput.classList.remove('popup-form--valid');
    messageInput.classList.add('popup-form--invalid');
  }
}