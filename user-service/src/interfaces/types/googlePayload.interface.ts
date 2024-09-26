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
