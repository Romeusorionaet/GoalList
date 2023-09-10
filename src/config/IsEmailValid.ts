export function IsEmailValid(email: string) {
  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/
  const checkIfIsValidEmail = emailRegex.test(email)

  if (checkIfIsValidEmail === false) {
    return alert('Email Inválido.')
  }
}
