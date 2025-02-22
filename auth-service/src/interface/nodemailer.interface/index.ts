interface mailerInterface {
     sendMail(email:string, code:number):Promise<boolean>
    sendVerificationMail(id:any,to:any):Promise<any>
}
export default mailerInterface