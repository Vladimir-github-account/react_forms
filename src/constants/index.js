export const PASSWORD_PATTERN = /(?=.*?\d)(?=.*?[a-z])(?=.*?[A-Z])^[a-zA-Z0-9_$%@?!#]{8,60}$/;
export const USER_NAME_PATTERN = /^[A-Z][a-z]{0,63}$/;
export const LOGIN_PATTERN = /(?!^\d)^\w{6,16}$/;
export const EMAIL_PATTERN = /^[A-Za-z]{1,63}[@][a-z]{1,63}[.][a-z]{1,4}$/;