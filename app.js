/*****************************
 *  LOGIN FUNCTIONS
 ******************************/
function login (userInfo = {}) {
  let { email, department } = userInfo
  if (!email || !department) {
    return
  }

  setCookie(emailCookie, email)
  setCookie(departmentCookie, department)

  onboarding.hideLoginModal()
}

const emailCookie = 'pendoOnboarding__Email'
const departmentCookie = 'pendoOnboarding__Department'

window.onboarding = (function () {
  let email = getCookie(emailCookie)
  let department = getCookie(departmentCookie)

  let loginForm = $('#login')
  loginForm.addEventListener('submit', function (submitEvent) {
    submitEvent.preventDefault()
    login(getLoginFormData())
  })

  // Login modal show/hide
  if (email && department) {
    // hideLoginModal();
    showLoginModal()
  } else {
    showLoginModal()
  }
  
  function showLoginModal () {
    loginForm.style.opacity = 1
    loginForm.style.top = '30%'
    setTimeout(() => (loginForm.style.display = ''), 100)
  }
  function hideLoginModal () {
    loginForm.style.opacity = 0
    loginForm.style.top = '-100%'
    setTimeout(() => (loginForm.style.display = 'none'), 100)
  }
  function getLoginFormData () {
    return Array.from(loginForm.elements).reduce(
      (form, { name, value }) => (name && (form[name] = value), form),
      {}
    )
  }

  return {
    showLoginModal,
    hideLoginModal,
    getLoginFormData
  };

  // Helper function for dom querying
  function $ (selector) {
    let results = Array.from(document.querySelectorAll(selector))
    if (results.length === 1) {
      return results[0]
    } else {
      return results
    }
  }
})()

/*
* Cookie helpers
*/
function setCookie (name, value, days) {
  var expires = ''
  if (days) {
    var date = new Date()
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
    expires = '; expires=' + date.toUTCString()
  }
  document.cookie = name + '=' + (value || '') + expires + '; path=/'
}
function getCookie (name) {
  var nameEQ = name + '='
  var ca = document.cookie.split(';')
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i]
    while (c.charAt(0) == ' ') c = c.substring(1, c.length)
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length)
  }
  return null
}
function eraseCookie (name) {
  document.cookie = name + '=; Max-Age=-99999999;'
}
