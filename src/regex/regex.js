export const passwordValidate = (password) => {
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{10,20}$/.test(password);
};

export const nameValidate = (name) => {
  return /^[a-zA-Z]{2,}(?:[-'\s][a-zA-Z]+)*$/.test(name);
};

export const emailValidate = (text) => {
  return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(text);
};
