import { IRepository } from "../interfaces/repository.interface"


class Signup {
    private repository :IRepository;
    constructor(repository:IRepository){
        this.repository = repository;
    }
    async execute(){
        
    }
}