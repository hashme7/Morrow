"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateVerificationCode = generateVerificationCode;
function generateVerificationCode() {
    const verificationCode = Math.floor(100000 + Math.random() * 900000);
    console.log(verificationCode, 'verification code');
    return verificationCode;
}
