function validateMail(mail) {
    let isValid = mail.length > 5 && /[a-z]@+[a-z]+\.[a-z]/.test(mail);
    
    return isValid;
}

function validatePass(pass) {
    let isValid = /[a-zA-Z]/.test(pass);
    isValid = isValid && /[0-9]/.test(pass);
    isValid = isValid && /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(pass);

    return isValid;
}

export {
    validateMail,
    validatePass
}