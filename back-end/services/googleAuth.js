import { google } from "googleapis";
const googleAuth = () => {
  const CLIENT_ID =
    "21847936920-lev1cn44ieoa61hmhc29idrgra4k15h2.apps.googleusercontent.com";
  const CLIENT_SECRET = "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";

  const REDIRECT_URI = "http://localhost:3002/oauth2callback";
  const oauth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI
  );
  const scopes = [
    "https://www.googleapis.com/auth/userinfo.profile",
    "https://www.googleapis.com/auth/userinfo.email",
    "https://www.googleapis.com/auth/user.birthday.read",
    "https://www.googleapis.com/auth/user.gender.read",
  ];
  const authUrl = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: scopes,
  });

  return [authUrl, oauth2Client];
};

export default googleAuth;
