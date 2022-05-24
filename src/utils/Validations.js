
export const validateEmail = (email) => {
    // eslint-disable-next-line no-useless-escape
    const validation = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return validation.test(String(email).toLowerCase());
}

export const validateUserName = (username) => {
  return (username.length > 2);
}

export const validatePassword = (password) => {
  return (password.length >= 8);
}

