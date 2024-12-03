import { IUserData } from "../requests.interface";
import { Document ,ObjectId} from "mongoose";

export interface IResponse{
    status:number,
    message:string,
    tokens?:{
      accessToken?:string | null | undefined,
      refreshToken?:string | null | undefined,
    },
    data?:IUserData,
    userId?:ObjectId,
}

export interface IOtp extends Document{
    user:ObjectId,
    code:number,
    expiresAt:Date
} 

export interface IValidateResponse {
  status:number,
  message:string,
  valid:boolean,
  userId?:ObjectId
}

export interface GooglePayload {
  iss?: string;          // Issuer, typically 'https://accounts.google.com'
  sub?: string;          // Google user ID (unique identifier for the user)
  aud?: string;          // Audience (your Google Client ID)
  email?: string;        // User's email address
  email_verified?: boolean; // Whether the email is verified
  name?: string;         // Full name of the user
  picture?: string;      // URL to the user's profile picture
  given_name?: string;   // User's given (first) name
  family_name?: string;  // User's family (last) name
  iat?: number;          // Issued at time (timestamp in seconds)
  exp?: number;          // Expiration time (timestamp in seconds)
  azp?: string;          // Authorized party (your app's Google Client ID)
  nbf?:number;
  jti?:string,
}




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
