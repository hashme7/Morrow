export function generateVerificationCode(): number {
  const verificationCode = Math.floor(100000 + Math.random() * 900000);
  console.log(verificationCode, "verification code");
  return verificationCode;
}
