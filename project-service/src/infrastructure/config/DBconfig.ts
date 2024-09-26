import prisma from "../../models/prismaClient";


export const DBConfig = async()=>{
  try {
    await prisma.$connect();
    console.log('Project-service: Prisma is connected successfully');
  } catch (error) {
    console.log(`Project-service:- Error on connecting Database ${error}` )
    process.exit(1);
  }  
}