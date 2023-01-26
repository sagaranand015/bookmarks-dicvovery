import { auth, Client } from 'twitter-api-sdk';

const CLIENT_ID = process.env.CLIENT_ID || "";
const CLIENT_SECRET = process.env.CLIENT_SECRET || "";
const REDIRECT_URL = process.env.REDIRECT_URL || "";
const STATE = "my-state"

let authClient: any = null;
let client: any = null;

export const InitializeTwitterAuthClient = () => {
    authClient = new auth.OAuth2User({
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        callback: REDIRECT_URL,
        scopes: ["tweet.read", "users.read", "bookmark.read"],
    });
    return authClient;
}

export const GetTwitterAuthClient = () => {
    if (authClient == null) {
        console.log("======== creating a new client...");
        return InitializeTwitterAuthClient();
    }
    return authClient;
}

export const SetTwitterAuthClient = (aClient: any) => {
    authClient = aClient;
}

export const IntializeTwitterClient = (authClient: any) => {
    if (authClient == null) {
        authClient = InitializeTwitterAuthClient();
    }
    client = new Client(authClient);
    return client;
}

export const GetTwitterClient = () => {
    if (client == null) {
        return IntializeTwitterClient(authClient);
    }
    return client;
}

export const GetState = () => {
    return STATE;
}