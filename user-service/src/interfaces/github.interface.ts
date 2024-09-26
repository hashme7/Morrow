
export interface GitHubEmail {
    email: string;
    primary: boolean;
    verified: boolean;
    visibility?: string | null;
  }
  
  
  export interface GitHubUser {
      login: string;
      id: number;
      avatar_url: string;
      url: string;
      html_url: string;
      followers_url: string;
      following_url: string;
      gists_url: string;
      starred_url: string;
      subscriptions_url: string;
      organizations_url: string;
      repos_url: string;
      events_url: string;
      received_events_url: string;
      type: string;
      name?: string;
      company?: string | null;
      blog?: string;
      location?: string | null;
      email?: string | null;
      bio?: string | null;
      twitter_username?: string | null;
      public_repos: number;
      public_gists: number;
      followers: number;
      following: number;
      created_at: string;
      updated_at: string;
      plan?: {
        name: string;
        space: number;
        collaborators: number;
        private_repos: number;
      };
    }
export interface IGithub {
  getGitHubAccessToken(code: string): Promise<string | null>;
  getGitHubUserData(
    accessToken: string | null
  ): Promise<{ user: GitHubUser | null; email: string | null } | null>;
}