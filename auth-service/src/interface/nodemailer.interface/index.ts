interface mailerInterface {
  sendMail(email: string, code: number): Promise<boolean>;
  sendVerificationMail(id: any, to: any): Promise<any>;
  sendForgotPassLink(email: string, link: string): Promise<boolean>;
}
export default mailerInterface;
