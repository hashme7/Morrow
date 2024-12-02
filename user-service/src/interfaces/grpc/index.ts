import { ProjectsResponse, ProjectServiceClient } from "morrow-common/dist/grpc/cmn"; 

export interface IGrpcProjectClient {
  /**
   * The gRPC client instance for ProjectService.
   */
  client: ProjectServiceClient;

  /**
   * Retrieves project details by team ID.
   * @param teamId - The ID of the team.
   * @returns A promise that resolves to the project response.
   */
  getProjectByTeamId(teamId: string[]): Promise<ProjectsResponse>;
}