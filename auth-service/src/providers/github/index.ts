import axios from "axios";
import { GitHubEmail, GitHubUser } from "../../interface/responses.interface/index";

export class Github {
  private _clientId: string | undefined;
  private _clientSecretKey: string | undefined;
  constructor() {
    this._clientId = process.env.GITHUB_CLIENT_ID;
    this._clientSecretKey = process.env.GITHUB_CLIENT_SECRET;
  }
  async getGitHubAccessToken(code: string): Promise<string | null> {
    try {
      console.log(this._clientId,this._clientSecretKey,'qwertyuiasdfghghj')
      const tokenResponse = await axios.post(
        "https://github.com/login/oauth/access_token",
        {
          client_id: this._clientId,
          client_secret: this._clientSecretKey,
          code,
        },
        { 
          headers: {
            accept: "application/json",
          },
        }
      );
       console.log(tokenResponse.data,"token response llllllllllllll")
      return tokenResponse.data.access_token;
    } catch (error) {
      console.error("Error fetching GitHub access token:", error);
      return null;
    }
  }
  async getGitHubUserData(
    accessToken: string | null
  ): Promise<{ user: GitHubUser | null; email: string | null } | null> {
    try {
      if (!accessToken) {
        return null;
      }
      const userResponse = await axios.get("https://api.github.com/user", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const emailsResponse = await axios.get(
        "https://api.github.com/user/emails",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const email = emailsResponse.data.filter((data: GitHubEmail) => {
        if (data.primary) {
          return data;
        }
      });

      return {
        user: userResponse.data,
        email: email[0].email,
      };
    } catch (error) {
      console.error("Error fetching GitHub user data:", error);
      throw new Error("Error fetching GitHub user data");
    }
  }
}
