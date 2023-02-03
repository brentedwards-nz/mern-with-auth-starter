export const validateLoginForm = ({ mail, password }) => {
  const isMailValid = validateMail(mail);
  const isPasswordValid = validatePassword(password);

  return isMailValid && isPasswordValid;
};

export const validateRegisterForm = ({ mail, password, confirmPassword, firstName, secondName }) => {
  return (
    validateMail(mail) &&
    validatePassword(password) &&
    password === confirmPassword &&
    validateName(firstName) &&
    validateName(secondName)
  );
};

export const validateResetForm = ({ mail }) => {
  return validateMail(mail);
}

export const validateResetPasswordForm = ({ password, confirmPassword }) => {
  return validatePassword(password) && password === confirmPassword
}

const validatePassword = (password) => {
  return password.length >= 6 && password.length <= 30;
};

export const validateMail = (mail) => {
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return emailPattern.test(mail);
};

const validateName = (name) => {
  return name.length >= 2 && name.length <= 20;
};