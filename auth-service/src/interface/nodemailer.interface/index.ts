interface mailerInterface {
    sendMail(email:string, code:number):boolean
    sendVerificationMail(id:any,to:any):Promise<any>
}
export default mailerInterface