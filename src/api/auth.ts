const TEMP_EMAIL = 'hello@gmail.com';
const TEMP_PWD = '12345678';

const userId = 2;

export const login = (email, password) =>
    new Promise((resolve, reject) => {
        setTimeout(() => {
            if (email === TEMP_EMAIL && password === TEMP_PWD) {
                resolve(userId);
            } else {
                reject('Incorrect email/password');
            }
        }, 1000);
    });

export const signup = (name, email, handle, password) =>
    new Promise((resolve, reject) => {
        setTimeout(() => {
            if (email === TEMP_EMAIL) {
                reject('Email already exists');
            } else {
                resolve(userId);
            }
        }, 1000);
    });
