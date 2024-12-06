import { UserServiceClient } from "morrow-common";
import { IRepository } from "../interfaces/repository.interface";

export class getProjectsByUserId {
  constructor(
    private readonly repository: IRepository,
    private readonly grpcClient: UserServiceClient
  ) {
    this.repository = repository;
  }
  async execute(userId: string) {
    try {
      const {teamIds} = await this.grpcClient.getTeamIds(userId);
      console.log('teamIds i got from user-servcier',teamIds,typeof teamIds[0],typeof teamIds)
      const projects = await this.repository.getProjectsByTeamIds(
        teamIds
      );
      console.log(`
        
        `)
        console.log(projects);
      console.log(`
        



       projcts response from getProjects,
        


        `)
      return { status: 200,message:"project retrieved successfylly", data: projects };
    } catch (error) {
      console.log(`Error on executing the getProjectByUserId: ${error}`);
      return { status: 500 };
    }
  }
}
