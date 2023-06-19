const popupLinks = document.querySelectorAll('.popup-link');
const lockPadding = document.querySelectorAll('.lockPadding')
const html = document.querySelector('html')

let unlock = true

const timeout = 300

if (popupLinks.length > 0) {
  for (let i = 0; i < popupLinks.length; i++) {
    const popupLink = popupLinks[i]

    popupLink.addEventListener('click', (e) => {
      const popupName = popupLink.getAttribute('href').replace('#', '')
      const currentPopup = document.getElementById(popupName)
      popupOpen(currentPopup)
      validateForm()
      e.preventDefault()
    })
  }
}

const popupCloseIcon = document.querySelectorAll('.close-popup')
if (popupCloseIcon.length > 0) {
  for (let i = 0; i < popupCloseIcon.length; i++) {
    const el = popupCloseIcon[i]
    el.addEventListener('click', (e) => {
      popupClose(el.closest('.popup'))
      e.preventDefault()
    })
  }
}

function popupOpen(currentPopup) {
  if (currentPopup && unlock) {
    const popupActive = document.querySelector('.popup.open')

    if (popupActive) {
      popupClose(popupActive, false)
    } else {
      bodyLock()
    }

    currentPopup.classList.add('open')
    currentPopup.addEventListener('click', (e) => {
      if (!e.target.closest('.popup__content')) {
        popupClose(e.target.closest('.popup'))
      }
    })
  }
}

function popupClose(popupActive, doUnlock = true) {
  if (unlock) {
    popupActive.classList.remove('open')
    if (doUnlock) {
      bodyUnlock()
    }
  }
}

function bodyLock() {
  const lockPaddingValue = window.innerWidth - document.querySelector('.container').offsetWidth + "px"

  for (let i = 0; i < lockPadding.length; i++) {
    const el = lockPadding[i];
    el.style.paddingRight = lockPaddingValue
  }

  html.style.paddingRight = lockPaddingValue
  html.classList.add('lock')

  unlock = false
  setTimeout(() => {
    unlock = true
  }, timeout)
}

function bodyUnlock() {
  setTimeout(() => {
    for (let i = 0; i < lockPadding.length; i++) {
      const el = lockPadding[i];
      el.style.paddingRight = '0px'
    }

    html.style.paddingRight = '0px'
    html.classList.remove('lock')
  }, timeout);

  unlock = false
  setTimeout(() => {
    unlock = true
  }, timeout);
}