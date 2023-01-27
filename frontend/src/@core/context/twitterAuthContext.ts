import React from "react";

interface TwitterAuthContextValue {
    twitterAuthClient: any,
    code: string | null,
    token: string | null,
    userId: any
}

const defaultTwitterAuthContext: TwitterAuthContextValue = {
    twitterAuthClient: null,
    code: null,
    token: null,
    userId: null
}

const TwitterAuthContext = React.createContext<TwitterAuthContextValue>(defaultTwitterAuthContext);

export default TwitterAuthContext;
