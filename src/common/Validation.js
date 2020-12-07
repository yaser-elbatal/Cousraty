import i18n from '../../Local/i18n'

export const validatePhone = (phone) =>
    phone === '' ? i18n.t('PhoneErr') : phone.length < 9 ? i18n.t('PhoneErr') : null

export const validatePassword = (password) =>
    password.length < 6 ? i18n.t('passwordErr') : null;

export const validateTwoPasswords = (password, confirmPassword) => {
    return password != confirmPassword
        ? i18n.t('NotMatch')
        : null;
};

export const ValdiateActivationCode = (code) => {
    return code === '' ? i18n.t('codeErre') : code != 1122 ? i18n.t('codeErre') : null
}

export const validateCode = (code) =>
    code === '' || code.length < 4 ? i18n.t('codeErre') : null;

export const validateUserName = userName =>
    userName === '' || userName.length < 2 ? i18n.t('usernameErr') : null;


export const validateEmail = email => {
    let mailReg = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    return !mailReg.test(String(email).toLowerCase())
        ? i18n.t('emailErr')
        : null;
};